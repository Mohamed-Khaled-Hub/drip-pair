import { Request, Response } from 'express'
// DB Connection
import pool from '../config/Db'
// Functions
import { updateUserActivity } from '../functions/Functions'

// @route POST /users/signup
export const signupUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, email, username, password, address, dob, phone, cart } =
            req.body

        if (!name || !email || !username || !password) {
            res.status(400).json({
                error: 'Name, Email, Username, and Password are required',
            })
            return
        }

        const result = await pool.query(
            'INSERT INTO users (name, email, username, password, address, dob, phone, cart, logged_in, ip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NULL, NULL) RETURNING *',
            [
                name,
                email,
                username,
                password,
                address,
                dob,
                phone,
                JSON.stringify(cart),
            ]
        )

        let newUser = result.rows[0]

        newUser = await updateUserActivity(newUser.id, req)

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        })
    } catch (err) {
        console.error('Error signing up user:', err)
        res.status(500).json({
            error: 'Internal Server Error',
            err,
        })
    }
}

// @route POST /users/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            res.status(400).json({
                error: 'Username and password are required',
            })
            return
        }

        const userResult = await pool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]
        )

        if (userResult.rows.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' })
            return
        }

        let user = userResult.rows[0]

        user = await updateUserActivity(user.id, req)

        res.json({ message: 'Login successful', user: user })
    } catch (err) {
        console.error('Error logging in user:', err)
        res.status(500).json({ error: 'Internal Server Error', err })
    }
}

// PUT /users/:id
export const updateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10)
        const { name, email, username, password, address, dob, phone, cart } =
            req.body

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid user ID' })
            return
        }

        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, username = $3, password = $4, address = $5, dob = $6, phone = $7, cart = $8 WHERE id = $9 RETURNING *',
            [
                name,
                email,
                username,
                password,
                address,
                dob,
                phone,
                JSON.stringify(cart),
                id,
            ]
        )

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        const updatedUser = await updateUserActivity(id, req)

        res.json({ message: 'User updated successfully', user: updatedUser })
    } catch (err) {
        console.error('Error updating user:', err)
        res.status(500).json({ error: 'Internal Server Error', err })
    }
}

// @route DELETE /users/:id
export const deleteUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10)

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid user ID' })
            return
        }

        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [id]
        )

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        res.json({ message: 'User deleted successfully' })
    } catch (err) {
        console.error('Error deleting user:', err)
        res.status(500).json({ error: 'Internal Server Error', err })
    }
}

// @route PUT /users/change-password/:id
export const changePassword = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = parseInt(req.params.id, 10)
        const { oldPassword, newPassword } = req.body

        if (isNaN(userId)) {
            res.status(400).json({ error: 'Invalid user ID' })
            return
        }

        if (!oldPassword || !newPassword) {
            res.status(400).json({
                error: 'Old password and new password are required',
            })
            return
        }

        const userResult = await pool.query(
            'SELECT password FROM users WHERE id = $1',
            [userId]
        )

        if (userResult.rows.length === 0) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        const storedPassword = userResult.rows[0].password

        if (storedPassword !== oldPassword) {
            res.status(401).json({ error: 'Incorrect old password' })
            return
        }

        const updatedUser = await pool.query(
            'UPDATE users SET password = $1 WHERE id = $2 RETURNING *',
            [newPassword, userId]
        )

        res.json({
            message: 'Password changed successfully',
            user: updatedUser.rows[0],
        })
    } catch (err) {
        console.error('Error changing password:', err)
        res.status(500).json({ error: 'Internal Server Error', err })
    }
}

// @route PUT /users/add-to-cart/:id
export const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id, 10)
        const { productId, colorId, size, quantity } = req.body

        if (isNaN(userId)) {
            res.status(400).json({ error: 'Invalid user ID' })
            return
        }

        if (!productId || !colorId || !size || !quantity) {
            res.status(400).json({
                error: 'Product ID, color ID, size, and quantity are required.',
            })
            return
        }

        const userResult = await pool.query(
            'SELECT cart FROM users WHERE id = $1',
            [userId]
        )

        if (userResult.rows.length === 0) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        let cart = userResult.rows[0].cart || []

        const existingItemIndex = cart.findIndex(
            (item: any) =>
                item.productId === productId &&
                item.colorId === colorId &&
                item.size === size
        )

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity
        } else {
            cart.push({ productId, colorId, size, quantity })
        }

        const updatedUser = await pool.query(
            'UPDATE users SET cart = $1 WHERE id = $2 RETURNING cart',
            [JSON.stringify(cart), userId]
        )

        res.json({
            message: 'Item added to cart successfully',
            cart: updatedUser.rows[0].cart,
        })
    } catch (err) {
        console.error('Error adding to cart:', err)
        res.status(500).json({ error: 'Internal Server Error', err })
    }
}

// @route PUT /users/remove-from-cart/:id
export const removeFromCart = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = parseInt(req.params.id, 10)
        const { productId, colorId, size } = req.body

        if (isNaN(userId)) {
            res.status(400).json({ error: 'Invalid user ID' })
            return
        }

        if (!productId || !colorId || !size) {
            res.status(400).json({
                error: 'Product ID, color ID, and size are required.',
            })
            return
        }

        const userResult = await pool.query(
            'SELECT cart FROM users WHERE id = $1',
            [userId]
        )

        if (userResult.rows.length === 0) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        let cart = userResult.rows[0].cart || []

        const updatedCart = cart.filter(
            (item: any) =>
                !(
                    item.productId === productId &&
                    item.colorId === colorId &&
                    item.size === size
                )
        )

        const updatedUser = await pool.query(
            'UPDATE users SET cart = $1 WHERE id = $2 RETURNING *',
            [JSON.stringify(updatedCart), userId]
        )

        res.json({
            message: 'Item removed from cart successfully',
            cart: updatedUser.rows[0].cart,
        })
    } catch (err) {
        console.error('Error removing item from cart:', err)
        res.status(500).json({ error: 'Internal Server Error', err })
    }
}

// @route POST /users/checkout/:id
export const checkout = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id, 10)

        if (isNaN(userId)) {
            res.status(400).json({ error: 'Invalid user ID' })
            return
        }

        const userResult = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [userId]
        )

        if (userResult.rows.length === 0) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        if (userResult.rows[0].cart.length === 0) {
            res.status(400).json({ error: 'Cart is already empty' })
            return
        }

        const updatedUserResult = await pool.query(
            'UPDATE users SET cart = $1 WHERE id = $2 RETURNING *',
            [JSON.stringify([]), userId]
        )

        res.json({
            message: 'Checkout successful, cart has been cleared.',
            user: updatedUserResult.rows[0],
        })
    } catch (err) {
        console.error('Error during checkout:', err)
        res.status(500).json({ error: 'Internal Server Error', err })
    }
}
