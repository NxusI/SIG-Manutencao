import nodemailer from 'nodemailer';

const BASE_URL = process.env.API_URL || 'http://localhost:3001';
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const criarTransporter = async () => {
    if (!EMAIL_USER || !EMAIL_PASS) {
        console.error("❌ ERRO: As variáveis EMAIL_USER e EMAIL_PASS não estão no arquivo .env");
        return null;
    }

    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

export const enviarEmailOrcamento = async (destinatario, nomeCliente, dadosOS) => {
    try {
        const transporter = await criarTransporter();

        if (!transporter) return;

        const linkAprovar = `${BASE_URL}/api/os/resposta/${dadosOS.idOS}/APROVADO`;
        const linkRecusar = `${BASE_URL}/api/os/resposta/${dadosOS.idOS}/REPROVADO`;

        let itensHtml = '';
        if (dadosOS.itens && dadosOS.itens.length > 0) {
            itensHtml = `
                <div style="background-color: #fff; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                    <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #555;">📦 Peças e Produtos:</h3>
                    <ul style="padding-left: 20px; margin: 0;">
                        ${dadosOS.itens.map(item => `
                            <li style="margin-bottom: 5px;">
                                <strong>${item.produto.descricao}</strong> <br>
                                <span style="font-size: 12px; color: #666;">
                                    ${item.quantidade}x R$ ${item.produto.preco.toFixed(2)}
                                </span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        const htmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
                <div style="background-color: #28a745; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
                    <h1 style="margin: 0; font-size: 24px;">Orçamento Disponível</h1>
                </div>
                
                <div style="padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px;">
                    <p>Olá, <strong>${nomeCliente}</strong>!</p>
                    <p>A análise do seu equipamento (<strong>${dadosOS.chamado.equipamento}</strong>) referente ao chamado #${dadosOS.chamado.idChamado} foi concluída.</p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin-top: 0;"><strong>🛠️ Diagnóstico / Observações:</strong><br>
                        ${dadosOS.obs || 'Nenhuma observação registrada.'}</p>
                        
                        ${itensHtml}

                        <hr style="border: 0; border-top: 1px solid #ddd; margin: 15px 0;">
                        
                        <div style="text-align: right;">
                            <span style="font-size: 14px; color: #666;">Valor Total do Serviço:</span><br>
                            <span style="font-size: 24px; font-weight: bold; color: #28a745;">R$ ${dadosOS.valor.toFixed(2)}</span>
                        </div>
                        
                        <p style="font-size: 13px; margin-top: 10px;">
                            <strong>Prazo Estimado:</strong> ${dadosOS.dataPrazo ? new Date(dadosOS.dataPrazo).toLocaleDateString('pt-BR') : 'A combinar'}
                        </p>
                    </div>

                    <p style="text-align: center; font-weight: bold; margin-bottom: 20px;">
                        O que deseja fazer?
                    </p>

                    <div style="text-align: center; margin-bottom: 30px;">
                        <a href="${linkAprovar}" style="background-color: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 0 10px; display: inline-block;">
                            ✅ APROVAR
                        </a>
                        <a href="${linkRecusar}" style="background-color: #dc3545; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 0 10px; display: inline-block;">
                            ❌ RECUSAR
                        </a>
                    </div>

                    <p style="font-size: 12px; color: #888; text-align: center; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
                        Este é um e-mail automático. Por favor, não responda.<br>
                        Caso tenha dúvidas, entre em contato com a nossa equipe.
                    </p>
                </div>
            </div>
        `;

        const info = await transporter.sendMail({
            from: `"SIG Manutenção" <${EMAIL_USER}>`,
            to: destinatario,
            subject: `Orçamento Aprovado: OS #${dadosOS.idOS}`,
            html: htmlBody,
        });

        console.log(`📧 E-mail enviado para ${destinatario} (ID: ${info.messageId})`);
    
    } catch (error) {
        console.error("❌ Erro ao enviar e-mail:", error);
    }
};