import mongoose from "mongoose";

const staffsSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        maxLength: 25,
    },
    username: {
        required: true,
        type: String,
        unique: true,
        maxLength: 25,
    },
    dob: {
        required: true,
        type: String,
    },
    place: {
        required: true,
        type: String,
    },
    phone: {
        required: true,
        type: Number,
        unique: true,
        minLength: 10,
        maxLength: 10,
    },
    role: {
        required: true,
        type: String,
    },
    category: {
        required: true,
        type: String,
    },
    wage: {
        required: true,
        type: Number,
    },
    password: {
        required: true,
        type: String,
        minLength: 4,
    },
});

const staff = mongoose.model("staff", staffsSchema);

export default staff;