import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo-super-secreto';

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 && parts.length !== 1) {
        return res.status(401).json({ mensagem: 'Erro no formato do token.' });
    }
    
    const token = parts.length === 2 ? parts[1] : parts[0];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = {
        idUsuario: decoded.idUsuario,
        tipo: decoded.tipo,
        idEmpresa: decoded.idEmpresa
    };
    
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }
};