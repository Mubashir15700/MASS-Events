import Event from "../schema/event-schema.js";

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();
if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;
const formattedToday = yyyy + '-' + mm + '-' + dd;

export const getEvents = async (req, res) => {
    try {
        const todaysEvents = await Event.find({ date: formattedToday }).sort({ time: 1 });
        const upcomingEvents = await Event.find({ date: { $gt: formattedToday } } ).sort({ date: 1, time: 1 });
        const doneEvents = await Event.find({ date: { $lt: formattedToday } } ).sort({ date: -1, time: -1 });
        res.status(200).json({"todaysEvents": todaysEvents, "upcomingEvents": upcomingEvents, "doneEvents": doneEvents});
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

export const addEvent = async (req, res) => {
    const event = req.body;
    const newEvent = new Event(event);
    try {
        await newEvent.save();
        res.status(201).send({ "status": "success", "message": "Added new event successfully" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}