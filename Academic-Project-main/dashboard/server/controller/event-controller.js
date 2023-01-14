import Event from "../schema/event-schema.js";

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
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
        res.status(201).json(editEvent);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteEvent = async (req, res) => {
    try {
        await Event.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "deleted event successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addEvent = async (req, res) => {
    const event = req.body;
    const newEvent = new Event(event);
    try {
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}