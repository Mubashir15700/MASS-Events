import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const URL = "http://192.168.43.77:3001";

export const loginStaff = async (username, password) => {
    try {
        return await axios.post(`${URL}/staff/login`, {username, password});
    } catch (error) {
        console.log(error);
    }
}

export const getEvents = async () => {
    try {
        const token = await AsyncStorage.getItem("jwt");
        console.log(token);
        return await axios.get(`${URL}/staff/events/getevents`, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
    } catch (error) {
        console.log(error);
    }
}