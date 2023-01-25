import jwt from 'jsonwebtoken';
import Staff from "../schema/staff-schema.js";

export const bookEvent = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const currentUser = await Staff.findById(decoded.userID).select('-password');
        const datas = await req.body;
        res.status(201).send({ "status": "success", "message": "Booked Event: " + datas.event, "staff": currentUser._id });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}