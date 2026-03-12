import puppeteer from "puppeteer";

export const gerarPdfOS = async (dadosOS) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const empresa = dadosOS.chamado.cliente.empresa;
  const cliente = dadosOS.chamado.cliente;
  const chamado = dadosOS.chamado;

  const formatCNPJ = (cnpj) => {
    if (!cnpj) return "";
    const v = cnpj.replace(/\D/g, "");
    return v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  const formatTelefone = (telefone) => {
    if (!telefone) return "";
    const v = telefone.replace(/\D/g, "");

    if (v.length === 11) {
      return v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }

    if (v.length === 10) {
      return v.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    }

    return telefone;
  };

  const html = `
  <html>

<head>

<style>

body{
font-family:Arial, Helvetica, sans-serif;
padding:40px;
color:#333;
}

.header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:30px;
border-bottom:2px solid #eee;
padding-bottom:10px;
}

.logo{
font-size:20px;
font-weight:bold;
color:#1f2937;
}

.os-title{
font-size:18px;
font-weight:bold;
}

.section{
margin-top:30px;
}

.section-title{
font-weight:bold;
font-size:14px;
color:#444;
margin-bottom:10px;
border-bottom:1px solid #eee;
padding-bottom:4px;
}

.row{
display:flex;
justify-content:space-between;
margin-top:6px;
}

.label{
font-weight:bold;
}

.box{
border:1px solid #e5e7eb;
border-radius:6px;
padding:10px;
background:#fafafa;
margin-top:6px;
}

table{
width:100%;
border-collapse:collapse;
margin-top:10px;
}

th{
background:#f3f4f6;
text-align:left;
padding:8px;
font-size:13px;
}

td{
padding:8px;
border-top:1px solid #e5e7eb;
font-size:13px;
}

.total{
text-align:right;
margin-top:15px;
font-size:18px;
font-weight:bold;
}

.footer{
margin-top:40px;
font-size:11px;
color:#888;
text-align:center;
}

</style>

</head>

<body>

<div class="header">

<div class="logo">
SIG MANUTENÇÃO
</div>

<div class="os-title">
ORDEM DE SERVIÇO #${dadosOS.idOS}
</div>

</div>


<div class="section">

<div class="section-title">
DADOS DA EMPRESA
</div>

<div class="row">
<div>
<span class="label">Empresa:</span>
${empresa?.nomeFantasia}
</div>

<div>
<span class="label">CNPJ:</span>
${formatCNPJ(empresa?.cnpj)}
</div>
</div>

<div class="row">
<div>
<span class="label">Telefone:</span>
${formatTelefone(empresa?.telefone)}
</div>

<div>
<span class="label">Endereço:</span>
${empresa?.endereco || "-"}
</div>
</div>

</div>


<div class="section">

<div class="section-title">
DADOS DO CLIENTE
</div>

<div class="row">
<div>
<span class="label">Cliente:</span>
${cliente.nome}
</div>

<div>
<span class="label">Telefone:</span>
${formatTelefone(cliente.telefone)}
</div>
</div>

<div class="row">
<div>
<span class="label">Email:</span>
${cliente.email}
</div>
</div>

</div>


<div class="section">

<div class="section-title">
CHAMADO
</div>

<div class="row">
<div>
<span class="label">Data:</span>
${new Date(chamado.dataSolicitacao).toLocaleDateString("pt-BR")}
</div>

<div>
<span class="label">Equipamento:</span>
${chamado.equipamento || "-"}
</div>
</div>

</div>


<div class="section">

<div class="section-title">
DIAGNÓSTICO
</div>

<div class="box">
${dadosOS.obs || "Não informado"}
</div>

</div>


<div class="section">

<div class="section-title">
PRODUTOS UTILIZADOS
</div>

<table>

<thead>
<tr>
<th>Produto</th>
<th>Quantidade</th>
<th>Valor</th>
</tr>
</thead>

<tbody>

${dadosOS.itens
  .map(
    (item) => `
<tr>
<td>${item.produto.descricao}</td>
<td>${item.quantidade}</td>
<td>R$ ${item.produto.preco.toFixed(2)}</td>
</tr>
`,
  )
  .join("")}

</tbody>

</table>

<div class="total">
VALOR TOTAL: R$ ${dadosOS.valor.toFixed(2)}
</div>

</div>


<div class="footer">
Documento gerado automaticamente pelo sistema SIG Manutenção
</div>

</body>

</html>

  `;

  await page.setContent(html);

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return pdf;
};
