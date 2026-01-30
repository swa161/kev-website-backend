import { Request, Response } from 'express';

const allowedOrigins = [
    'http://localhost:5173',
    'https://kev-website-frontend.vercel.app'
];

export default (req: Request, res: Response, next: () => void) => {
    const origin = req.headers.origin as string
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
}