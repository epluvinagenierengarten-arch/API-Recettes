import { Router } from 'express'
import { chercherRecette } from '../services/recette.service.js'

const router = Router()

router.get('/:id', async (req, res) => {
  const recette = await chercherRecette(req.params.id)
  res.json(recette)
})

export default router