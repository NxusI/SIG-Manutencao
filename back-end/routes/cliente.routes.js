import express from 'express'
import { registrar } from '../controllers/cliente.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.get('/', registrar)
// router.post('/cadastro', register);
// router.post('/login', login);
// router.patch('/alterar-senha', verificarToken, alterarSenha);
// router.patch('/users/editar-user/:id', verificarToken, editarUsuario);
// router.delete('/users/remover-user/:id', verificarToken, removerUsuario)

export default router;