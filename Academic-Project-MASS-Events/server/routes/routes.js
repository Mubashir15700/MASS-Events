import express from "express";
import { 
    registerAdmin, 
    loginAdmin, 
    checkAuth, 
    logout, 
    addStaff, 
    loginStaff } from "../controller/auth.js";
import { 
    getEvents, 
    addEvent, 
    getEventBooking, 
    getEventAttendance, 
    getEvent, 
    editEvent, 
    deleteEvent, 
    getDoneEvents } from "../controller/event-controller.js";
import { 
    getStaffs, 
    getStaff, 
    editStaff, 
    deleteStaff, 
    assignDuty, 
    cancelDuty, 
    cancelBooking, 
    payStaff } from "../controller/staff-controller.js";
import { 
    getNewEvents, 
    bookEvent, 
    getBookings, 
    markAttendance, 
    cancelAttendance, 
    getEventsStatus, 
    getPayments } from "../controller/app-controller.js";
// Middlewares
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
// Admin
// Events
router.get("/events/getevents", adminAuthorization, getEvents);
router.post("/events/addevent", adminAuthorization, addEvent);
router.get("/events/geteventbooking/:id", adminAuthorization, getEventBooking);
router.get("/events/geteventattendance/:id", adminAuthorization, getEventAttendance);
router.get("/events/getevent/:id", adminAuthorization, getEvent);
router.put("/events/editevent/:id", adminAuthorization, editEvent);
router.delete("/events/deleteevent/:id", adminAuthorization, deleteEvent);
router.get("/events/getdoneevents", adminAuthorization, getDoneEvents);
// Staffs
router.post("/staffs/addstaff", adminAuthorization, addStaff);
router.get("/staffs/getstaffs", adminAuthorization, getStaffs);
router.get("/staffs/getstaff/:id", adminAuthorization, getStaff);
router.put("/staffs/editstaff/:id", adminAuthorization, editStaff);
router.delete("/staffs/deletestaff/:id", adminAuthorization, deleteStaff);
router.put("/staffs/assignduty", adminAuthorization, assignDuty);
router.delete("/staffs/cancelduty", adminAuthorization, cancelDuty);
router.delete("/staffs/cancelbooking", adminAuthorization, cancelBooking);
router.put("/staffs/paystaff/", adminAuthorization, payStaff);
// Logout
router.get("/admin/logout/", logout);

// App
router.get("/staff/currentstaff", staffAuthorization, checkAuth)
router.get("/staff/events/getnewevents", staffAuthorization, getNewEvents);
router.post("/staff/events/bookevent", staffAuthorization, bookEvent);
router.get("/staff/events/bookings", staffAuthorization, getBookings);
router.post("/staff/events/markattendance", staffAuthorization, markAttendance);
router.delete("/staff/events/cancelattendance", staffAuthorization, cancelAttendance);
router.get("/staff/events/eventsstatus", staffAuthorization, getEventsStatus);
router.get("/staff/events/getpayments", staffAuthorization, getPayments);
router.get("/staff/logout/", logout);

export default router;