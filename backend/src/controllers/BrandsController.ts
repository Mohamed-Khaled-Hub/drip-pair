import { Request, Response } from 'express'
// DB Connection
import pool from '../config/Db'

// @route GET /brands
export const getAllBrands = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM brands ORDER BY id')
        res.json(result.rows)
    } catch (err) {
        console.error('Error fetching brands:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
