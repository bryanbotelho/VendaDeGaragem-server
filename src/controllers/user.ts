import UserService from '../services/user';
import { Request, Response } from 'express';

class UserController {
    public static async generatorToken(req: Request, res: Response): Promise<any> {
        const { status, data, message, success } = await UserService.generatorToken(req.body);
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ result: data, success });
    }

    public static async create(req: Request, res: Response): Promise<any> {
        const { status, message, success } = await UserService.create(req.body);
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ message, success });
    }

    public static async requestPasswordReset(req: Request, res: Response): Promise<any> {
        const { status, message, data, success } = await UserService.requestPasswordReset(req.body);
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ result: { ... data }, success });
    }

    public static async verifyResetToken(req: Request, res: Response): Promise<any> {
        const { status, message, success } = await UserService.verifyResetToken(req.body);
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ message, success });
    }

    public static async resetPassword(req: Request, res: Response): Promise<any> {
        const { status, message, success } = await UserService.resetPassword(req.body);
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ message, success });
    }
}

export default UserController;