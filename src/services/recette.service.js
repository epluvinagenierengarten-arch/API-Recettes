const BASE = 'https://www.themealdb.com/api/json/v1/1'

export async function chercherRecette(id) {
  const response = await fetch(`${BASE}/lookup.php?i=${id}`)
  const donnees = await response.json()

  if (!donnees.meals) return null


  return nettoyer(donnees.meals[0])
  
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