import express from "express";
import { addStaff, getStaffs, getStaff, editStaff, deleteStaff } from "../controller/staff-controller.js";
import { addEvent, getEvents, getEvent, editEvent, deleteEvent } from "../controller/event-controller.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/addevent", addEvent);
router.get("/editevent/:id", getEvent);
router.put("/events/:id", editEvent);
router.delete("/deleteevent/:id", deleteEvent);

router.post("/addstaff", addStaff);
router.get("/allstaffs", getStaffs);
router.get("/:id", getStaff);
router.put("/staffs/:id", editStaff);
router.delete("/deletestaff/:id", deleteStaff);

export default router;