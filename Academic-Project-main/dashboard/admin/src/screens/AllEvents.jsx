import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled, Button } from "@mui/material";
import { getEvents, deleteEvent } from "../services/api.js";
import { Link } from "react-router-dom";

const Container = styled(Table)`
    width: 95%;
    margin: 5% auto 0 auto;
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
        response && setEvents(response.data);
        setLoading(false);
    }

    const deleteThisEvent = async (id) => {
        let response = await deleteEvent(id);
        response && alert(response.data.message);
        getAllEvents();
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = yyyy + '-' + mm + '-' + dd;

    return (
        <Container>
            <TableHead>
                <THead>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Duration(hrs)</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>
                        Staffs Booked/Required
                    </TableCell>
                    <TableCell>Status</TableCell>
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
                                <TableCell>{event.duration}</TableCell>
                                <TableCell>{event.eventname}</TableCell>
                                <TableCell>{event.location}</TableCell>
                                <TableCell>
                                    {event.bookings.length}/{event.reqstaffs}
                                </TableCell>
                                <TableCell>
                                    {(formattedToday > event.date) ?
                                        'Done' :   
                                    (formattedToday < event.date) ?
                                        'Upcoming' :
                                        'Today' 
                                    }
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
                                    onClick={() => deleteThisEvent(event._id)}
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