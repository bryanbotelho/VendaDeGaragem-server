import LoginService from '../services/login';
import { Request, Response } from 'express';

class LoginController {
    async generatorToken(req: Request, res: Response) {
        const { status, data, message } = await LoginService.generatorToken(req.body);
        if (message) return res.status(status).json({ message });

        return res.status(status).json(data);
    }
}

export default new LoginController;