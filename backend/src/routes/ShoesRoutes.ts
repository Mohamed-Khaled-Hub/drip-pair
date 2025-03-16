import express from 'express'
// Routes
import {
    getAllShoes,
    getShoeById,
    getShoesByIds,
    getShoesByBrand,
} from '../controllers/ShoesController'

const ShoesRoutes = express.Router()

// GET
ShoesRoutes.get('/', getAllShoes)
ShoesRoutes.get('/:id', getShoeById)
ShoesRoutes.get('/brands/:brand', getShoesByBrand)
// POST
ShoesRoutes.post('/by-ids', getShoesByIds)

export default ShoesRoutes
