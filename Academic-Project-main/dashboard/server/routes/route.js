import express from "express";
import { registerAdmin, loginAdmin, addStaff, loginStaff } from "../controller/auth.js";
import { getEvents, addEvent, getEvent, editEvent, deleteEvent } from "../controller/event-controller.js";
import {  getStaffs, getStaff, editStaff, deleteStaff } from "../controller/staff-controller.js";
import checkUserAuth from '../middlewares/auth-middleware.js';

const router = express.Router();

// Public Routes
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.post("/staff/login", loginStaff);

// Protected Routes
// Events
router.get("/events/getevents",checkUserAuth, getEvents);
router.get("/events/getevent/:id", checkUserAuth, getEvent);
router.put("/events/editevent/:id", checkUserAuth, editEvent);
router.delete("/events/deleteevent/:id", checkUserAuth, deleteEvent);
router.post("/events/addevent", checkUserAuth, addEvent);
// Staffs
router.get("/staffs/getstaffs", checkUserAuth, getStaffs);
router.get("/staffs/getstaff/:id", checkUserAuth, getStaff);
router.put("/staffs/editstaff/:id", checkUserAuth, editStaff);
router.delete("/staffs/deletestaff/:id", checkUserAuth, deleteStaff);
router.post("/staffs/addstaff", checkUserAuth, addStaff);

export default router;