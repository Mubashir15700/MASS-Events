import Staff from "../schema/staff-schema.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if(token) {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            const currentStaff = await Staff.findById(decoded.userID).select('-password');
            res.status(201).send({ "status": "success", "message": "Authorized user", "currentStaff": currentStaff});
        } else {
            res.send({ "status": "failed", "message": "Unauthorized user" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

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
                    const token = jwt.sign({ userID: savedAdmin._id, userPWD: savedAdmin.password }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
                    res.status(201).send({ "status": "success", "message": "Registered admin successfully", "token": token });
                } catch (error) {
                    console.log(error);
                    res.send({ "status": "failed", "message": "Unable to register" });
                }
            } else {
                res.send({ "status": "failed", "message": "Password and confirm password doesn't match" });
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" });
        }
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const admin = await Staff.findOne({ username: username });
            if (admin != null) {
                const isMatch = await bcrypt.compare(password, admin.password);
                if ((admin.username === username) && isMatch) {
                    // Generate JWT Token
                    const token = jwt.sign({ userID: admin._id, userPWD: admin.password }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
                    // Save token to cookie
                    res.cookie("jwt", token, {
                        maxAge: 60000 * 60 * 24 * 7,
                        httpOnly: true
                    });
                    res.send({ "status": "success", "message": "Logged in successfully", "token": token });
                } else {
                    res.send({ "status": "failed", "message": "Username or password is not valid" });
                }
            } else {
                res.send({ "status": "failed", "message": "You are not a registered admin" });
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" });
        }
    } catch (error) {
        res.send({ "status": "failed", "message": "Unable to login" });
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
                    const token = jwt.sign({ userID: savedStaff._id, userPWD: savedStaff.password }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
                    res.status(201).send({ "status": "success", "message": "Registered staff successfully", "token": token });
                } catch (error) {
                    res.send({ "status": "failed", "message": "Unable to register" });
                }
            } else {
                res.send({ "status": "failed", "message": "Password and confirm password doesn't match" });
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" });
        }
    }
}

// App
export const loginStaff = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const staff = await Staff.findOne({ username: username });
            if (staff != null) {
                const isMatch = await bcrypt.compare(password, staff.password);
                if ((staff.username === username) && isMatch) {
                    // Generate JWT Token
                    const token = jwt.sign({ userID: staff._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
                    // Save token to cookie
                    res.cookie("jwt", token, {
                        maxAge: 60000 * 60 * 24 * 7,
                        httpOnly: true
                    });
                    res.send({ "status": "success", "message": "Logged in successfully", "token": token });
                } else {
                    res.send({ "status": "failed", "message": "Username or password is not valid" });
                }
            } else {
                res.send({ "status": "failed", "message": "You are not a registered staff" });
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" });
        }
    } catch (error) {
        res.send({ "status": "failed", "message": "Unable to login" });
    }
}