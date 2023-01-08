import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled, Button } from "@mui/material";
import { getEvents, deleteEvent } from "../services/api.js";
import { Link } from "react-router-dom";

const Container = styled(Table)`
    width: 80%;
    margin: 3% auto 0 auto;
    & > div {
        margin-top: 10px;
    }
`

const THead = styled(TableRow)`
    background: #000000;
    & > th {
        color: #fff;
    }
`

const AllEvents = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllEvents();
    }, []);

    const getAllEvents = async () => {
        let response = await getEvents();
        setEvents(response.data);
        setLoading(false);
    }

    const deleteEventDetails = async (id) => {
        deleteEvent(id);
        getAllEvents();
    }

    return (
        <Container>
            <TableHead>
                <THead>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell></TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {
                    events.length ? 
                        loading ? (<TableRow>Loading...</TableRow>) :
                        events.map((event) => {
                            return (
                                <TableRow key={event._id}>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>{event.time}</TableCell>
                                    <TableCell>{event.eventname}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" style={{ marginRight: "10px" }} component={Link} to={`/editevent/${event._id}`}>Edit</Button>
                                        <Button variant="contained" color="secondary" onClick={() => deleteEventDetails(event._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        }) : 
                    (<TableRow>Nothing to show here</TableRow>)
                }
            </TableBody>
        </Container>
    );
}

export default AllEvents;