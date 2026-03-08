export function formatDate(date?: Date): string {
  if (!date) return "";
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${day}/${month}/${year}`;
}

export function formatDateToYMD(date?: Date): string {
  if (!date) return "";
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatCurrency(value?: number | string): string {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatTelefone(value: string | number): string {
  const digits = String(value).replace(/\D/g, "");
  if (digits.length < 10) return digits;
  const ddd = digits.slice(0, 2);
  let restante = digits.slice(2);
  if (restante.length === 8 && !restante.startsWith("9")) {
    restante = "9" + restante;
  }

  const isCelular = restante.length >= 9;
  const parte1 = isCelular ? restante.slice(0, 5) : restante.slice(0, 4);
  const parte2 = isCelular ? restante.slice(5, 9) : restante.slice(4, 8);

  return `(${ddd}) ${parte1}-${parte2}`;
}

export function formatDateString(dateString?: string): string {
  if (!dateString) return "-";

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatCNPJ(cnpj: string) {
  // Remove tudo que não é número
  const digits = cnpj.replace(/\D/g, "");

  // Formata para o padrão
  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
export function formatCEP(cep: string) {
  // Remove tudo que não é número
  const digits = cep.replace(/\D/g, "");

  // Aplica a máscara XXXXX-XXX
  return digits.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");
}

export const parseCurrencyToNumber = (value: string): number => {
  if (!value) return 0;

  return Number(
    value
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^\d.]/g, ""),
  );
};
