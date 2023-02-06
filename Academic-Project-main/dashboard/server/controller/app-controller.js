import jwt from 'jsonwebtoken';
import Staff from "../schema/staff-schema.js";
import Event from "../schema/event-schema.js";

export const bookEvent = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const currentUser = await Staff.findById(decoded.userID).select('-password');
        console.log(currentUser);

        const datas = await req.body;
        await Event.findOneAndUpdate({
            eventname: datas.event,
        },
            {
                $addToSet: {
                    bookings: currentUser,
                },
            }
        );
        res.status(201).send({ "status": "success", "message": "Booked event successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const markAttendance = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const currentUser = await Staff.findById(decoded.userID).select('-password');
        console.log(currentUser);

        const datas = await req.body;
        await Event.findOneAndUpdate({
            eventname: datas.event,
        },
            {
                $addToSet: {
                    attendance: currentUser,
                },
            }
        );
        res.status(201).send({ "status": "success", "message": "Marked attendance successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}