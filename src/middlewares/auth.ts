import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { MyRequest, Payload } from '../@types/auth';

const { SECRET = '123456' } = process.env;

class AuthMiddleware {
    
    auth(req: MyRequest, res: Response, next: NextFunction): Response | void {
        const token = req.headers.authorization;
            if (!token) {
            return res.status(401).json({ message: 'Token invalid!' });
        }

        try {
            const { data } = jwt.verify(token, SECRET) as { data: Payload };
            req.user = data;
            return next();
        } catch (e) {
            console.error(e);
            return res.status(401).json({ message: 'Token invalid!' });
        }
    }
}

export default new AuthMiddleware;
