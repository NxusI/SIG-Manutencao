import express from 'express'
import { registrar, listarClientes, editarCliente, excluirCliente} from '../controllers/cliente.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/cadastro', registrar)
router.get('/', listarClientes)
router.patch('/editar-cliente/:id', editarCliente)
router.delete('/excluir-cliente/:id', excluirCliente)

export default router;