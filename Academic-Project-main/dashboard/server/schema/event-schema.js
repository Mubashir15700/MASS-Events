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
    bookings: [{
        userId: String
    }],
});

const event = mongoose.model("event", eventsSchema);

export default event;