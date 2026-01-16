import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando o Seed...');

  await prisma.empresa.upsert({
    where: { idEmpresa: 1 },
    update: {},
    create: {
      nomeFantasia: 'Nexus One',
      cnpj: '00.000.000/0001-00',
      isActive: true
    }
  });

  const statusList = ['Aberto', 'Em Andamento', 'Pendente', 'Concluído', 'Cancelado'];
  for (const nome of statusList) {
    await prisma.status.upsert({
      where: { descricao: nome },
      update: {},
      create: { descricao: nome },
    });
  }

  const senhaSecreta = await bcrypt.hash('123456', 10);

  const admin = await prisma.usuario.upsert({
    where: { login: 'admin' },
    update: {},
    create: {
      nome: 'Super Admin',
      login: 'admin',
      email: 'admin@sistema.com',
      senhaHash: senhaSecreta,
      tipo: 'GESTOR',
      ativo: true,
      idEmpresa: null 
    },
  });

  console.log(`✅ Admin criado sem empresa vinculada!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });