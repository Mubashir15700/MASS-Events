import axios from "axios";

const URL = "http://192.168.43.77:3001";

export const loginStaff = async (data) => {
    try {
        return await axios.post(`${URL}/login`, data);
    } catch (error) {
        console.log(error);
    }
}

export const getEvents = async () => {
    try {
        return await axios.get(`${URL}/`);
    } catch (error) {
        console.log(error);
    }
}