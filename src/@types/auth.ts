import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

interface Payload extends JwtPayload {
    name: string;
    email: string;
}

interface MyRequest extends Request {
    user?: Payload;
}

export { 
    MyRequest,
    Payload
};