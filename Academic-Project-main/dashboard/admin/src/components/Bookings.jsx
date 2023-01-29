import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled, Button } from "@mui/material";
import { getEvents, cancelBooking } from "../services/api.js";

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

const Bookings = () => {

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

    const cancelEventBooking = async (eventname, userid) => {
        let response = await cancelBooking(eventname, userid);
        console.log(response.data);
    }

    return (
        <Container>
            <TableHead>
                <THead>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Staffs</TableCell>
                    <TableCell></TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {
                    loading ? (
                        <TableRow>
                            <TableCell>Loading...</TableCell>
                        </TableRow>) :
                        events.length ?
                            events.map((event) => {
                                return (
                                    <>
                                        <TableRow key={event._id}>
                                            <TableCell>{event.eventname}</TableCell>
                                        </TableRow>
                                        {
                                            event.bookings.map((booking) => {
                                                return (
                                                    <TableRow key={booking._id}>
                                                        <TableCell>
                                                            {booking._id + " "}
                                                            {booking.username + " "}
                                                            {booking.phone}
                                                            <Button variant="contained" color="secondary" onClick={() => cancelEventBooking(event.eventname, booking.userId)}>Cancel</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        }
                                    </>
                                );
                            }
                            ) :
                            (
                                <TableRow>
                                    <TableCell>No data found</TableCell>
                                </TableRow>)
                }
            </TableBody>
        </Container>
    );
}

export default Bookings;