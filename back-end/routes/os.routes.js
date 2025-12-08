import express from 'express'
import { getOS } from '../controllers/os.controller.js';
import { criarOrdem } from '../controllers/os.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/', verificarToken, getOS);
router.post('/', verificarToken, criarOrdem);

export default router;