import axios from "axios";

const URL = "http://192.168.43.77:3001";

export const getEvents = async () => {
    try {
        return await axios.get(`${URL}/`);
    } catch (error) {
        console.log(error);
    }
}