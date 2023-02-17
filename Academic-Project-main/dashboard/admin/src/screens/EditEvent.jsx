import { useState, useEffect } from 'react';
import { FormControl, FormGroup, InputLabel, Input, Typography, styled, Button } from '@mui/material';
import { editEvent, getEvent } from '../services/api';
import { useNavigate, useParams } from "react-router-dom";

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% auto 0 auto;
    & > div {
        margin-top: 8px;
    }
`

const defaultValue = {
    date: '',
    time: '',
    duration: '',
    eventname: '',
    location: '',
    reqstaffs: '',
}

const EditEvent = () => {

    const [event, setEvent] = useState(defaultValue);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        loadEventDetails();
    }, []);

    const loadEventDetails = async () => {
        let response = await getEvent(id);
        response && setEvent(response.data);
    }

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    }

    const editThisEvent = async () => {
        let response = await editEvent(id, event);
        if (response) {
            response.data.status === "success" ? navigate("/") : alert(response.data.message);
        }
    }

    return (
        <Container>
            <Typography variant='h4'>Edit Event</Typography>
            <FormControl>
                <InputLabel>Date</InputLabel><br /><br />
                <Input type="date" onChange={(e) => handleChange(e)} name="date" value={event.date} />
            </FormControl>
            <FormControl>
                <InputLabel>Time</InputLabel><br></br><br></br>
                <Input type="time" onChange={(e) => handleChange(e)} name="time" value={event.time} />
            </FormControl>
            <FormControl>
                <InputLabel>Duration(hrs)</InputLabel><br/><br/>
                <Input type="number" onChange={(e) => handleChange(e)} name="duration" value={event.duration} />
            </FormControl>
            <FormControl>
                <InputLabel>Event Name</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="eventname" value={event.eventname} />
            </FormControl>
            <FormControl>
                <InputLabel>Location</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="location" value={event.location} />
            </FormControl>
            <FormControl>
                <InputLabel>Required Staffs</InputLabel>
                <Input type="number" onChange={(e) => handleChange(e)} name="reqstaffs" value={event.reqstaffs} />
            </FormControl>
            <FormControl>
                <Button variant='contained' onClick={() => editThisEvent()}>Edit Event</Button>
            </FormControl>
        </Container>
    );
}

export default EditEvent;