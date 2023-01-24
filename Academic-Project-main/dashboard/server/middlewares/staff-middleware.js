import jwt from 'jsonwebtoken';
import Staff from "../schema/staff-schema.js";

const staffAuthorization = async (req, res, next) => {
    const Auth = req.headers;
    const token = Auth.authorization.split(' ')[1];
    if (!token) {
        res.status(401).send({ "status": "failed", "message": "Unauthorized user, no token" });
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        const currentUser = await Staff.findById(decoded.userID).select('-password');
        console.log(currentUser);
        return next();
    } catch {
        res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
    }
}

export default staffAuthorization;