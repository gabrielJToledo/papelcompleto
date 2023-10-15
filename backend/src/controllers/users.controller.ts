import { userModel } from '../model/users.model'
import { Request, Response, Router } from 'express'
import { genSaltSync, hashSync, compareSync } from 'bcrypt'

const encryptPassword = (password: string): string => {
    const salt = genSaltSync(10)
    return hashSync(password, salt)
}

export const userRouter = Router()

// Rota para obter todos os usuários
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userModel.find()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar usuários' })
    }
})

// Rota para obter um usuário por ID
userRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await userModel.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar usuário' })
    }
})

// Rota para criar um novo usuário
userRouter.post('/signin', async (req: Request, res: Response) => {
    const user = { ...req.body }

    if (!user.name || !user.email || !user.password || !user.whatsapp) {
        return res.status(400).send('Os campos name, email, password e whatsapp são obrigatórios.')
    }

    if (user.password !== user.confirmPassword) {
        return res.status(400).send('Confirmação de senha inválida!')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(user.email)) {
        return res.status(400).send('E-mail inválido!')
    }

    const existingUser = await userModel.findOne({ email: user.email })
    if (existingUser) {
        return res.status(400).send('E-mail já cadastrado!')
    }

    delete user.confirmPassword
    user.password = encryptPassword(user.password)
    await userModel.create(user)

    return res.status(200).send(user)
})

// Rota para atualizar um usuário existente
userRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const user: any = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const propertiesToUpdate = [
            'name',
            'email',
            'whatsapp',
            'password',
            'cep',
            'state',
            'city',
            'neighborhood',
            'street',
            'houseNumber',
            'addressComplement',
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
userRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao excluir usuário' })
    }
})

// Rota para fazer login
userRouter.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Os campos email e password são obrigatórios.');
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        if(!user.password) {
            return res.status(401).send('Credenciais inválidas!')
        }

        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Credenciais inválidas');
        }

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send('Erro ao fazer login');
    }
});