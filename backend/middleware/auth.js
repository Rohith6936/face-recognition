import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'No authentication token, access denied' });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        if (!verified) {
            return res.status(401).json({ error: 'Token verification failed, authorization denied' });
        }

        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

export default auth;
