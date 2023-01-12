import express from "express";
import { registerAdmin, adminLogin, addStaff, staffLogin } from "../controller/auth.js";
import { getEvents, addEvent, getEvent, editEvent, deleteEvent } from "../controller/event-controller.js";
import {  getStaffs, getStaff, editStaff, deleteStaff } from "../controller/staff-controller.js";
import checkUserAuth from '../middlewares/auth-middleware.js';

const router = express.Router();

// Public Routes
router.post("/admin/register", registerAdmin);
router.post("/admin/login", adminLogin);
router.post("/staff/login", staffLogin);

// Protected Routes
// Events
router.get("/", getEvents);
router.post("/addevent", addEvent);
router.get("/editevent/:id", getEvent);
router.put("/events/:id", editEvent);
router.delete("/deleteevent/:id", deleteEvent);
// Staffs
router.post("/addstaff", addStaff);
router.get("/allstaffs", getStaffs);
router.get("/:id", getStaff);
router.put("/staffs/:id", editStaff);
router.delete("/deletestaff/:id", deleteStaff);

export default router;