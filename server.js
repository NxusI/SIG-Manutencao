import express from 'express'
//import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';
import osRoutes from './routes/os.routes.js'
import authRoutes from './routes/auth.routes.js'
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
res.send('SIG-Manutencao')
});

app.use('/api/ordens', osRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`server rodando no http://localhost:${PORT}`);
});