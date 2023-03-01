import jwt from 'jsonwebtoken';
import Staff from "../schema/staff-schema.js";
import Event from "../schema/event-schema.js";

const getCurrentUser = async (jwtToken) => {
    const tokenDecoded = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const currentStaff = await Staff.findById(tokenDecoded.userID).select('-password');
    return currentStaff;
}

const getToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return (yyyy + '-' + mm + '-' + dd);
}

export const getNewEvents = async (req, res) => {
    try {
        const getFormattedToday =  getToday();
        const newEvents = await Event.find({date: { $gte: getFormattedToday } }).sort({ date: 1, time: 1 });
        res.status(200).json(newEvents);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const bookEvent = async (req, res) => {
    try {
        const currentUser = await getCurrentUser(req.cookies.jwt);
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

export const payments = async (req, res) => {
    const currentUser = await getCurrentUser(req.cookies.jwt);
    try {
        const events = await Event.find({
            payments: {
                $all: [
                    {"$elemMatch": {username: currentUser.username}}
                ]
            },
        });

        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const attendance = async (req, res) => {
    try {
        const getFormattedToday =  getToday();
        const events = await Event.find({date: getFormattedToday});
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const markAttendance = async (req, res) => {
    try {
        const datas = await req.body;
        const currentStaff = await Staff.findOne({ username: datas.staff }).select('-password');
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
        const currentStaff = await Staff.findOne({ username: datas.eventName.staff }).select('-password');
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