import express from "express";
import { registerAdmin, loginAdmin, addStaff, loginStaff } from "../controller/auth.js";
import { getEvents, addEvent, getEvent, editEvent, deleteEvent } from "../controller/event-controller.js";
import {  getStaffs, getStaff, editStaff, deleteStaff } from "../controller/staff-controller.js";
import authorization from "../middlewares/auth-middleware.js";

const router = express.Router();

// Public Routes
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.post("/staff/login", loginStaff);

// Protected Routes
// Events
router.get("/events/getevents", authorization, getEvents);
router.get("/events/getevent/:id", authorization, getEvent);
router.put("/events/editevent/:id", authorization, editEvent);
router.delete("/events/deleteevent/:id", authorization, deleteEvent);
router.post("/events/addevent", authorization, addEvent);
// Staffs
router.get("/staffs/getstaffs", authorization, getStaffs);
router.get("/staffs/getstaff/:id", authorization, getStaff);
router.put("/staffs/editstaff/:id", authorization, editStaff);
router.delete("/staffs/deletestaff/:id", authorization, deleteStaff);
router.post("/staffs/addstaff", authorization, addStaff);

export default router;