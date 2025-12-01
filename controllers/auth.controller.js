import prisma from '../prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { nome, login, email, senha, perfil } = req.body;

        if(!nome || !login || !email || !senha){
            return res.status(400).json({ mensagem: 'Dados inválidos ou faltando.'});
        }

        const usuarioExiste = await prisma.usuario.findUnique({
            where: { email: email }
        })

        if (usuarioExiste){
            return res.status(400).json({ message: 'Email já cadastrado'});
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario = await prisma.usuario.create({
            data: {
                 nome,
                 login,
                 email,
                 senhaHash,
                 perfil: perfil || TÉCNICO
            }
        });

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            usuario: {
                id: novoUsuario.usuarioID,
                nome: novoUsuario.nome,
                login: novoUsuario.login,
                email: novoUsuario.email
            }
    })
    } catch (error) {
        console.error("Erro ao criar usuario", error);
        return res.status(500).json({ message: 'Erro interno' });
    }
}

export const login = async (req, res) => {
    try {

        const { login, senha } = req.body;

        if(!login || !senha){
            return res.status(400).json({ mensagem: 'Dados inválidos ou faltando.'});
        }

        const usuarioExiste = await prisma.usuario.findUnique({
            where: { login: login }
        })

        const validarSenha = await bcrypt.compare(senha, usuarioExiste.senhaHash)

        if (!usuarioExiste || !validarSenha){
            return res.status(401).json({ message: 'Credenciais inválidas'});
        }

        const payload = {
            id: usuarioExiste.usuarioID,
            nome: usuarioExiste.nome,
            perfil: usuarioExiste.perfil
        }

        const segredo = process.env.JWT_SECRET || 'segredo-super-secreto';

        const opcoes = { expiresIn: '8h' };

        const token = jwt.sign(payload, segredo, opcoes);

        return res.status(200).json({
            message: "Login realizado",
            token: token,
            usuario: payload
        });
    } catch (error) {
        console.error("Erro ao logar", error);
        return res.status(500).json({ message: 'Erro interno' });
    }
}