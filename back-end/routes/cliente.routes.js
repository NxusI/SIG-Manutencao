import express from 'express'
import { registrar, listarClientes} from '../controllers/cliente.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.get('/', listarClientes)

router.post('/', registrar)

// router.post('/cadastro', register);
// router.post('/login', login);
// router.patch('/alterar-senha', verificarToken, alterarSenha);
// router.patch('/users/editar-user/:id', verificarToken, editarUsuario);
// router.delete('/users/remover-user/:id', verificarToken, removerUsuario)

export default router;