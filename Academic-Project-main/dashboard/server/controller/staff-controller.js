import Staff from "../schema/staff-schema.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const addStaff = async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        const newStaff = new Staff({
            name: req.body.name,
            username: req.body.username,
            dob: req.body.dob,
            wage: req.body.wage,
            category: req.body.category,
            password: hash,
            phone: req.body.phone,
        });
        newStaff.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.status(201).json(newStaff);
            }
        });
    });
}

export const getStaffs = async (req, res) => {
    try {
        const staffs = await Staff.find({});
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
    const editStaff = new Staff(staff);

    try {
        await Staff.updateOne({ _id: req.params.id }, editStaff);
        res.status(201).json(editStaff);
    } catch (error) {
        res.status(404).json({ message: error.message });
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