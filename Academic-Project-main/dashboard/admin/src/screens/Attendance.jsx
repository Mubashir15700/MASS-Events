import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled } from "@mui/material";
import { getEvents } from "../services/api.js";
import { DisplayAttendance } from "../components/DisplayAttendance.jsx"

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

const Attendance = () => {

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

            {loading &&
                <TableBody>
                    <TableRow>
                        <TableCell>Loading...</TableCell>
                    </TableRow>
                </TableBody>
            }
            {((todays.length === 0) && (upcomings.length === 0) && (dones.length === 0)) &&
                <TableRow>
                    <TableCell>No data found</TableCell>
                </TableRow>
            }
            {todays.map((today) => {
                return (
                    <DisplayAttendance key={today._id} status={today} />
                );
            })}
            {upcomings.map((upcoming) => {
                return (
                    <DisplayAttendance key={upcoming._id} status={upcoming} />
                );
            })}
            {dones.map((done) => {
                return (
                    <DisplayAttendance key={done._id} status={done} />
                );
            })}
        </Container>
    );
}

export default Attendance;