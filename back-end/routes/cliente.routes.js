import express from 'express'
import { registrar, listarClientes, editarCliente, excluirCliente} from '../controllers/cliente.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', listarClientes)
router.post('/cadastro', verificarToken, registrar)
router.patch('/editar-cliente/:id', verificarToken, editarCliente)
router.delete('/excluir-cliente/:id', verificarToken, excluirCliente)

export default router;