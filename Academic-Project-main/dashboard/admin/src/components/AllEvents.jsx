import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled, Button } from "@mui/material";
import { getEvents, deleteEvent } from "../services/api.js";
import { Link } from "react-router-dom";

const Container = styled(Table)`
    width: 95%;
    margin: 2% auto 0 auto;
    & > div {
        margin-top: 10px;
    }
    background-color: #e5e5e5;
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
        setLoading(false);
        response && setEvents(response.data);
    }

    const deleteEventDetails = async (id) => {
        let response = await deleteEvent(id);
        console.log(response.data);
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
                    <TableCell>
                        Booked/Required Staffs
                    </TableCell>
                    <TableCell>Actions</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {loading ? 
                    <TableRow>
                        <TableCell>Loading...</TableCell>
                    </TableRow>
                :
                events.length ?
                    events.map((event) => {
                        return (
                            <TableRow key={event._id}>
                                <TableCell>{event.date}</TableCell>
                                <TableCell>{event.time}</TableCell>
                                <TableCell>{event.eventname}</TableCell>
                                <TableCell>{event.location}</TableCell>
                                <TableCell>
                                    {event.bookings.length}/{event.reqstaffs}
                                </TableCell>
                                <TableCell>
                                    <Button 
                                    variant="contained" 
                                    style={{ marginRight: "10px" }} 
                                    component={Link} 
                                    to={`/editevent/${event._id}`}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => deleteEventDetails(event._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })
                :
                <TableRow>
                    <TableCell>No data found</TableCell>
                </TableRow> 
                }
            </TableBody>
        </Container>
    );
}

export default AllEvents;