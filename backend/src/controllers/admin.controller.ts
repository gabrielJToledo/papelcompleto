import { adminModel } from './../model/admin.model';
import { Request, Response, Router, NextFunction } from 'express';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyToken = (token: any): JwtPayload | string => {
    try {
        const decodedToken = jwt.verify(token, `${process.env.AUTH_SECRET}`);
        return decodedToken;
    } catch (error) {
        throw new Error('Token inválido');
    }
};

interface CustomRequest extends Request {
    adminId?: string;
}

const encryptPassword = (password: string): string => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
};


// Middleware de autenticação
const authenticateAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            if (req.path === '/login') {
                return next();
            } else {
                return res.status(401).json({ error: 'Token de autenticação não fornecido' });
            }
        }

        const token = authorizationHeader.split(' ')[1];
        const decodedToken = verifyToken(token);

        if (typeof decodedToken === 'string') {
            throw new Error('Token inválido');
        }

        req.adminId = decodedToken.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

export const adminRouter = Router();

// Rota para obter todos os usuários
adminRouter.get('/', authenticateAdmin, async (req: Request, res: Response) => {
    try {
        const users = await adminModel.find()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar usuários' })
    }
})

// Rota para obter um usuário por ID
adminRouter.get('/:id', authenticateAdmin, async (req: Request, res: Response) => {
    try {
        const user = await adminModel.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar usuário' })
    }
})

// Rota para criar um novo usuário
adminRouter.post('/signin', authenticateAdmin, async (req: Request, res: Response) => {
    const user = { ...req.body }

    if (!user.name || !user.email || !user.password) {
        return res.status(400).json({ error: 'Os campos name, email e password são obrigatórios.' })
    }

    if (user.password !== user.confirmPassword) {
        return res.status(400).send('Confirmação de senha inválida!')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(user.email)) {
        return res.status(400).send('E-mail inválido!')
    }

    const existingUser = await adminModel.findOne({ email: user.email })
    if (existingUser) {
        return res.status(400).send('E-mail já cadastrado!')
    }

    delete user.confirmPassword
    user.password = encryptPassword(user.password)
    await adminModel.create(user)

    const token = jwt.sign({ id: user._id }, `${process.env.AUTH_SECRET}`);

    return res.status(200).json({ user, token });
})

// Rota para atualizar um usuário existente
adminRouter.put('/:id', authenticateAdmin, async (req: Request, res: Response) => {
    try {
        const user: any = await adminModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const propertiesToUpdate = [
            'name',
            'email',
            'password'
        ];

        if (req.body.oldPassword) {
            const passwordMatch = compareSync(req.body.oldPassword, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Senha antiga incorreta' });
            }
        }

        propertiesToUpdate.forEach((property) => {
            if (req.body[property]) {
                if (property === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(req.body[property])) {
                        return res.status(400).send('E-mail inválido!');
                    }
                }
                user[property] = req.body[property];
            }
        });

        if (req.body.newPassword) {
            const hashedPassword = hashSync(req.body.newPassword, 10);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});


// Rota para excluir um usuário existente
adminRouter.delete('/:id', authenticateAdmin, async (req: Request, res: Response) => {
    try {
        const user = await adminModel.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao excluir usuário' })
    }
})

// Rota para fazer login de um administrador
adminRouter.post('/login', async (req: Request, res: Response) => {
    const { email, password }: any = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Os campos email e password são obrigatórios.' });
    }

    try {
        const user = await adminModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        if (!user.password) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        if (!process.env.AUTH_SECRET) {
            return res.status(500).json({ error: 'Chave secreta não definida' });
        }

        const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET);

        return res.status(200).json({ user, token });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

// Rota para verificar o token
adminRouter.post('/verifyToken', (req: Request, res: Response) => {
    const { token }: any = req.body;

    try {
        const decodedToken = verifyToken(token);
        return res.status(200).json(decodedToken);
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
});
