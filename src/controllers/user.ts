import UserService from '../services/user';
import { Request, Response } from 'express';
import { MyRequest } from '../@types/auth';

class UserController {
    async generatorToken(req: Request, res: Response): Promise<any> {
        const { status, data, message, success } = await UserService.generatorToken(req.body);
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ result: data, success });
    }

    async create(req: Request, res: Response): Promise<any> {
        const { status, message, success } = await UserService.create(req.body);
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ message, success });
    }

    async requestPasswordReset(req: Request, res: Response): Promise<any> {
        const { status, message, data, success } = await UserService.requestPasswordReset(req.body);
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ result: { ... data }, success });
    }

    async verifyResetToken(req: MyRequest, res: Response): Promise<any> {
        console.log(req.user);
        const { status, message, success } = await UserService.verifyResetToken(req.body);
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ message, success });
    }

    async resetPassword(req: Request, res: Response): Promise<any> {
        const { status, message, success } = await UserService.resetPassword(req.body);
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ message, success });
    }

    async getUsers(_req: Request, res: Response): Promise<any> {
        const { status, message, success, data } = await UserService.getUsers();
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ result: data, success });
    }

    async getUserByEmail(req: Request, res: Response): Promise<any> {
        const { email } = req.query;
        const { status, message, success, data } = await UserService.getUserByEmail(email as string);
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ result: data, success });
    }
}

export default new UserController();