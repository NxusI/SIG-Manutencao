import express from 'express'
import { register } from '../controllers/auth.controller.js';
import { login } from '../controllers/auth.controller.js';
import { alterarSenha } from '../controllers/auth.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/cadastro', verificarToken, register);
router.post('/login', login);
router.patch('/alterar-senha', verificarToken, alterarSenha);

export default router;