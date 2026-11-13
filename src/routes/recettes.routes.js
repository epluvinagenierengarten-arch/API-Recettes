import { Router } from 'express'
import { chercherRecette,chercherRecettes } from '../services/recette.service.js'

const router = Router()

router.get('/:id', async (req, res) => {

    try{
    const { id } = req.params

    if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ erreur: "ça ressemble pas à un id ça ¤^¤" })
    }

    const recette = await chercherRecette(id)

    if (!recette){
        return res.status(404).json({erreur: '404: Y a pas de Recette à cet ID sorry gars :('})
    }
    res.json(recette)}
    catch (err){
        next(err)
    }
})

router.get('/',async(req,res)=>{
    const recettes = await chercherRecettes()
    res.json(recettes)
})

export default router