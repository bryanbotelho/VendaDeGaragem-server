import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { MyRequest, Payload } from '../@types/auth';
import { getMessage } from '../utils/messageHelper';

const { SECRET = '123456' } = process.env;

class AuthMiddleware {
    validateToken(req: MyRequest, res: Response, next: NextFunction): Response | any {
        const { authorization } = req.headers;
        
        try {
            if (!authorization) {
                return res.status(401).json({ success: false, message: getMessage('INVALID_TOKEN', 'pt') });
            }
    
            const token = authorization.split(' ')[1];

            const { data } = jwt.verify(token, SECRET) as { data: Payload };
            req.user = data;

            return next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ success: false, message: getMessage('INVALID_TOKEN', 'pt') });
        }
    }
}

export default new AuthMiddleware();
