import express from "express";
import { registerAdmin, loginAdmin, checkAuth, addStaff, loginStaff } from "../controller/auth.js";
import { getEvents, addEvent, getEvent, editEvent, getEventBooking, deleteEvent } from "../controller/event-controller.js";
import { getStaffs, getStaff, editStaff, deleteStaff, cancelBooking, payStaff, logoutAdmin } from "../controller/staff-controller.js";
import { getNewEvents, bookEvent, payments, attendance, markAttendance, cancelAttendance } from "../controller/app-controller.js";
import adminAuthorization from "../middlewares/admin-middleware.js";
import staffAuthorization from "../middlewares/staff-middleware.js";

const router = express.Router();

// Public Routes
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/checkauth", checkAuth);
router.post("/staff/login", loginStaff);
router.get("/staff/checkauth", checkAuth);

// Protected Routes
// Events
router.get("/events/getevents", adminAuthorization, getEvents);
router.get("/events/getevent/:id", adminAuthorization, getEvent);
router.put("/events/editevent/:id", adminAuthorization, editEvent);
router.get("/events/geteventbooking/:id", adminAuthorization, getEventBooking);
router.delete("/events/deleteevent/:id", adminAuthorization, deleteEvent);
router.post("/events/addevent", adminAuthorization, addEvent);
// Staffs
router.get("/staffs/getstaffs", adminAuthorization, getStaffs);
router.get("/staffs/getstaff/:id", adminAuthorization, getStaff);
router.put("/staffs/editstaff/:id", adminAuthorization, editStaff);
router.delete("/staffs/deletestaff/:id", adminAuthorization, deleteStaff);
router.post("/staffs/addstaff", adminAuthorization, addStaff);
router.delete("/staffs/cancelbooking", adminAuthorization, cancelBooking);
router.put("/staffs/paystaff/", adminAuthorization, payStaff);
router.get("/admin/logout/", logoutAdmin);
// App
router.get("/staff/currentstaff", staffAuthorization, checkAuth)
router.get("/staff/events/getnewevents", staffAuthorization, getNewEvents);
router.post("/staff/events/bookevent", staffAuthorization, bookEvent);
router.get("/staff/events/payments", staffAuthorization, payments);
router.get("/staff/events/attendance", staffAuthorization, attendance);
router.post("/staff/events/markattendance", staffAuthorization, markAttendance);
router.delete("/staff/events/cancelattendance", staffAuthorization, cancelAttendance)

export default router;