import prisma from '../prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const totalUsuarios = await prisma.usuario.count();
        
        if (totalUsuarios > 0) {
           const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({ message: "Token não fornecido." });
            }

            const parts = authHeader.split(' ');
            if (parts.length !== 2) {
                return res.status(401).json({ message: "Erro no Token." });
            }

            const [ scheme, token ] = parts;

            if (!/^Bearer$/i.test(scheme)) {
                return res.status(401).json({ message: "Token malformatado." });
            }

            try {
                const secret = process.env.JWT_SECRET || 'segredo-super-secreto';
                const decoded = jwt.verify(token, secret);
                
                req.usuario = decoded; 
            } catch (err) {
                return res.status(401).json({ message: "Token inválido ou expirado." });
            }

            if (req.usuario.tipo !== 'GESTOR') {
                return res.status(403).json({ message: "Acesso negado. Apenas gestores podem cadastrar novos clientes." });
            }
        }

        const { nome, login, email, senha, tipo } = req.body;

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
                 tipo: tipo || TÉCNICO
            }
        });

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            usuario: {
                id: novoUsuario.idUsuario,
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

export const listarUsuarios = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (page < 1) page = 1;
        if (limit < 1 || limit > 100) limit = 10;

        const skip = (page - 1) * limit;

        const usuarios = await prisma.usuario.findMany({
            skip: skip,     
            take: limit,    
            orderBy: {
                idUsuario: 'desc'
            },
            select: {       
                idUsuario: true,
                nome: true,
                login: true,
                email: true,
                tipo: true,
                ativo: true
            }
        });

        const totalRegistros = await prisma.usuario.count();
        const totalPaginas = Math.ceil(totalRegistros / limit);

        return res.status(200).json({
            data: usuarios,       
            meta: {               
                total: totalRegistros,
                page: page,
                limit: limit,
                totalPages: totalPaginas
            }
        });

    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        return res.status(500).json({ message: "Erro interno." });
    }
}