import axios from 'axios';

const URL = 'http://localhost:3001';

export const registerAdmin = async (data) => {
    try {
        return await axios.post(`${URL}/admin/register`, data);
    } catch (error) {
        console.log(error);
    }
}

export const loginAdmin = async (data) => {
    try {
        return await axios.post(`${URL}/admin/login`, data);
    } catch (error) {
        console.log(error);
    }
}

export const addStaff = async (data) => {
    try {
        return await axios.post(`${URL}/addstaff`, data);
    } catch (error) {
        console.log(error);
    }
}

export const getStaffs = async () => {
    try {
        return await axios.get(`${URL}/allstaffs`);
    } catch (error) {
        console.log(error);
    }
}

export const getStaff = async (id) => {
    try {
        return await axios.get(`${URL}/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export const editStaff = async (id, staff) => {
    try {
        return await axios.put(`${URL}/staffs/${id}`, staff);
    } catch (error) {
        console.log(error);
    }
}

export const deleteStaff = async (id) => {
    try {
        return await axios.delete(`${URL}/deletestaff/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export const addEvent = async (data) => {
    try {
        return await axios.post(`${URL}/addevent`, data);
    } catch (error) {
        console.log(error);
    }
}

export const getEvents = async () => {
    try {
        return await axios.get(`${URL}/allevents`);
    } catch (error) {
        console.log(error);
    }
}

export const getEvent = async (id) => {
    try {
        return await axios.get(`${URL}/editevent/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export const editEvent = async (id, event) => {
    try {
        return await axios.put(`${URL}/events/${id}`, event);
    } catch (error) {
        console.log(error);
    }
}

export const deleteEvent = async (id) => {
    try {
        return await axios.delete(`${URL}/deleteevent/${id}`);
    } catch (error) {
        console.log(error);
    }
}