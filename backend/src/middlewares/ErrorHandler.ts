import { Request, Response, NextFunction } from 'express'

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const timestamp = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium',
        hour12: false,
        timeZone: 'Africa/Cairo',
    }).format(new Date())

    console.error(`[${timestamp}] Error:`, err.message || err)

    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    })
}

export default errorHandler
