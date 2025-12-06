import express from 'express'
import { register, removerUsuario, login, alterarSenha, editarUsuario, listarUsuarios } from '../controllers/auth.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.get('/users', verificarToken, listarUsuarios)
router.post('/cadastro', register);
router.post('/login', login);
router.patch('/alterar-senha', verificarToken, alterarSenha);
router.patch('/users/editar-user/:id', verificarToken, editarUsuario);
router.delete('/users/remover-user/:id', verificarToken, removerUsuario)

export default router;