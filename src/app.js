import express from 'express'

import recettesRoutes from './routes/recettes.routes.js'

const app = express()

app.use('/api/recettes', recettesRoutes)

export default app