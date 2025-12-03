import prisma from '../prismaClient.js';

export const getOS = async (req, res) => {
    try {
        // sintaxe do prisma pra checagem
        const osList = await prisma.equipamento.findMany({
            // O 'include' faz o papel do JOIN no SQL
            include: {
                cliente: {
                    select: { name: true, email: true }
                }
            },
            orderBy: {
                id: 'desc'
            }
        });

        return res.status(200).json(osList);

    } catch (error) {
        console.error("Erro ao buscar OS (Prisma):", error);
        return res.status(500).json({ mensagem: 'Erro interno no servidor ao buscar OS.' });
    }
};

export const criarOrdem = async (req, res) => {
    const { clienteId, defeito, orcamento, produto } = req.body;
    
    const idClienteInt = parseInt(clienteId);
    
    const orcamentoFloat = orcamento ? parseFloat(orcamento) : 0.00; 
    
    if (
        !produto || 
        isNaN(idClienteInt) || idClienteInt <= 0 || 
        isNaN(orcamentoFloat)
    ) {
        return res.status(400).json({ mensagem: 'Dados inválidos ou faltando (Verifique clienteId e produto).' });
    }

    try {
        const novaOS = await prisma.equipamento.create({
            data: {
                clienteId: idClienteInt, 
                defeito: defeito, 
                orcamento: orcamentoFloat,
                produto: produto, 
            },
        });

        return res.status(201).json({ 
            mensagem: 'Ordem de Serviço criada com sucesso (via Prisma)!',
            os_id: novaOS.id
        });

    } catch (error) {
        console.error("Erro ao criar OS (Prisma):", error);
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};