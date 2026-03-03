import prisma from '../prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { json } from 'stream/consumers';

export const graficoPizza = async (req, res) => {
    try {
        let { page = 1, limit = 10, idResponsavel, idStatus, dataInicio, dataFim } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const skip = (page - 1) * limit;

        const where = {
            deletedAt: null,
            idResponsavel: { not: null }
        };

        if (dataInicio || dataFim) {
            where.createdAt = {};

            if (dataInicio) {
                where.createdAt.gte = new Date(dataInicio);
            }

            if (dataFim) {
                const dataFimDate = new Date(dataFim);
                dataFimDate.setHours(23, 59, 59, 999);
                where.createdAt.lte = dataFimDate;
            }
        }

        if (idStatus) where.idStatus = parseInt(idStatus)

        if (idResponsavel) where.idResponsavel = parseInt(idResponsavel)

        const resultado = await prisma.chamado.groupBy({
            where: where,
            by: ['idStatus'],
            _count: {
                idChamado: true,
            },
            orderBy: {
                _count: {
                    idChamado: 'desc'
                }
            }
        });

        const totalRegistros = resultado.length;
        const totalPaginas = Math.ceil(totalRegistros / limit);

        // Paginação manual ****
        const resultadoPaginado = resultado.slice(skip, skip + limit);

        const tecnicos = await prisma.status.findMany({
            where: {
                idStatus: {
                    in: resultadoPaginado.map(r => r.idStatus)
                }
            },
            select: {
                idStatus: true,
                descricao: true
            }
        });

        const mapaTecnicos = {};
        tecnicos.forEach(t => {
            mapaTecnicos[t.idStatus] = t.descricao;
        });

        const dadosGrafico = resultadoPaginado.map(r => ({
            status: mapaTecnicos[r.idStatus] || "Sem nome",
            quantidadeChamados: r._count.idChamado
        }));

        return res.status(200).json({
            data: dadosGrafico,
            meta: {
                total: totalRegistros,
                page: page,
                limit: limit,
                totalPages: totalPaginas
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Erro ao gerar relatório"});
    }
}

export const graficoBarra = async (req, res) => {
    try {
        let { page = 1, limit = 10, idResponsavel, idStatus, dataInicio, dataFim } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const skip = (page - 1) * limit;

        const where = {
            deletedAt: null,
            idResponsavel: { not: null }
        };

        if (dataInicio || dataFim) {
            where.createdAt = {};

            if (dataInicio) {
                where.createdAt.gte = new Date(dataInicio);
            }

            if (dataFim) {
                const dataFimDate = new Date(dataFim);
                dataFimDate.setHours(23, 59, 59, 999);
                where.createdAt.lte = dataFimDate;
            }
        }

        if (idStatus) where.idStatus = parseInt(idStatus)

        if (idResponsavel) where.idResponsavel = parseInt(idResponsavel)

        const resultado = await prisma.chamado.groupBy({
            where: where,
            by: ['idResponsavel'],
            _count: {
                idChamado: true,
            },
            orderBy: {
                _count: {
                    idChamado: 'desc'
                }
            }
        });

        const totalRegistros = resultado.length;
        const totalPaginas = Math.ceil(totalRegistros / limit);

        // Paginação manual ****
        const resultadoPaginado = resultado.slice(skip, skip + limit);

        const tecnicos = await prisma.usuario.findMany({
            where: {
                idUsuario: {
                    in: resultadoPaginado.map(r => r.idResponsavel)
                }
            },
            select: {
                idUsuario: true,
                nome: true
            }
        });

        const mapaTecnicos = {};
        tecnicos.forEach(t => {
            mapaTecnicos[t.idUsuario] = t.nome;
        });

        const dadosGrafico = resultadoPaginado.map(r => ({
            tecnico: mapaTecnicos[r.idResponsavel] || "Sem nome",
            quantidadeChamados: r._count.idChamado
        }));

        return res.status(200).json({
            data: dadosGrafico,
            meta: {
                total: totalRegistros,
                page: page,
                limit: limit,
                totalPages: totalPaginas
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Erro ao gerar relatório"});
    }
}

export const graficoArea = async (req, res) => {

}

export const graficoCards = async (req, res) => {

}