import jwt from 'jsonwebtoken';
import Users from '../../Models/Users.js';

const Authorization = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await Users.findById(decoded.user_ID);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: Invalid token." });
        }
        
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token." });
    }
};

export default Authorization;
