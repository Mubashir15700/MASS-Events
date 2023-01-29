import jwt from 'jsonwebtoken';
import Staff from "../schema/staff-schema.js";

const staffAuthorization = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.status(401).send({ "status": "failed", "message": "Unauthorized user, no token" });
    } else {
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            const currentUser = await Staff.findById(decoded.userID).select('-password');
            return next();
        } catch {
            res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
        }
    }
}

export default staffAuthorization;