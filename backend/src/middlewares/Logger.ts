import { Request, Response, NextFunction } from 'express'

const logger = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium',
        hour12: false,
        timeZone: 'Africa/Cairo',
    }).format(new Date())

    console.log(`[${timestamp}] ${req.method} ${req.url}`)
    next()
}

export default logger
