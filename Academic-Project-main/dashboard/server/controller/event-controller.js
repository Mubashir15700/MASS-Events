import Event from "../schema/event-schema.js";
import Staff from "../schema/staff-schema.js";

const getToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return (yyyy + '-' + mm + '-' + dd);
}

export const getEvents = async (req, res) => {
    try {
        const getFormattedToday = getToday();
        const todaysEvents = await Event.find({ date: getFormattedToday }).sort({ time: 1 });
        const upcomingEvents = await Event.find({ 
            date: { $gt: getFormattedToday } 
        } ).sort({ date: 1, time: 1 });
        const doneEvents = await Event.find({
             date: { $lt: getFormattedToday } 
        } ).sort({ date: -1, time: -1 });
        res.status(200).json({
            "todaysEvents": todaysEvents, "upcomingEvents": upcomingEvents, "doneEvents": doneEvents
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addEvent = async (req, res) => {
    const event = req.body;
    if(event.date && event.time && event.duration && event.location && event.reqstaffs) {
        const newEvent = new Event(event);
        try {
            await newEvent.save();
            res.status(201).send({ "status": "success", "message": "Added new event successfully" });
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    } else {
        res.send({ "status": "failed", "message": "All fields are required" });
    }
}

export const getEventBooking = async (req, res) => {
    try {
        const event = await Event.findOne( { _id: req.params.id });
        const bookedStaffsIds = [];
        event.bookings.map((booking) => {
            bookedStaffsIds.push(booking);
        });
        const bookedStaffs = await Staff.find({ _id: { $in: bookedStaffsIds } }).select('-password');
        res.status(200).json({ "event": event, "bookedStaffs": bookedStaffs });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getEventAttendance = async (req, res) => {
    try {
        const event = await Event.findOne( { _id: req.params.id });
        const attendedStaffsIds = [];
        event.attendance.map((booking) => {
            attendedStaffsIds.push(booking);
        });
        const attendedStaffs = await Staff.find({ _id: { $in: attendedStaffsIds } }).select('-password');
        res.status(200).json({ "event": event, "attendedStaffs": attendedStaffs });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const editEvent = async (req, res) => {
    let event = req.body;
    const editEvent = new Event(event);
    try {
        await Event.updateOne({ _id: req.params.id }, editEvent);
        res.status(201).send({ "status": "success", "message": "Edited event successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteEvent = async (req, res) => {
    try {
        await Event.deleteOne({ _id: req.params.id });
        res.status(200).send({ "status": "success", "message": "Deleted event successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDoneEvents = async (req, res) => {
    try {
        const getFormattedToday = getToday();
        const doneEvents = await Event.find({ 
            date: { $lt: getFormattedToday } 
        }).populate('bookings').populate('attendance').populate('payments').sort({ date: -1, time: -1 });
        res.status(200).json(doneEvents);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}