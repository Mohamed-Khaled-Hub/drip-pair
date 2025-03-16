import { Request, Response } from 'express'
// DB Connection
import pool from '../config/Db'

// @route GET /shoes
export const getAllShoes = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM shoes ORDER BY id')
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

// @route GET /shoes/:id
export const getShoeById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10) // Ensure ID is an integer

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid shoe ID' })
            return
        }

        const result = await pool.query('SELECT * FROM shoes WHERE id = $1', [
            id,
        ])

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Shoe not found' })
            return
        }

        res.json(result.rows[0])
    } catch (err) {
        console.error('Database error:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

// @route GET /shoes/brands/:brand
export const getShoesByBrand = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const brand = req.params.brand.toLowerCase()

        const result = await pool.query(
            'SELECT shoes.* FROM shoes INNER JOIN brands ON shoes.brand_id = brands.id WHERE LOWER(brands.name) = $1 ORDER BY shoes.id',
            [brand]
        )

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'No shoes found for this brand' })
            return
        }

        res.json(result.rows)
    } catch (err) {
        console.error('Database error:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

// @route POST /shoes/by-ids
export const getShoesByIds = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { shoeIds } = req.body

        if (!Array.isArray(shoeIds) || shoeIds.length === 0) {
            res.status(400).json({
                error: 'Invalid request. Provide an array of shoe IDs.',
            })
            return
        }

        const placeholders = shoeIds
            .map((_, index) => `$${index + 1}`)
            .join(', ')
        const query = `SELECT * FROM shoes WHERE id IN (${placeholders})`

        const result = await pool.query(query, shoeIds)

        res.json(result.rows)
    } catch (err) {
        console.error('Error fetching shoes:', err)
        res.status(500).json({ error: 'Internal Server Error', err })
    }
}
