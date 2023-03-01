import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled } from "@mui/material";
import { getEvents, cancelBooking } from "../services/api.js";
import { DisplayBookings } from "../components/DisplayBookings.jsx";

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

const Bookings = () => {

    const [todays, setTodays] = useState([]);
    const [upcomings, setUpcomings] = useState([]);
    const [dones, setDones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllEvents();
    }, []);

    const getAllEvents = async () => {
        let response = await getEvents();
        if (response) {
            setTodays(response.data.todaysEvents);
            setUpcomings(response.data.upcomingEvents);
            setDones(response.data.doneEvents);
        }
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
                    <TableCell>User Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Attendance</TableCell>
                </THead>
            </TableHead>

            {loading &&
                <TableBody>
                    <TableRow>
                        <TableCell>Loading...</TableCell>
                    </TableRow>
                </TableBody>
            }
            {((todays.length === 0) && (upcomings.length === 0) && (dones.length === 0)) &&
                <TableBody>
                    <TableRow>
                        <TableCell>No data found</TableCell>
                    </TableRow>
                </TableBody>
            }
            {todays.map((today) => {
                return (
                    <DisplayBookings key={today._id} status={today} handleClick={cancelThisBooking} />
                );
            })}
            {upcomings.map((upcoming) => {
                return (
                    <DisplayBookings key={upcoming._id} status={upcoming} handleClick={cancelThisBooking} />
                );
            })}
            {dones.map((done) => {
                return (
                    <DisplayBookings key={done._id} status={done} handleClick={cancelThisBooking} />
                );
            })}
        </Container>
    );
}

export default Bookings;