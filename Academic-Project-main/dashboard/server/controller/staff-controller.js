import Staff from "../schema/staff-schema.js";
import Event from "../schema/event-schema.js";

export const getStaffs = async (req, res) => {
    try {
        const staffs = await Staff.find({ role: { $nin: ["admin"] } }).sort({ category: -1 });
        res.status(200).json(staffs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getStaff = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        res.status(200).json(staff);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const editStaff = async (req, res) => {
    let staff = req.body;
    try {
        const editStaff = {
            name: staff.name,
            username: staff.username,
            dob: staff.dob,
            wage: staff.wage,
            role: staff.role,
            category: staff.category,
            phone: staff.phone,
        };
        await Staff.updateOne({ _id: staff._id }, editStaff);
        res.status(201).send({ "status": "success", "message": "Edited staff successfully" });
    } catch (error) {
        console.log(error);
    }
}

export const deleteStaff = async (req, res) => {
    try {
        await Staff.deleteOne({ _id: req.params.id });
        res.status(200).send({ "status": "success", "message": "Deleted staff successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const cancelBooking = async (req, res) => {
    try {
        await Event.findOneAndUpdate({
            _id: req.body.event,
        }, {
            $pull: {
                bookings: req.body.staff ,
            },
        });
        res.status(201).send({ "status": "success", "message": "Booking cancelled successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const payStaff = async (req, res) => {
    try {
        const event = req.body.data.eventName;
        const staff = await Staff.findOne({ _id: req.body.data.staff }).select('-password');
        await Event.findOneAndUpdate({
            _id: event,
        }, {
            $addToSet: {
                payments: staff._id.toString(),
            },
        });
        res.status(201).send({ "status": "success", "message": "Paid staff successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}