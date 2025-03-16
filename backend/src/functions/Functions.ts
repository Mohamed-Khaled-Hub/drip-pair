import { Request } from 'express'
// DB Connection
import pool from '../config/Db'

export const updateUserActivity = async (userId: number, req: Request) => {
    try {
        const loggedIn = new Date()
        const ip =
            req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress ||
            'Unknown'

        const result = await pool.query(
            'UPDATE users SET logged_in = $1, ip = $2 WHERE id = $3 RETURNING *',
            [loggedIn, JSON.stringify({ ipv4: ip }), userId]
        )

        return result.rows[0]
    } catch (err) {
        console.error('Error updating user activity:', err)
    }
}
