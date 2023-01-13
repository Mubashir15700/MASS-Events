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
        const response = await axios.post(`${URL}/admin/login`, data);
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        console.log(error);
    }
}

const token = localStorage.getItem('token');
const myHeader = {
    headers: { authorization: "Bearer " + token },
};

export const addStaff = async (data) => {
    try {
        return await axios.post(`${URL}/addstaff`, myHeader, data);
    } catch (error) {
        console.log(error);
    }
}

export const getStaffs = async () => {
    try {
        return await axios.get(`${URL}/allstaffs`, myHeader);
    } catch (error) {
        console.log(error);
    }
}

export const getStaff = async (id) => {
    try {
        return await axios.get(`${URL}/${id}`, myHeader);
    } catch (error) {
        console.log(error);
    }
}

export const editStaff = async (id, staff) => {
    try {
        return await axios.put(`${URL}/staffs/${id}`, myHeader, staff);
    } catch (error) {
        console.log(error);
    }
}

export const deleteStaff = async (id) => {
    try {
        return await axios.delete(`${URL}/deletestaff/${id}`, myHeader);
    } catch (error) {
        console.log(error);
    }
}

export const addEvent = async (data) => {
    try {
        return await axios.post(`${URL}/addevent`, myHeader, data);
    } catch (error) {
        console.log(error);
    }
}

export const getEvents = async () => {
    try {
        return await axios.get(`${URL}/`, myHeader);
    } catch (error) {
        console.log(error);
    }
}

export const getEvent = async (id) => {
    try {
        return await axios.get(`${URL}/editevent/${id}`, myHeader);
    } catch (error) {
        console.log(error);
    }
}

export const editEvent = async (id, event) => {
    try {
        return await axios.put(`${URL}/events/${id}`, myHeader, event);
    } catch (error) {
        console.log(error);
    }
}

export const deleteEvent = async (id) => {
    try {
        return await axios.delete(`${URL}/deleteevent/${id}`, myHeader);
    } catch (error) {
        console.log(error);
    }
}