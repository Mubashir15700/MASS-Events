import Staff from "../schema/staff-schema.js";
import Event from "../schema/event-schema.js";

export const getStaffs = async (req, res) => {
    try {
        const staffs = await Staff.find({ role: { $nin: ["admin"] } });
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
        console.log(req.body);
        await Event.findOneAndUpdate({
            eventname: req.body.eventName,
        }, {
            $pull: {
                bookings: { username: req.body.Staff },
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
        await Event.findOneAndUpdate({
            eventname: event,
        }, {
            $addToSet: {
                payments: req.body.data.staff,
            },
        });
        res.status(201).send({ "status": "success", "message": "Paid staff successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const logoutAdmin = async (req, res) => {
    try {
        console.log("here");
        // res.cookie('jwt', {
        //     maxAge: 10000,
        //     httpOnly: true,
        //     overwrite: true,
        // });
        res.clearCookie('jwt',  {domain: 'localhost', path:'/'});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}