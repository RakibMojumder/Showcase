import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    const authHeader = req.headers.Authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'unauthorized access' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden access' })
        }

        req.user = user;
        next();
    })
};

