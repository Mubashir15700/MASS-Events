import mongoose from "mongoose";

const eventsSchema = mongoose.Schema({
    date: {
        required: true,
        type: String,
    },
    time: {
        required: true,
        type: String,
    },
    duration: {
        required: true,
        type: String
    },
    eventname: {
        required: true,
        type: String,
        maxLength: 25,
    },
    location: {
        required: true,
        type: String,
        maxLength: 25,
    },
    reqstaffs: {
        required: true,
        type: Number,
    },
    bookings: [{ type: mongoose.Types.ObjectId, ref: 'staff' }],
    attendance: [{ type: mongoose.Types.ObjectId, ref: 'staff' }],
    payments: [{ type: mongoose.Types.ObjectId, ref: 'staff' }],
});

const event = mongoose.model("event", eventsSchema);

export default event;