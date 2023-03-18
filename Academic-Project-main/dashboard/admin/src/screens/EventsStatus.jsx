import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled } from "@mui/material";
import { getEvents } from "../services/api.js";
import { DisplayEventsStatus } from "../components/DisplayEventsStatus.jsx";

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

const EventsReport = () => {
    
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllEvents();
    }, []);

    const getAllEvents = async () => {
        let response = await getEvents();
        if (response) {
            setEvents(response.data.doneEvents);
        }
        setLoading(false);
    }

    return (
        <Container>
            <TableHead>
                <THead>
                    <TableCell>Date and Time(24hrs)</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Attendance</TableCell>
                    <TableCell>Paid</TableCell>
                </THead>
            </TableHead>
            {loading &&
                <TableBody>
                    <TableRow>
                        <TableCell>Loading...</TableCell>
                    </TableRow>
                </TableBody>
            }
            {(events.length === 0) &&
                <TableBody>
                    <TableRow>
                        <TableCell>No data found</TableCell>
                    </TableRow>
                </TableBody>
            }
            {events.map((event) => {
                return (
                    <DisplayEventsStatus key={event._id} event={event} />
                );
            })}
        </Container>
    );
}

export default EventsReport;