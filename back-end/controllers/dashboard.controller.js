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
        return res.status(500).json({ error: "Erro ao gerar relatório" });
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
        return res.status(500).json({ error: "Erro ao gerar relatório" });
    }
}

export const graficoArea = async (req, res) => {
    try {
        let { dataInicio, dataFim, page = 1, limit = 10, idStatus, idResponsavel } = req.query;

        if (!dataInicio || !dataFim) {
            return res.status(400).json({ error: 'Informe dataInicio e dataFim no formato DD-MM-YYYY' });
        }

        page = parseInt(page);
        limit = parseInt(limit);

        // Converter datas
        const [diaIni, mesIni, anoIni] = dataInicio.split('-');
        const [diaFim, mesFim, anoFim] = dataFim.split('-');

        const inicio = new Date(anoIni, mesIni - 1, diaIni);
        const fim = new Date(anoFim, mesFim - 1, diaFim);

        inicio.setHours(0, 0, 0, 0);
        fim.setHours(23, 59, 59, 999);

        // Criar array de dias do intervalo
        const todosDias = [];
        const atual = new Date(inicio);
        while (atual <= fim) {
            todosDias.push(new Date(atual));
            atual.setDate(atual.getDate() + 1);
        }

        // Paginar dias
        const total = todosDias.length;
        const totalPages = Math.ceil(total / limit);
        const diasPagina = todosDias.slice((page - 1) * limit, (page - 1) * limit + limit);

        // Criar mapa inicial de dias
        const agrupado = {};
        diasPagina.forEach(d => {
            const diaStr = d.toLocaleDateString('pt-BR');
            agrupado[diaStr] = {
                ValorTotalOS: 0,
                ValorTotalProdutos: 0,
                produtos: {}
            };
        });

        // Buscar chamados **somente dentro dos dias da página**
        const whereChamado = {
            deletedAt: null,
            createdAt: {
                gte: diasPagina[0],
                lte: diasPagina[diasPagina.length - 1]
            }
        };
        if (idStatus) whereChamado.idStatus = parseInt(idStatus);
        if (idResponsavel) whereChamado.idResponsavel = parseInt(idResponsavel);

        const chamados = await prisma.chamado.findMany({
            where: whereChamado,
            select: { idChamado: true, createdAt: true },
            orderBy: { createdAt: 'asc' }
        });

        // Iterar chamados e agrupar
        for (const chamado of chamados) {
            const osList = await prisma.oS.findMany({
                where: { idChamado: chamado.idChamado },
                select: { idOS: true, valor: true }
            });

            const dia = chamado.createdAt.toLocaleDateString('pt-BR');

            for (const os of osList) {
                agrupado[dia].ValorTotalOS += os.valor || 0;

                const osProdutos = await prisma.osProduto.findMany({
                    where: { idOS: os.idOS },
                    select: { idProduto: true, quantidade: true }
                });

                for (const op of osProdutos) {
                    const produto = await prisma.produto.findUnique({
                        where: { idProduto: op.idProduto },
                        select: { preco: true, descricao: true }
                    });

                    const descricao = produto?.descricao || 'Produto sem descrição';
                    const valorUnitario = produto?.preco || 0;
                    const valorTotalProduto = op.quantidade * valorUnitario;

                    if (!agrupado[dia].produtos[descricao]) {
                        agrupado[dia].produtos[descricao] = {
                            quantidade: 0,
                            valorUnitario,
                            valorTotal: 0
                        };
                    }

                    agrupado[dia].produtos[descricao].quantidade += op.quantidade;
                    agrupado[dia].produtos[descricao].valorTotal += valorTotalProduto;
                }

                agrupado[dia].ValorTotalProdutos = Object.values(agrupado[dia].produtos)
                    .reduce((sum, p) => sum + p.valorTotal, 0);
            }
        }

        const resultado = diasPagina.map(d => {
            const diaStr = d.toLocaleDateString('pt-BR');
            return {
                dia: diaStr,
                ValorTotalOS: agrupado[diaStr].ValorTotalOS,
                ValorTotalProdutos: agrupado[diaStr].ValorTotalProdutos,
                LucroLiquido: agrupado[diaStr].ValorTotalOS - agrupado[diaStr].ValorTotalProdutos
            };
        });

        return res.status(200).json({
            data: resultado,
            meta: {
                total,
                page,
                limit,
                totalPages
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao gerar relatório' });
    }
}

export const graficoCards = async (req, res) => {

}