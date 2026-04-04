import nodemailer from "nodemailer";

const BASE_URL = process.env.API_URL;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const criarTransporter = async () => {
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.error(
      "❌ ERRO: As variáveis EMAIL_USER e EMAIL_PASS não estão no arquivo .env",
    );
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export const enviarEmailOrcamento = async (
  destinatario,
  nomeCliente,
  dadosOS,
  pdfBuffer,
) => {
  try {
    const transporter = await criarTransporter();

    if (!transporter) return;

    const linkAprovar = `${BASE_URL}/api/os/resposta/${dadosOS.idOS}/APROVADO`;
    const linkRecusar = `${BASE_URL}/api/os/resposta/${dadosOS.idOS}/REPROVADO`;

    let itensHtml = "";
    if (dadosOS.itens && dadosOS.itens.length > 0) {
      itensHtml = `
                <div style="background-color: #fff; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                    <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #555;">📦 Peças e Produtos:</h3>
                    <ul style="padding-left: 20px; margin: 0;">
                        ${dadosOS.itens
                          .map(
                            (item) => `
                            <li style="margin-bottom: 5px;">
                                <strong>${item.produto.descricao}</strong> <br>
                                <span style="font-size: 12px; color: #666;">
                                    ${item.quantidade}x R$ ${item.produto.preco.toFixed(2)}
                                </span>
                            </li>
                        `,
                          )
                          .join("")}
                    </ul>
                </div>
            `;
    }

    const htmlBody = `
        <div style="background:#f5f7f9;padding:40px 20px;font-family:Arial, sans-serif;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.05);">

            <!-- Header -->
            <div style="background:#28a745;padding:28px;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:22px;">Orçamento Disponível</h1>
            <p style="margin:6px 0 0 0;color:#dff5e5;font-size:13px;">
                Avaliação concluída
            </p>
            </div>

            <!-- Conteúdo -->
            <div style="padding:28px;">
            <p style="margin-top:0;font-size:15px;">
                Olá, <strong>${nomeCliente}</strong> 👋
            </p>

            <p style="color:#555;font-size:14px;">
                Finalizamos a análise do equipamento 
                <strong>${dadosOS.chamado.equipamento}</strong>
                referente ao chamado <strong>#${dadosOS.chamado.idChamado}</strong>.
            </p>

            <!-- Card Diagnóstico -->
            <div style="background:#f8f9fa;border-radius:8px;padding:18px;margin:25px 0;">
                <p style="margin:0 0 8px 0;font-weight:bold;">Diagnóstico</p>
                <p style="margin:0;color:#555;font-size:14px;">
                ${dadosOS.obs || "Nenhuma observação registrada."}
                </p>
            </div>

            ${itensHtml}

            <!-- Valor -->
            <div style="border-top:1px solid #eee;padding-top:20px;margin-top:20px;">
                <div style="text-align:center;">
                <p style="margin:0;color:#777;font-size:13px;">
                    Valor total do serviço
                </p>
                <p style="margin:5px 0 0 0;font-size:28px;font-weight:bold;color:#28a745;">
                    R$ ${dadosOS.valor.toFixed(2)}
                </p>
                </div>

                <p style="text-align:center;margin-top:10px;font-size:13px;color:#666;">
                Prazo estimado: 
                <strong>
                ${
                  dadosOS.dataPrazo
                    ? new Date(dadosOS.dataPrazo).toLocaleDateString("pt-BR")
                    : "A combinar"
                }
                </strong>
                </p>
            </div>

            <!-- Ação -->
            <div style="text-align:center;margin-top:30px;">
                <p style="font-weight:bold;margin-bottom:18px;">
                O que deseja fazer?
                </p>

                <a href="${linkAprovar}" 
                style="
                    background:#28a745;
                    color:#fff;
                    padding:14px 26px;
                    border-radius:6px;
                    text-decoration:none;
                    font-weight:bold;
                    margin-right:10px;
                    display:inline-block;
                ">
                Aprovar orçamento
                </a>

                <a href="${linkRecusar}" 
                style="
                    background:#dc3545;
                    color:#fff;
                    padding:14px 26px;
                    border-radius:6px;
                    text-decoration:none;
                    font-weight:bold;
                    display:inline-block;
                ">
                Recusar
                </a>
            </div>

            </div>

            <!-- Footer -->
            <div style="padding:20px;text-align:center;font-size:12px;color:#888;border-top:1px solid #eee;">
            Este é um e-mail automático do sistema <strong>SIG Manutenção</strong>.<br>
            Caso tenha dúvidas, entre em contato com nossa equipe.
            </div>

        </div>
        </div>
`;

    const info = await transporter.sendMail({
      from: `"SIG Manutenção" <${EMAIL_USER}>`,
      to: destinatario,
      subject: `Orçamento Aprovado: OS #${dadosOS.idOS}`,
      html: htmlBody,
      attachments: pdfBuffer
        ? [
            {
              filename: `OS-${dadosOS.idOS}.pdf`,
              content: pdfBuffer,
            },
          ]
        : [],
    });

    console.log(
      `📧 E-mail enviado para ${destinatario} (ID: ${info.messageId})`,
    );
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
  }
};

export const enviarEmailTecnico = async (
  destinatario,
  tituloChamado,
  idChamado,
  pdfBuffer,
) => {
  try {
    const transporter = await criarTransporter();

    await transporter.sendMail({
      from: `"SIG Manutenção" <${EMAIL_USER}>`,
      to: destinatario,
      subject: `Ordem de Serviço - Chamado #${idChamado} ${tituloChamado}`,
      text: "Segue a ordem de serviço em anexo.",

      attachments: [
        {
          filename: `OS-${idChamado}.pdf`,
          content: pdfBuffer,
        },
      ],
    });
    console.log("Email enviado ao técnico responsável");
  } catch (e) {
    console.error("❌ Erro ao enviar e-mail:", e);
  }
};

export const enviarEmailGarantia = async (
  destinatario,
  nomeCliente,
  idOS,
  prazoGarantiaDias,
) => {
  try {
    const transporter = await criarTransporter();
    if (!transporter) return;

    const htmlBody = `
  <div style="background:#f5f7f9;padding:40px 20px;font-family:Arial, sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.05);">

      <!-- Header -->
      <div style="background:#28a745;padding:28px;text-align:center;">
        <h1 style="margin:0;color:#fff;font-size:22px;">Garantia Registrada</h1>
        <p style="margin:6px 0 0 0;color:#dff5e5;font-size:13px;">
          Sua garantia foi ativada com sucesso
        </p>
      </div>

      <!-- Conteúdo -->
      <div style="padding:28px;">
        <p style="margin-top:0;font-size:15px;">
          Olá, <strong>${nomeCliente}</strong> 👋
        </p>

        <p style="color:#555;font-size:14px;">
          Informamos que a garantia da sua Ordem de Serviço 
          <strong>#${idOS}</strong> foi registrada com sucesso.
        </p>

        <div style="background:#f8f9fa;border-radius:8px;padding:18px;margin:25px 0;text-align:center;">
          <p style="margin:0;color:#777;font-size:13px;">
            Prazo de garantia
          </p>
          <p style="margin:5px 0 0 0;font-size:26px;font-weight:bold;color:#28a745;">
            ${prazoGarantiaDias} dias
          </p>
        </div>

        <p style="font-size:13px;color:#666;">
          Caso precise acionar a garantia, entre em contato com nossa equipe informando o número da OS.
        </p>
      </div>

      <!-- Footer -->
      <div style="padding:20px;text-align:center;font-size:12px;color:#888;border-top:1px solid #eee;">
        Este é um e-mail automático do sistema <strong>SIG Manutenção</strong>.
      </div>

    </div>
  </div>
`;

    await transporter.sendMail({
      from: `"SIG Manutenção" <${EMAIL_USER}>`,
      to: destinatario,
      subject: `Garantia registrada - OS #${idOS}`,
      html: htmlBody,
    });

    console.log(`📧 Garantia enviada para ${destinatario}`);
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail de garantia:", error);
  }
};
