const BASE = 'https://www.themealdb.com/api/json/v1/1'

let cache = null

export async function chercherRecette(id) {
  const response = await fetch(`${BASE}/lookup.php?i=${id}`)
  const donnees = await response.json()

  if (!donnees.meals) return null

  return nettoyer(donnees.meals[0])
  
}

export async function chercherRecettes() {
    if (cache) return cache

    const lettres = 'abcdefghijklmnopqrstuvwxyz'.split('')

    const response = await Promise.all(
        lettres.map(async (lettre) => {
            const response = await fetch(`${BASE}/search.php?f=${lettre}`)
            const donnees = await response.json()
            return donnees.meals || []
        })
    )
    cache = response.flat().map(nettoyer)
    return cache
    
}

function nettoyer(meal) {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const nom = meal[`strIngredient${i}`]?.trim() //trim pour retirer les espace dans les ""
    const quantite = meal[`strMeasure${i}`]?.trim()

    if (nom) {
      ingredients.push ({ nom, quantite: quantite || '' })
    }
  }

  return {
    id: meal.idMeal,
    nom: meal.strMeal,
    categorie: meal.strCategory,
    pays: meal.strArea,
    image: meal.strMealThumb,
    ingredients,
    nbIngredients: ingredients.length,
  }
}