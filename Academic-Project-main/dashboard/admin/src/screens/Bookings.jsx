import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled, Button } from "@mui/material";
import { getEvents, cancelBooking } from "../services/api.js";

const Container = styled(Table)`
    width: 95%;
    margin: 5% auto 0 auto;
    background-color: darkgray;
`

const THead = styled(TableRow)`
    background: #000000;
    & > th {
        color: #fff;
    }
`

const Bookings = () => {

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

    const cancelThisBooking = async (eventname, staff) => {
        let response = await cancelBooking(eventname, staff);
        if (response.data.status === "success") {
            getAllEvents();
            alert(response.data.message);
        }
    }

    return (
        <Container>
            <TableHead>
                <THead>
                    <TableCell>Date and Time</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Staff ID</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Actions</TableCell>
                </THead>
            </TableHead>

            {loading ?
                <TableBody>
                    <TableRow>
                        <TableCell>Loading...</TableCell>
                    </TableRow>
                </TableBody>
                :
                events.length ?
                    events.map((event) => {
                        return (
                            <TableBody key={event._id}>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}><p>{event.date}</p> <p>{event.time}</p></TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>{event.eventname}</TableCell>
                                </TableRow>
                                {event.bookings.length ?
                                    event.bookings.map((booking) => {
                                        return (
                                            <TableRow key={booking._id} style={{ backgroundColor: '#e5e5e5' }}>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>{booking._id}</TableCell>
                                                <TableCell>{booking.username}</TableCell>
                                                <TableCell>{booking.category}</TableCell>
                                                <TableCell>{booking.phone}</TableCell>
                                                <TableCell>
                                                    <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() =>
                                                        cancelThisBooking(event.eventname, booking.username)
                                                    }
                                                    >
                                                        Cancel
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                :
                                <TableRow style={{ backgroundColor: '#e5e5e5' }}>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>No Bookings Yet!</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                }
                            </TableBody>
                        );
                    })
                :
                <TableBody>
                    <TableRow>
                        <TableCell>No data found</TableCell>
                    </TableRow>
                </TableBody>
            }
        </Container>
    );
}

export default Bookings;