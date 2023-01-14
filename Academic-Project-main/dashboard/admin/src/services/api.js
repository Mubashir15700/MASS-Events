import axios from 'axios';

const URL = 'http://localhost:3001';

// Admin
export const registerAdmin = async (data) => {
    try {
        return await axios.post(`${URL}/admin/register`, data);
    } catch (error) {
        console.log(error);
    }
}

export const loginAdmin = async (data) => {
    try {
        const response = await axios.post(`${URL}/admin/login`, data);
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        console.log(error);
    }
}

const token = localStorage.getItem('token');
const myHeader = { authorization: "Bearer " + token };

// Events
export const getEvents = async () => {
    try {
        return await axios.get(`${URL}/events/getevents`, {
            headers: myHeader
        });
    } catch (error) {
        console.log(error);
    }
}

export const getEvent = async (id) => {
    try {
        return await axios.get(`${URL}/events/getevent/${id}`, {
            headers: myHeader
        });
    } catch (error) {
        console.log(error);
    }
}

export const editEvent = async (id, event) => {
    try {
        return await axios.put(`${URL}/events/editevent/${id}`, {
            headers: myHeader
        }, event);
    } catch (error) {
        console.log(error);
    }
}

export const deleteEvent = async (id) => {
    try {
        return await axios.delete(`${URL}/events/deleteevent/${id}`, {
            headers: myHeader
        });
    } catch (error) {
        console.log(error);
    }
}

export const addEvent = async (data) => {
    try {
        return await axios.post(`${URL}/events/addevent`, {
            headers: myHeader
        }, data);
    } catch (error) {
        console.log(error);
    }
}

// Staffs
export const getStaffs = async () => {
    try {
        return await axios.get(`${URL}/staffs/getstaffs`, {
            headers: myHeader
        });
    } catch (error) {
        console.log(error);
    }
}

export const getStaff = async (id) => {
    try {
        return await axios.get(`${URL}/staffs/getstaff/${id}`, {
            headers: myHeader
        });
    } catch (error) {
        console.log(error);
    }
}

export const editStaff = async (id, staff) => {
    try {
        return await axios.put(`${URL}/staffs/editstaff/${id}`, {
            headers: myHeader
        }, staff);
    } catch (error) {
        console.log(error);
    }
}

export const deleteStaff = async (id) => {
    try {
        return await axios.delete(`${URL}/staffs/deletestaff/${id}`, {
            headers: myHeader
        });
    } catch (error) {
        console.log(error);
    }
}

export const addStaff = async (data) => {
    try {
        return await axios.post(`${URL}/staffs/addstaff`, {
            headers: myHeader
        }, data);
    } catch (error) {
        console.log(error);
    }
}