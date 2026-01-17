import prisma from '../prismaClient.js';

export const criarEmpresa = async (req, res) => {
    try {
        const { nomeFantasia, cnpj, endereco, telefone } = req.body;
        
        const existe = await prisma.empresa.findFirst({ where: { cnpj } });
        if (existe) {
            return res.status(400).json({ message: "CNPJ já cadastrado." });
        }

        const novaEmpresa = await prisma.empresa.create({
            data: { nomeFantasia, cnpj, endereco, telefone }
        });
        
        return res.status(201).json(novaEmpresa);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno." });
    }
};

export const listarEmpresas = async (req, res) => {
    try {
        const empresas = await prisma.empresa.findMany({
            where: { isActive: true },
            orderBy: { nomeFantasia: 'asc' }
        });
        return res.status(200).json(empresas);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao listar." });
    }
};

export const buscarEmpresaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const empresa = await prisma.empresa.findUnique({
            where: { idEmpresa: parseInt(id) }
        });

        if (!empresa) return res.status(404).json({ message: "Empresa não encontrada." });
        
        return res.status(200).json(empresa);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno." });
    }
};

export const editarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const { nomeFantasia, cnpj, endereco, telefone } = req.body;

        const empresaAtualizada = await prisma.empresa.update({
            where: { idEmpresa: parseInt(id) },
            data: { nomeFantasia, cnpj, endereco, telefone }
        });

        return res.status(200).json(empresaAtualizada);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao editar empresa." });
    }
};

export const excluirEmpresa = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.empresa.update({
            where: { idEmpresa: parseInt(id) },
            data: { isActive: false }
        });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Erro ao desativar empresa." });
    }
};