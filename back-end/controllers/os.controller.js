import prisma from '../prismaClient.js';
import { enviarEmailOrcamento } from '../services/email.service.js';

export const gerarOS = async (req, res) => {
    try {
        const { idChamado, obs, dataPrazo, maoDeObra, produtos, diagnostico } = req.body;

        if (!idChamado) return res.status(400).json({ message: "ID do chamado obrigatório." });

        const idChamadoInt = parseInt(idChamado);

        // Aqui usa findFirst, então tá ok
        const osExistente = await prisma.oS.findFirst({ where: { idChamado: idChamadoInt } });
        if (osExistente) return res.status(400).json({ message: "Já existe uma OS para este chamado." });

        let osFinal = null;
        let dispararEmail = false;

        await prisma.$transaction(async (tx) => {
            let totalPecas = 0;
            const itensParaCriar = [];

            if (produtos && Array.isArray(produtos)) {
                for (const item of produtos) {
                    let produtoId;
                    
                    const prodExiste = await tx.produto.findFirst({ where: { descricao: item.nome } });
                    
                    if (prodExiste) {
                        produtoId = prodExiste.idProduto;
                        if (parseFloat(item.preco) !== prodExiste.preco) {
                            await tx.produto.update({
                                where: { idProduto: produtoId },
                                data: { preco: parseFloat(item.preco) }
                            });
                        }
                    } else {
                        const novo = await tx.produto.create({
                            data: { descricao: item.nome, preco: parseFloat(item.preco) }
                        });
                        produtoId = novo.idProduto;
                    }

                    const qtd = parseInt(item.quantidade);
                    totalPecas += (parseFloat(item.preco) * qtd);
                    
                    itensParaCriar.push({
                        idProduto: produtoId,
                        quantidade: qtd
                    });
                }
            }

            const valorServico = maoDeObra ? parseFloat(maoDeObra) : 0;
            const valorTotal = totalPecas + valorServico;

            const obsFinal = obs || diagnostico || null;

            const novaOS = await tx.oS.create({
                data: {
                    idChamado: idChamadoInt,
                    obs: obsFinal,
                    dataPrazo: dataPrazo ? new Date(dataPrazo) : null,
                    valor: valorTotal,
                    itens: {
                        create: itensParaCriar
                    }
                }
            });

            if (valorTotal > 0) {
                await tx.chamado.update({
                    where: { idChamado: idChamadoInt },
                    data: { idStatus: 3 } 
                });
                dispararEmail = true;
                osFinal = novaOS;
            } else {
                await tx.chamado.update({
                    where: { idChamado: idChamadoInt },
                    data: { idStatus: 2 } 
                });
            }
        });

        if (dispararEmail) {
            osFinal = await prisma.oS.findFirst({
                where: { idChamado: idChamadoInt },
                include: { 
                    chamado: { include: { cliente: true, status: true } },
                    itens: { include: { produto: true } }
                }
            });

            if (osFinal && osFinal.chamado.cliente.email) {
                await enviarEmailOrcamento(
                    osFinal.chamado.cliente.email, 
                    osFinal.chamado.cliente.nome, 
                    osFinal
                );
            }
        }

        return res.status(201).json({ message: "OS Criada com sucesso!", os: osFinal });

    } catch (error) {
        console.error("Erro ao gerar OS:", error);
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
                        cliente: { select: { nome: true, telefone: true, email: true } },
                        status: true,
                        responsavel: { select: { nome: true } }
                    }
                },
                itens: { include: { produto: true } }
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
                chamado: { 
                    include: { 
                        cliente: true, 
                        status: true,
                        responsavel: { select: { nome: true } }
                    } 
                },
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
        const { obs, dataPrazo, maoDeObra, produtos, diagnostico } = req.body;
        
        const idOSInt = parseInt(id);
        let osFinal = null;
        let dispararEmail = false;

        await prisma.$transaction(async (tx) => {
            
            const dadosAtualizar = {};
            
            const obsFinal = obs || diagnostico; 
            if (obsFinal !== undefined) dadosAtualizar.obs = obsFinal;
            
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
                            data: { descricao: item.nome, preco: parseFloat(item.preco) }
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
                data: { ...dadosAtualizar, valor: valorFinal }
            });

            if (maoDeObra || (produtos && produtos.length > 0)) {
                await tx.chamado.update({
                    where: { idChamado: osComItens.idChamado },
                    data: { idStatus: 3 } 
                });
                dispararEmail = true;
            }
        });

        osFinal = await prisma.oS.findUnique({
            where: { idOS: idOSInt },
            include: { 
                chamado: { include: { cliente: true, status: true } },
                itens: { include: { produto: true } }
            }
        });

        if (dispararEmail && osFinal.chamado.cliente.email) {
            await enviarEmailOrcamento(
                osFinal.chamado.cliente.email, 
                osFinal.chamado.cliente.nome, 
                osFinal
            );
        }

        return res.status(200).json({ message: "OS salva!", os: osFinal });

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
            data: { idStatus: 4, dataFechamento: new Date() }
        });

        return res.status(200).json({ message: "Finalizado com sucesso!" });

    } catch (error) {
        return res.status(500).json({ message: "Erro interno." });
    }
};

export const responderOrcamento = async (req, res) => {
    try {
        const { id, resposta } = req.params;
        const idOSInt = parseInt(id);

        const os = await prisma.oS.findUnique({ where: { idOS: idOSInt } });
        
        if (!os) return res.status(404).send("OS não encontrada");

        const idStatusNovo = resposta === 'APROVADO' ? 2 : 5;

        await prisma.chamado.update({
            where: { idChamado: os.idChamado },
            data: { 
                idStatus: idStatusNovo,
                dataConfirmacao: new Date()
            }
        });

        const cor = resposta === 'APROVADO' ? 'green' : 'red';
        const texto = resposta === 'APROVADO' ? 'Aprovado! Técnicos notificados.' : 'Reprovado. O serviço será cancelado.';

        const htmlResposta = `
            <div style="font-family: Arial; text-align: center; margin-top: 50px;">
                <h1 style="color: ${cor}">${texto}</h1>
                <p>O status do chamado foi atualizado no sistema.</p>
                <button onclick="window.close()" style="padding: 10px 20px; cursor: pointer;">Fechar</button>
            </div>
        `;

        return res.send(htmlResposta);

    } catch (error) {
        console.error("Erro na resposta:", error);
        return res.status(500).send("Erro ao processar.");
    }
};