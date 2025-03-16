import express from 'express'
// Routes
import {
    signupUser,
    loginUser,
    updateUser,
    deleteUser,
    addToCart,
    changePassword,
    removeFromCart,
    checkout,
} from '../controllers/UsersController'

const UsersRoutes = express.Router()

// POST
UsersRoutes.post('/signup', signupUser)
UsersRoutes.post('/login', loginUser)
UsersRoutes.post('/checkout/:id', checkout)
// PUT
UsersRoutes.put('/:id', updateUser)
UsersRoutes.put('/add-to-cart/:id', addToCart)
UsersRoutes.put('/remove-from-cart/:id', removeFromCart)
UsersRoutes.put('/change-password/:id', changePassword)
// DELETE
UsersRoutes.delete('/:id', deleteUser)

export default UsersRoutes
