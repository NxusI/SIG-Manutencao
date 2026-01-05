import { notEqual } from 'assert';
import prisma from '../prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registrar = async (req, res) => {
    try{
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

        const { nome, email, telefone } = req.body;
        
        if(!nome || !email || !telefone){
            return res.status(400).json({ mensagem: 'Dados inválidos ou faltando.'});
        }

        const usuarioExiste_email = await prisma.cliente.findUnique({
            where: { email: email }
        })

        const usuarioExiste_telefone = await prisma.cliente.findUnique({
            where: { telefone: telefone }
        })

        if (usuarioExiste_email){
            return res.status(400).json({ message: 'Email já cadastrado'});
        }

        if (usuarioExiste_telefone){
            return res.status(400).json({ message: 'Telefone já cadastrado'});
        }

        const novoCliente = await prisma.cliente.create({
            data:{
                nome,
                email,
                telefone
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
        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (page < 1) page = 1;
        if (limit < 1 || limit > 100) limit = 10;

        const skip = (page - 1) * limit;

        const clientes = await prisma.cliente.findMany({
            skip: skip,     
            take: limit, 
            orderBy: {
                idCliente: 'desc'
            },
            select: {       
                idCliente: true,
                nome: true,
                email: true,
                telefone: true
            }
        });

        const totalRegistros = await prisma.cliente.count();
        const totalPaginas = Math.ceil(totalRegistros / limit);

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

    try{
        const {nome, email, telefone} = req.body
        const {id} = req.params
        
        const verificaTipo = req.usuario.tipo;

        if (verificaTipo !== 'GESTOR') {
            return res.status(403).json({ message: "Acesso negado. Apenas gestores podem editar clientes." });
        }

        const idCliente = parseInt(id)
        
        if (isNaN(idCliente)) {
            return res.status(400).json({ message: "ID inválido." });
        }

        if (email || telefone) {
            const emailExiste = await prisma.cliente.findUnique({ where: { email } });
            const telefoneExiste = await prisma.cliente.findUnique({ where: { email } });

            if (emailExiste && emailExiste.id_cliente !== idCliente) {
                return res.status(400).json({ message: "Email já está em uso por outro cliente." });
            }

            if (telefoneExiste && emailExiste.id_cliente !== idCliente) {
                return res.status(400).json({ message: "Telefone já está em uso por outro cliente." });
            }
        }
        
        const clienteAtualizado = await prisma.cliente.update({
            where: {
                idCliente: idCliente
            },
            data: {
                nome: nome,
                email: email,
                telefone: telefone
            }
        })

        res.status(201).json({
            message:"Cliente atualizado com sucesso.",
            data: clienteAtualizado
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        console.error("Erro ao editar:", error);
        return res.status(500).json({ message: "Erro interno." });
    }


}

export const excluirCliente = async (req, res) => {
    
    try {
        const {id} = req.params
        const idCliente = parseInt(id)

        const usuarioLogado = req.usuario

        if (usuarioLogado.tipo !== 'GESTOR') {
            return res.status(403).json({ message: "Acesso negado." });
        }

        if (isNaN(idCliente) || idCliente === usuarioLogado.id) {
            return res.status(400).json({ message: "Operação inválida." });
        }

        await prisma.cliente.delete({
            where:{
                idCliente: idCliente
            }
        })

        res.status(200).json({
            message:"Cliente excluído com sucesso!"
        })

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }
        console.error("Erro ao remover:", error);
        return res.status(500).json({ message: "Erro interno." });
    }
}