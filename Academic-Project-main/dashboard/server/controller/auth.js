import Staff from "../schema/staff-schema.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const registerAdmin = async (req, res) => {
    const { name, username, dob, wage, role, category, password, confpassword, phone } = req.body;
    const admin = await Staff.findOne({ role: role });
    if (admin) {
        res.send({ "status": "failed", "message": "Admin already exists" });
    } else {
        if (name && username && dob && wage && role && category && password && confpassword && phone) {
            if (password === confpassword) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    const newAdmin = new Staff({
                        name: name,
                        username: username,
                        dob: dob,
                        wage: wage,
                        role: role,
                        category: category,
                        password: hashPassword,
                        phone: phone,
                    });
                    await newAdmin.save();
                    const savedAdmin = await Staff.findOne({ username: username });
                    // Generate JWT Token
                    const token = jwt.sign({ userID: savedAdmin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                    res.status(201).send({ "status": "success", "message": "Registration Success", "token": token });
                } catch (error) {
                    console.log(error);
                    res.send({ "status": "failed", "message": "Unable to Register" });
                }
            } else {
                res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" });
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" });
        }
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const admin = await Staff.findOne({ username: username });
            if (admin != null) {
                const isMatch = await bcrypt.compare(password, admin.password);
                if ((admin.username === username) && isMatch) {
                    // Generate JWT Token
                    const token = jwt.sign({ userID: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                    res.send({ "status": "success", "message": "Login Success", "token": token });
                } else {
                    res.send({ "status": "failed", "message": "Username or Password is not Valid" });
                }
            } else {
                res.send({ "status": "failed", "message": "You are not a Registered Admin" });
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields are Required" });
        }
    } catch (error) {
        console.log(error)
        res.send({ "status": "failed", "message": "Unable to Login" });
    }
}

export const addStaff = async (req, res) => {
    const { name, username, dob, wage, role, category, password, confpassword, phone } = req.body;
    const staff = await Staff.findOne({ username: username });
    if (staff) {
        res.send({ "status": "failed", "message": "Staff already exists" });
    } else {
        if (name && username && dob && wage && role && category && password && confpassword && phone) {
            if (password === confpassword) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    const newStaff = new Staff({
                        name: name,
                        username: username,
                        dob: dob,
                        wage: wage,
                        role: role,
                        category: category,
                        password: hashPassword,
                        phone: phone,
                    });
                    await newStaff.save();
                    const savedStaff = await Staff.findOne({ username: username });
                    // Generate JWT Token
                    const token = jwt.sign({ userID: savedStaff._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                    res.status(201).send({ "status": "success", "message": "Registration Success", "token": token });
                } catch (error) {
                    res.send({ "status": "failed", "message": "Unable to Register" });
                }
            } else {
                res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" });
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" });
        }
    }
}

// App

export const staffLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const staff = await Staff.findOne({ username: username });
            if (staff != null) {
                const isMatch = await bcrypt.compare(password, staff.password);
                if ((staff.username === username) && isMatch) {
                    // Generate JWT Token
                    const token = jwt.sign({ userID: staff._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                    res.send({ "status": "success", "message": "Login Success", "token": token });
                } else {
                    res.send({ "status": "failed", "message": "Username or Password is not Valid" });
                }
            } else {
                res.send({ "status": "failed", "message": "You are not a Registered Staff" });
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields are Required" });
        }
    } catch (error) {
        console.log(error)
        res.send({ "status": "failed", "message": "Unable to Login" });
    }
}
