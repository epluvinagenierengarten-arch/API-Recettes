const BASE = 'https://www.themealdb.com/api/json/v1/1'

export async function chercherRecette(id) {
  const response = await fetch(`${BASE}/lookup.php?i=${id}`)
  const donnees = await response.json()

  return donnees.meals[0]
}