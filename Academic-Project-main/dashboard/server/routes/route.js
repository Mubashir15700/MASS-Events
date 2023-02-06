import express from "express";
import { registerAdmin, loginAdmin, addStaff, loginStaff } from "../controller/auth.js";
import { getEvents, addEvent, getEvent, editEvent, deleteEvent } from "../controller/event-controller.js";
import { getStaffs, getStaff, editStaff, deleteStaff, cancelBooking } from "../controller/staff-controller.js";
import { bookEvent, markAttendance } from "../controller/app-controller.js";
import adminAuthorization from "../middlewares/admin-middleware.js";
import staffAuthorization from "../middlewares/staff-middleware.js";

const router = express.Router();

// Public Routes
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.post("/staff/login", loginStaff);

// Protected Routes
// Events
router.get("/events/getevents", adminAuthorization, getEvents);
router.get("/events/getevent/:id", adminAuthorization, getEvent);
router.put("/events/editevent/:id", adminAuthorization, editEvent);
router.delete("/events/deleteevent/:id", adminAuthorization, deleteEvent);
router.post("/events/addevent", adminAuthorization, addEvent);
// Staffs
router.get("/staffs/getstaffs", adminAuthorization, getStaffs);
router.get("/staffs/getstaff/:id", adminAuthorization, getStaff);
router.put("/staffs/editstaff/:id", adminAuthorization, editStaff);
router.delete("/staffs/deletestaff/:id", adminAuthorization, deleteStaff);
router.post("/staffs/addstaff", adminAuthorization, addStaff);
router.delete("/staffs/cancelbooking", adminAuthorization, cancelBooking);
// App
router.get("/staff/events/getevents", staffAuthorization, getEvents);
router.post("/staff/events/bookevent", staffAuthorization, bookEvent);
router.post("/staff/events/markattendance", staffAuthorization, markAttendance);

export default router;