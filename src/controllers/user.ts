import UserService from '../services/user';
import { Request, Response } from 'express';

class UserController {
    public static async generatorToken(req: Request, res: Response): Promise<any> {
        const { status, data, message } = await UserService.generatorToken(req.body);
        if (message) return res.status(status).json({ message });

        return res.status(status).json(data);
    }

    public static async create(req: Request, res: Response): Promise<any> {
        const { status, message } = await UserService.create(req.body);

        if (message) return res.status(status).json({ message });

        return res.status(status).json(message);
    }
}

export default UserController;