import prisma from '../prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { json } from 'stream/consumers';
import { forEachChild } from 'typescript';

export const graficoPizza = async (req, res) => {
  try {
    let { idResponsavel, idStatus, dataInicio, dataFim } = req.query;

    if (!dataInicio || !dataFim) {
      return res.status(400).json({
        error: "Os parâmetros dataInicio e dataFim são obrigatórios",
      });
    }

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    fim.setHours(23, 59, 59, 999);

    const diffTime = fim.getTime() - inicio.getTime();
    const diffDias = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDias > 30) {
      return res.status(400).json({
        error: "O intervalo entre as datas deve ser de no máximo 30 dias",
      });
    }

    if (diffDias > 30) {
      return res.status(400).json({
        error: "O intervalo entre as datas deve ser de no máximo 30 dias",
      });
    }

    const where = {
      deletedAt: null,
      idResponsavel: { not: null },
      createdAt: {
        gte: inicio,
        lte: fim,
      },
    };

    if (idStatus) where.idStatus = parseInt(idStatus);
    if (idResponsavel) where.idResponsavel = parseInt(idResponsavel);

    const resultado = await prisma.chamado.groupBy({
      where,
      by: ["idStatus"],
      _count: {
        idChamado: true,
      },
      orderBy: {
        _count: {
          idChamado: "desc",
        },
      },
    });

    const status = await prisma.status.findMany({
      where: {
        idStatus: {
          in: resultado.map((r) => r.idStatus),
        },
      },
      select: {
        idStatus: true,
        descricao: true,
      },
    });

    const mapaStatus = {};
    status.forEach((s) => {
      mapaStatus[s.idStatus] = s.descricao;
    });

    const dadosGrafico = resultado.map((r) => ({
      status: mapaStatus[r.idStatus] || "Sem nome",
      quantidadeChamados: r._count.idChamado,
    }));

    return res.status(200).json({
      data: dadosGrafico,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao gerar relatório",
    });
  }
};

export const graficoBarra = async (req, res) => {
  try {
    let { idResponsavel, idStatus, dataInicio, dataFim } = req.query;

    if (!dataInicio || !dataFim) {
      return res.status(400).json({
        error:
          "Os parâmetros dataInicio e dataFim são obrigatórios (YYYY-MM-DD)",
      });
    }

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
      return res.status(400).json({
        error: "Formato de data inválido. Use YYYY-MM-DD",
      });
    }

    inicio.setHours(0, 0, 0, 0);
    fim.setHours(23, 59, 59, 999);

    const diffTime = fim.getTime() - inicio.getTime();
    const diffDias = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDias > 30) {
      return res.status(400).json({
        error: "O intervalo entre as datas deve ser de no máximo 30 dias",
      });
    }

    if (diffDias > 30) {
      return res.status(400).json({
        error: "O intervalo entre as datas deve ser de no máximo 30 dias",
      });
    }

    const where = {
      deletedAt: null,
      idResponsavel: { not: null },
      createdAt: {
        gte: inicio,
        lte: fim,
      },
    };

    if (idStatus) where.idStatus = parseInt(idStatus);
    if (idResponsavel) where.idResponsavel = parseInt(idResponsavel);

    const resultado = await prisma.chamado.groupBy({
      where,
      by: ["idResponsavel"],
      _count: {
        idChamado: true,
      },
      orderBy: {
        _count: {
          idChamado: "desc",
        },
      },
    });

    const tecnicos = await prisma.usuario.findMany({
      where: {
        idUsuario: {
          in: resultado.map((r) => r.idResponsavel),
        },
      },
      select: {
        idUsuario: true,
        nome: true,
      },
    });

    const mapaTecnicos = {};

    tecnicos.forEach((t) => {
      mapaTecnicos[t.idUsuario] = t.nome;
    });

    const dadosGrafico = resultado.map((r) => ({
      tecnico: mapaTecnicos[r.idResponsavel] || "Sem nome",
      quantidadeChamados: r._count.idChamado,
    }));

    return res.status(200).json({
      data: dadosGrafico,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao gerar relatório",
    });
  }
};

export const graficoArea = async (req, res) => {
  try {
    let { dataInicio, dataFim, idStatus, idResponsavel } = req.query;

    if (!dataInicio || !dataFim) {
      return res.status(400).json({
        error:
          "Os parâmetros dataInicio e dataFim são obrigatórios (YYYY-MM-DD)",
      });
    }

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
      return res.status(400).json({
        error: "Formato de data inválido. Use YYYY-MM-DD",
      });
    }

    inicio.setHours(0, 0, 0, 0);
    fim.setHours(23, 59, 59, 999);

    const diffTime = fim.getTime() - inicio.getTime();
    const diffDias = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDias > 30) {
      return res.status(400).json({
        error: "O intervalo entre as datas deve ser de no máximo 30 dias",
      });
    }

    if (diffDias > 30) {
      return res.status(400).json({
        error: "O intervalo entre as datas deve ser de no máximo 30 dias",
      });
    }

    const todosDias = [];
    const atual = new Date(inicio);

    while (atual <= fim) {
      todosDias.push(new Date(atual));
      atual.setDate(atual.getDate() + 1);
    }

    const agrupado = {};

    todosDias.forEach((d) => {
      const diaStr = d.toLocaleDateString("pt-BR");
      agrupado[diaStr] = {
        ValorTotalOS: 0,
        ValorTotalProdutos: 0,
        produtos: {},
      };
    });

    const whereChamado = {
      deletedAt: null,
      createdAt: {
        gte: inicio,
        lte: fim,
      },
    };

    if (idStatus) whereChamado.idStatus = parseInt(idStatus);
    if (idResponsavel) whereChamado.idResponsavel = parseInt(idResponsavel);

    const chamados = await prisma.chamado.findMany({
      where: whereChamado,
      select: {
        idChamado: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    for (const chamado of chamados) {
      const osList = await prisma.oS.findMany({
        where: { idChamado: chamado.idChamado },
        select: { idOS: true, valor: true },
      });

      const dia = chamado.createdAt.toLocaleDateString("pt-BR");

      for (const os of osList) {
        agrupado[dia].ValorTotalOS += os.valor || 0;

        const osProdutos = await prisma.osProduto.findMany({
          where: { idOS: os.idOS },
          select: { idProduto: true, quantidade: true },
        });

        for (const op of osProdutos) {
          const produto = await prisma.produto.findUnique({
            where: { idProduto: op.idProduto },
            select: { preco: true, descricao: true },
          });

          const descricao = produto?.descricao || "Produto sem descrição";
          const valorUnitario = produto?.preco || 0;
          const valorTotalProduto = op.quantidade * valorUnitario;

          if (!agrupado[dia].produtos[descricao]) {
            agrupado[dia].produtos[descricao] = {
              quantidade: 0,
              valorUnitario,
              valorTotal: 0,
            };
          }

          agrupado[dia].produtos[descricao].quantidade += op.quantidade;
          agrupado[dia].produtos[descricao].valorTotal += valorTotalProduto;
        }

        agrupado[dia].ValorTotalProdutos = Object.values(
          agrupado[dia].produtos,
        ).reduce((sum, p) => sum + p.valorTotal, 0);
      }
    }

    const resultado = todosDias.map((d) => {
      const diaStr = d.toLocaleDateString("pt-BR");

      return {
        dia: diaStr,
        ValorTotalOS: agrupado[diaStr].ValorTotalOS,
        ValorTotalProdutos: agrupado[diaStr].ValorTotalProdutos,
        LucroLiquido:
          agrupado[diaStr].ValorTotalOS - agrupado[diaStr].ValorTotalProdutos,
      };
    });

    return res.status(200).json({
      data: resultado,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao gerar relatório",
    });
  }
};

export const graficoCards = async (req, res) => {};
