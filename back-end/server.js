import express from 'express'
import osRoutes from './routes/os.routes.js'
import authRoutes from './routes/auth.routes.js'
import chamadoRoutes from './routes/chamado.routes.js'
import clienteRoutes from './routes/cliente.routes.js'
import empresaRoutes from './routes/empresa.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('SIG-Manutencao')
});

app.use('/api/os', osRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chamado', chamadoRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(PORT, () => {
    console.log(`server rodando no http://localhost:${PORT}`);
});