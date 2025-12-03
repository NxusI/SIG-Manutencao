
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

//adicionar queries manualmente aqui
async function main() {
  // ... you will write your Prisma Client queries here
 await prisma.cliente.create({
    data: {
      name: 'Gabriel',
      email: 'gabriel@prisma.io',
      equipamento: {
        create: { produto: 'Tablet',
        orcamento: 150,
        defeito: 'Tela quebrada'}
      }
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    // 5.
    await prisma.$disconnect()
    process.exit(1)
  })
