import express from 'express'

const app = express()

app.get('/', (req,res)=> {
    res.json({message: 'appel API réussi ^^'})
})

export default app