import prisma from '../prismaClient.js';

export const gerarOS = async (req, res) => {
    try {
        const { idChamado, obs, dataPrazo } = req.body;

        if (!idChamado) {
            return res.status(400).json({ message: "ID do chamado é obrigatório." });
        }

        const idChamadoInt = parseInt(idChamado);

        const osExistente = await prisma.oS.findFirst({
            where: { idChamado: idChamadoInt }
        });

        if (osExistente) {
            return res.status(400).json({ message: "Já existe uma OS para este chamado." });
        }

        const novaOS = await prisma.oS.create({
            data: {
                idChamado: idChamadoInt,
                obs: obs || null,
                dataPrazo: dataPrazo ? new Date(dataPrazo) : null,
                valor: 0
            }
        });

        await prisma.chamado.update({
            where: { idChamado: idChamadoInt },
            data: { idStatus: 2 } 
        });

        return res.status(201).json({ message: "OS Gerada!", os: novaOS });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno." });
    }
};

export const listarOS = async (req, res) => {
    try {
        const lista = await prisma.oS.findMany({
            orderBy: { idOS: 'desc' },
            include: {
                chamado: {
                    include: {
                        cliente: { select: { nome: true, telefone: true } },
                        status: true
                    }
                },
                itens: {
                    include: {
                        produto: true
                    }
                }
            }
        });
        return res.status(200).json(lista);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno." });
    }
};

export const buscarOSPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const os = await prisma.oS.findUnique({
            where: { idOS: parseInt(id) },
            include: {
                chamado: { include: { cliente: true, status: true } },
                itens: { include: { produto: true } }
            }
        });

        if (!os) return res.status(404).json({ message: "OS não encontrada." });
        return res.status(200).json(os);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno." });
    }
};

export const editarOS = async (req, res) => {
    try {
        const { id } = req.params;
        const { obs, dataPrazo, maoDeObra, produtos } = req.body;
        
        const idOSInt = parseInt(id);

        await prisma.$transaction(async (tx) => {
            
            const dadosAtualizar = {};
            if (obs !== undefined) dadosAtualizar.obs = obs;
            if (dataPrazo) dadosAtualizar.dataPrazo = new Date(dataPrazo);
            
            if (produtos && Array.isArray(produtos)) {
                await tx.osProduto.deleteMany({ where: { idOS: idOSInt } });

                for (const item of produtos) {
                    let produtoId;

                    const produtoExistente = await tx.produto.findFirst({
                        where: { descricao: item.nome } 
                    });

                    if (produtoExistente) {
                        produtoId = produtoExistente.idProduto;
                        
                        if (parseFloat(item.preco) !== produtoExistente.preco) {
                            await tx.produto.update({
                                where: { idProduto: produtoId },
                                data: { preco: parseFloat(item.preco) }
                            });
                        }
                    } else {
                        const novoProduto = await tx.produto.create({
                            data: {
                                descricao: item.nome,
                                preco: parseFloat(item.preco)
                            }
                        });
                        produtoId = novoProduto.idProduto;
                    }

                    await tx.osProduto.create({
                        data: {
                            idOS: idOSInt,
                            idProduto: produtoId,
                            quantidade: parseInt(item.quantidade)
                        }
                    });
                }
            }

            const osComItens = await tx.oS.findUnique({
                where: { idOS: idOSInt },
                include: { itens: { include: { produto: true } } }
            });

            let totalPecas = 0;
            osComItens.itens.forEach(item => {
                totalPecas += (item.produto.preco * item.quantidade);
            });

            const valorMaoDeObra = maoDeObra ? parseFloat(maoDeObra) : 0;
            const valorFinal = totalPecas + valorMaoDeObra;

            await tx.oS.update({
                where: { idOS: idOSInt },
                data: { 
                    ...dadosAtualizar,
                    valor: valorFinal 
                }
            });
        });

        const osFinal = await prisma.oS.findUnique({
            where: { idOS: idOSInt },
            include: { itens: { include: { produto: true } } }
        });

        return res.status(200).json({ message: "OS salva com sucesso!", os: osFinal });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno ao salvar OS." });
    }
};

export const finalizarOS = async (req, res) => {
    try {
        const { id } = req.params;
        const os = await prisma.oS.findUnique({ where: { idOS: parseInt(id) } });

        if (!os) return res.status(404).json({ message: "OS não encontrada." });

        await prisma.chamado.update({
            where: { idChamado: os.idChamado },
            data: {
                idStatus: 4, 
                dataFechamento: new Date()
            }
        });

        return res.status(200).json({ message: "Serviço finalizado com sucesso!" });

    } catch (error) {
        return res.status(500).json({ message: "Erro interno." });
    }
};