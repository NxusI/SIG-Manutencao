import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const statusList = ['Aberto', 'Em Andamento', 'Pendente', 'Finalizado', 'Cancelado'];

  console.log('Semeando Status...');
  
  for (const descricao of statusList) {
    await prisma.statusOrdem.upsert({
      where: { descricao },
      update: {},
      create: { descricao },
    });
  }
  console.log(' Status criados!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());