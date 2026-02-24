import prisma from '../prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registrar = async (req, res) => {
    try {
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

        const { nome, email, telefone, idEmpresa, endereco } = req.body;
        
        if(!nome || !email || !telefone){
            return res.status(400).json({ mensagem: 'Dados inválidos ou faltando.'});
        }

        const usuarioExiste_email = await prisma.cliente.findUnique({
            where: { email: email }
        })

        if (usuarioExiste_email){
            return res.status(400).json({ message: 'Email já cadastrado'});
        }

        const usuarioExiste_telefone = await prisma.cliente.findUnique({
            where: { telefone: telefone }
        })

        if (usuarioExiste_telefone){
            return res.status(400).json({ message: 'Telefone já cadastrado'});
        }

        const novoCliente = await prisma.cliente.create({
            data: {
                nome,
                email,
                telefone,
                idEmpresa: idEmpresa ? parseInt(idEmpresa) : null,
                endereco: endereco || null
            }
        });

        return res.status(201).json({
            mensagem: "Cliente cadastrado com sucesso!",
            data: {
                id: novoCliente.idCliente,
                nome: novoCliente.nome,
                email: novoCliente.email,
                telefone: novoCliente.telefone
            }
        })
    } catch (error) {
        console.error("Erro ao criar cliente", error);
        return res.status(500).json({ message: 'Erro interno' });
    }
}

export const listarClientes = async (req, res) => {
    try {
        let { page = 1, limit = 10, nome, email, tipo } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        const where = { deletedAt: null };

        if(nome) where.nome = nome
        if(email) where.email = email
        if(tipo) where.tipo = tipo

        const clientes = await prisma.cliente.findMany({
            skip: skip,     
            take: limit,
            where: where, 
            orderBy: {
                idCliente: 'desc'
            },
            select: {       
                idCliente: true,
                nome: true,
                email: true,
                telefone: true,
                ativo: true,
                endereco: true,
                idEmpresa: true
            }
        });

        const totalRegistros = await prisma.cliente.count({
            where: where
        });
        const totalPaginas = Math.ceil(totalRegistros / limit);

        //console.log(where)

        return res.status(200).json({
            data: clientes,       
            meta: {               
                total: totalRegistros,
                page: page,
                limit: limit,
                totalPages: totalPaginas
            }
        });
    } catch (error) {
        console.error("Erro ao listar clientes:", error);
        return res.status(500).json({ message: "Erro interno." });
    }
}

export const editarCliente = async (req, res) => {
    try {
        const { nome, email, telefone, endereco, idEmpresa } = req.body
        const { id } = req.params
        
        const verificaTipo = req.usuario.tipo;

        if (verificaTipo !== 'GESTOR') {
            return res.status(403).json({ message: "Acesso negado. Apenas gestores podem editar clientes." });
        }

        const idCliente = parseInt(id)
        
        if (isNaN(idCliente)) {
            return res.status(400).json({ message: "ID inválido." });
        }

        if (email) {
            const emailExiste = await prisma.cliente.findUnique({ where: { email } });
            if (emailExiste && emailExiste.idCliente !== idCliente) {
                return res.status(400).json({ message: "Email já está em uso por outro cliente." });
            }
        }

        if (telefone) {
            const telefoneExiste = await prisma.cliente.findUnique({ where: { telefone } });
            if (telefoneExiste && telefoneExiste.idCliente !== idCliente) {
                return res.status(400).json({ message: "Telefone já está em uso por outro cliente." });
            }
        }
        
        const clienteAtualizado = await prisma.cliente.update({
            where: {
                idCliente: idCliente
            },
            data: {
                nome: nome || undefined,
                email: email || undefined,
                telefone: telefone || undefined,
                endereco: endereco || undefined,
                idEmpresa: idEmpresa ? parseInt(idEmpresa) : undefined
            }
        })

        return res.status(200).json({
            message: "Cliente atualizado com sucesso.",
            data: clienteAtualizado
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }
        console.error("Erro ao editar:", error);
        return res.status(500).json({ message: "Erro interno." });
    }
}

export const excluirCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioLogado = req.usuario;

        if (usuarioLogado.tipo !== 'GESTOR') {
            return res.status(403).json({ message: "Acesso negado." });
        }

        const idInt = parseInt(id);
        if (isNaN(idInt)) { 
            return res.status(400).json({ message: "ID inválido." });
        }

        await prisma.cliente.update({
            where: { idCliente: idInt },
            data: { 
                deletedAt: new Date(), 
                ativo: false           
            }
        });

        return res.status(204).send(); 
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }
        console.error("Erro ao remover:", error);
        return res.status(500).json({ message: "Erro interno." });
    }
}

export const alternarStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioLogado = req.usuario;

        if (usuarioLogado.tipo !== 'GESTOR') {
            return res.status(403).json({ message: "Apenas gestores podem alterar status." });
        }

        const idInt = parseInt(id);
        if (isNaN(idInt)) return res.status(400).json({ message: "ID inválido." });

        const clienteAlvo = await prisma.cliente.findUnique({
            where: { idCliente: idInt }
        });

        if (!clienteAlvo) return res.status(404).json({ message: "Cliente não encontrado." });

        const clienteAtualizado = await prisma.cliente.update({
            where: { idCliente: idInt },
            data: { ativo: !clienteAlvo.ativo }
        });

        return res.status(200).json({
            message: `Cliente ${clienteAtualizado.ativo ? 'ativado' : 'inativado'} com sucesso!`,
            ativo: clienteAtualizado.ativo
        });
    } catch (error) {
        console.error("Erro ao alterar status:", error);
        return res.status(500).json({ message: "Erro interno." });
    }
}