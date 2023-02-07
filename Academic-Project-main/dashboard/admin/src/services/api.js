import axios from 'axios';

axios.defaults.withCredentials = true;

const URL = 'http://localhost:3001';

// Admin
export const registerAdmin = async (data) => {
    try {
        return await axios.post(`${URL}/admin/register`, data);
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const loginAdmin = async (data) => {
    try {
        return await axios.post(`${URL}/admin/login`, data);
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const checkAuth = async () => {
    try {
        return await axios.get(`${URL}/admin/checkauth`);
    } catch (error) {
        alert(error.response.data.message);
    }
}

// Events
export const getEvents = async () => {
    try {
        return await axios.get(`${URL}/events/getevents`);
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const getEvent = async (id) => {
    try {
        return await axios.get(`${URL}/events/getevent/${id}`);
    } catch (error) {
        console.log(error.response.data);
    }
}

export const editEvent = async (id, event) => {
    try {
        return await axios.put(`${URL}/events/editevent/${id}`, event);
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const deleteEvent = async (id) => {
    try {
        return await axios.delete(`${URL}/events/deleteevent/${id}`);
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const addEvent = async (data) => {
    try {
        return await axios.post(`${URL}/events/addevent`, data);
    } catch (error) {
        alert(error.response.data.message);
    }
}

// Staffs
export const getStaffs = async () => {
    try {
        return await axios.get(`${URL}/staffs/getstaffs`);
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const getStaff = async (id) => {
    try {
        return await axios.get(`${URL}/staffs/getstaff/${id}`);
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const editStaff = async (id, staff) => {
    try {
        return await axios.put(`${URL}/staffs/editstaff/${id}`, staff);
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const deleteStaff = async (id) => {
    try {
        return await axios.delete(`${URL}/staffs/deletestaff/${id}`);
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const addStaff = async (data) => {
    try {
        return await axios.post(`${URL}/staffs/addstaff`, data);
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const cancelBooking = async (eventname, staff) => {
    try {
        return await axios.delete(`${URL}/staffs/cancelbooking/`, { data: { 
            "eventName": eventname, 
            "Staff": staff 
        } });
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const payStaff = async (eventName, staff) => {
    try {
        return await axios.put(`${URL}/staffs/paystaff/`, { data: { 
            "eventName": eventName, 
            "staff": staff
        } });
    } catch (error) {
        alert(error.response.data.message);
    }
}