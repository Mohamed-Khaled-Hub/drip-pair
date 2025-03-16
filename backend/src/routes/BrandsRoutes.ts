import express from 'express'
// Routes
import { getAllBrands } from '../controllers/BrandsController'

const BrandsRoutes = express.Router()

// GET
BrandsRoutes.get('/', getAllBrands)

export default BrandsRoutes
