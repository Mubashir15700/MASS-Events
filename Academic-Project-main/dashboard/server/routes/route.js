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
router.get("/", checkUserAuth, getEvents);
router.post("/addevent", checkUserAuth, addEvent);
router.get("/editevent/:id", checkUserAuth, getEvent);
router.put("/events/:id",checkUserAuth, editEvent);
router.delete("/deleteevent/:id", checkUserAuth, deleteEvent);
// Staffs
router.post("/addstaff", checkUserAuth, addStaff);
router.get("/allstaffs", checkUserAuth, getStaffs);
router.get("/:id", checkUserAuth, getStaff);
router.put("/staffs/:id", checkUserAuth, editStaff);
router.delete("/deletestaff/:id", checkUserAuth, deleteStaff);

export default router;