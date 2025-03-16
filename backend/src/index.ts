import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// Middlewares
import logger from './middlewares/Logger'
import errorHandler from './middlewares/ErrorHandler'
// Routes
import ShoesRoutes from './routes/ShoesRoutes'
import BrandsRoutes from './routes/BrandsRoutes'
import UsersRoutes from './routes/UsersRoutes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(
    cors({
        origin: [`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
)

app.use(logger)
app.use('/brands', BrandsRoutes)
app.use('/shoes', ShoesRoutes)
app.use('/users', UsersRoutes)
app.use(errorHandler)

const port = process.env.SERVER_PORT
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
