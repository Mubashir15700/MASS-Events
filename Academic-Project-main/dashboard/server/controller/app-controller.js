import jwt from 'jsonwebtoken';
import Staff from "../schema/staff-schema.js";
import Event from "../schema/event-schema.js";

export const getCurrentStaff = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const currentStaff = await Staff.findById(decoded.userID).select('-password');
        console.log(currentStaff);
        res.status(201).send({ "status": "success", "message": "Found current staff successfully", "currentStaff": currentStaff});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

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
        res.status(201).send({ "status": "success", "message": "Booked event successfully"});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const markAttendance = async (req, res) => {
    try {
        const datas = await req.body;
        console.log(datas);
        const currentStaff = await Staff.findOne({ username: datas.staff }).select('-password');
        console.log(currentStaff);
        await Event.findOneAndUpdate({
            eventname: datas.event,
        },
            {
                $addToSet: {
                    attendance: currentStaff,
                },
            }
        );
        res.status(201).send({ "status": "success", "message": "Marked attendance successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const cancelAttendance = async (req, res) => {
    try {
        const datas = await req.body;
        console.log(datas);
        const currentStaff = await Staff.findOne({ username: datas.eventName.staff }).select('-password');
        console.log("staff: " + currentStaff);
        await Event.findOneAndUpdate({
            eventname: datas.eventName.event,
        },
            {
                $pull: {
                    attendance: currentStaff,
                },
            }
        );
        res.status(201).send({ "status": "success", "message": "Cancelled attendance successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}