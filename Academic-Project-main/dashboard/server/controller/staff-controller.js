import Staff from "../schema/staff-schema.js";

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
        };
        await Staff.updateOne({ _id: staff._id }, editStaff);
        res.status(201).send({ "status": "success", "message": "Editing Success" });
    } catch (error) {
        console.log(error);
    }
}

export const deleteStaff = async (req, res) => {
    try {
        await Staff.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "deleted staff successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}