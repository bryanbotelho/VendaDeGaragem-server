import jwt from 'jsonwebtoken';
import { LoginUser } from '../@types/user';
// import * as User from '../models/users';

const { SECRET = '123456' } = process.env;

class LoginService {
    async generatorToken(data: LoginUser) {
        const { email, password } = data;

        // substituir por TypeORM
        // const user = await User.findByEmail(email) 
        if (!user) return { status: 404, message: 'User not found!' };
        if (user.password !== password) return { status: 401, message: 'Email or Password invalid!' };

        const { password: _, ...newUser } = user;
        const token = jwt.sign({ data: newUser }, SECRET);

        return { status: 200, data: { token } };
    }
}

export default new LoginService;