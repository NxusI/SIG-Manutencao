import prisma from '../prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const criarChamado = async (req, res) => {
    const { idCliente, idResponsavel, equipamento, descricao, idStatus} = req.body;
    
    const idClienteInt = parseInt(idCliente);
    const idResponsavelInt = parseInt(idResponsavel);
    const idStatusInt = parseInt(idStatus);
    
    // if (
    //     !equipamento || 
    //     isNaN(idClienteInt) || idClienteInt <= 0 || !descricao
    // ) {
    //     return res.status(400).json({ mensagem: 'Dados inválidos ou faltando.' });
    // }

    console.log(idCliente + ' | ' + idResponsavel + ' | ' + equipamento + ' | ' + descricao + ' | ' + idStatus)

    try {
        const novoChamado = await prisma.chamado.create({
            data: {
                idCliente: idClienteInt,
                idResponsavel: idResponsavelInt,
                equipamento: equipamento,
                descricao: descricao,
                idStatus: idStatusInt
            }
        });

        return res.status(201).json({ 
            mensagem: 'Chamado criado com sucesso!',
            idChamado: novoChamado.idChamado
        });

    } catch (error) {
        console.error("Erro ao criar chamado:", error);
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    };
};


export const listarChamados = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        
        page = parseInt(page);
        limit = parseInt(limit);
        
        if (page < 1) page = 1;
        if (limit < 1 || limit > 100) limit = 10;
        
        const skip = (page - 1) * limit;
        
        const chamados = await prisma.chamado.findMany({
            skip: skip,     
            take: limit,    
            orderBy: {
                idChamado: 'desc' 
            },
            
            include: {
                cliente: {
                    select: {
                        nome: true,
                        telefone: true
                    }
                },
                status: true, 
                responsavel: { 
                    select: {
                        nome: true
                    }
                }
            }
        });
        
        const totalRegistros = await prisma.chamado.count();
        const totalPaginas = Math.ceil(totalRegistros / limit);
        
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
    const { idCliente, idResponsavel, equipamento, descricao, idStatus } = req.body;
    console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
    const {id} = req.params
    console.log("vindo?:" + id)
    
    const idChamadoInt = parseInt(id);

    const idClienteInt = parseInt(idCliente);
    const idResponsavelInt = parseInt(idResponsavel);
    
    console.log(idCliente + ' | ' + idResponsavel + ' | ' + equipamento + ' | ' + descricao + ' | ' + idStatus + ' | ' + idChamadoInt)


    try {
        const chamadoAtualizado = await prisma.chamado.update({
            where:{
                idChamado: idChamadoInt
            },
            data: {
                idCliente: idClienteInt,
                idResponsavel: idResponsavelInt,
                equipamento: equipamento,
                descricao: descricao,
                idStatus: idStatus
            },
        });

        return res.status(201).json({ 
            mensagem: 'Chamado atualizado com sucesso!',
            data: chamadoAtualizado
        });

    } catch (error) {
        console.error("Erro ao atualizar chamado:", error);
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    };
};