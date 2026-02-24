import prisma from '../prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const criarChamado = async (req, res) => {
    try {
        const idUsuarioLogado = req.usuario.idUsuario;
        const { idCliente, equipamento, descricao, idResponsavel, titulo, dataSolicitacao } = req.body;
        
        const idClienteInt = parseInt(idCliente);
        const idResponsavelInt = idResponsavel ? parseInt(idResponsavel) : null;

        if (!titulo || !equipamento || isNaN(idClienteInt) || idClienteInt <= 0 || !descricao) {
            return res.status(400).json({ message: 'Dados inválidos ou faltando.' });
        }

        const novoChamado = await prisma.chamado.create({
            data: {
                idCliente: idClienteInt,
                titulo: titulo,
                equipamento,
                descricao,
                idResponsavel: idResponsavelInt,
                idStatus: 1,
                idUsuarioCriacao: idUsuarioLogado,
                dataSolicitacao: dataSolicitacao ? new Date(dataSolicitacao) : undefined
            }
        });

        return res.status(201).json({ 
            message: 'Chamado criado com sucesso!',
            idChamado: novoChamado.idChamado
        });

    } catch (error) {
        console.error("Erro ao criar:", error);
        return res.status(500).json({ message: 'Erro interno.' });
    }
};

export const listarChamados = async (req, res) => {
    try {
        let { page = 1, limit = 10, idCliente, idResponsavel, idStatus, dataInicio, dataFim, titulo } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const skip = (page - 1) * limit;
        const where = { deletedAt: null };

        if (idCliente) where.idCliente = parseInt(idCliente);
        if (idResponsavel) where.idResponsavel = parseInt(idResponsavel);
        if (idStatus) where.idStatus = parseInt(idStatus);

        if (titulo) {
            where.titulo = {
                contains: titulo
            };
        }

        if (dataInicio || dataFim) {
            where.createdAt = {};
            
            if (dataInicio) where.createdAt.gte = new Date(dataInicio);
            if (dataFim) {
                const dataFimDate = new Date(dataFim);
                dataFimDate.setHours(23, 59, 59, 999);
                where.createdAt.lte = dataFimDate;
            }
        }

        const chamados = await prisma.chamado.findMany({
            skip: skip,     
            take: limit,    
            where: where, 
            orderBy: { 
                idChamado: 'desc'
            },
            include: {
                cliente: { 
                    select: { nome: true, telefone: true } 
                },
                status: true, 
                responsavel: { 
                    select: { nome: true } 
                },
                criadoPor: {
                    select: { nome: true }
                }
            }
        });


        const totalRegistros = await prisma.chamado.count({ where: where });
        const totalPaginas = Math.ceil(totalRegistros / limit);

        //console.log(where)

        return res.status(200).json({
            data: chamados,       
            meta: {  
                total: totalRegistros,
                page: page,
                limit: limit,
                totalPages: totalPaginas
            }
        });

    } catch (error) {
        console.error("Erro ao listar chamados:", error);
        return res.status(500).json({ message: "Erro interno." });
    }
}

export const editarChamado = async (req, res) => {
    try {
        const { id } = req.params;
        const { idCliente, idResponsavel, equipamento, descricao, idStatus, titulo } = req.body;

        const idChamadoInt = parseInt(id);
        if (isNaN(idChamadoInt)) return res.status(400).json({ message: "ID do chamado inválido." });

        const dadosParaAtualizar = {};

        if (titulo) dadosParaAtualizar.titulo = titulo;
        if (equipamento) dadosParaAtualizar.equipamento = equipamento;
        if (descricao) dadosParaAtualizar.descricao = descricao;
        if (idCliente) dadosParaAtualizar.idCliente = parseInt(idCliente);
        if (idStatus) dadosParaAtualizar.idStatus = parseInt(idStatus);

        if (idResponsavel) {
            const idRespInt = parseInt(idResponsavel);
            dadosParaAtualizar.idResponsavel = idRespInt;
            if (!idStatus) {
                dadosParaAtualizar.idStatus = 2; 
            }
        }

        if (Object.keys(dadosParaAtualizar).length === 0) {
            return res.status(400).json({ message: "Nenhum dado enviado para atualização." });
        }

        const chamadoAtualizado = await prisma.chamado.update({
            where: {
                idChamado: idChamadoInt
            },
            data: dadosParaAtualizar,
            include: {
                status: true,     
                responsavel: true  
            }
        });

        return res.status(200).json({ 
            mensagem: 'Chamado atualizado com sucesso!',
            info: dadosParaAtualizar.idStatus === 2 ? "Status alterado para 'Em Andamento' automaticamente." : null,
            data: chamadoAtualizado
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Chamado não encontrado." });
        }
        console.error("Erro ao atualizar chamado:", error);
        return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

export const listarStatus = async (req, res) => {
    try {
        const statusList = await prisma.status.findMany({
            orderBy: { idStatus: 'asc' }
        });

        return res.status(200).json(statusList);
    } catch (error) {
        console.error("Erro ao buscar status:", error);
        return res.status(500).json({ message: "Erro ao buscar status." });
    }
};

export const buscarChamadoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const idInt = parseInt(id);

        if (isNaN(idInt)) {
            return res.status(400).json({ message: "ID inválido." });
        }

        const chamado = await prisma.chamado.findUnique({
            where: { idChamado: idInt },
            include: {
                cliente: true,
                status: true,
                responsavel: {
                    select: { idUsuario: true, nome: true, email: true }
                },
                criadoPor: {
                    select: { idUsuario: true, nome: true }
                }
            }
        });

        if (!chamado || chamado.deletedAt) {
            return res.status(404).json({ message: "Chamado não encontrado." });
        }

        return res.status(200).json(chamado);
    } catch (error) {
        console.error("Erro ao buscar detalhe:", error);
        return res.status(500).json({ message: "Erro interno." });
    }
};