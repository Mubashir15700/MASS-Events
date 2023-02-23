import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled } from "@mui/material";
import { getEvents, payStaff } from "../services/api.js";
import { DisplayPayments } from "../components/DisplayPayments.jsx";

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

const Payments = () => {

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

    const payThisStaff = async (eventName, staff) => {
        let response = await payStaff(eventName, staff);
        if(response) {
            response.data.status === "success" ? alert("Paid successfully") : alert("failed") ;
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
                    <TableCell>Payable</TableCell>
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
                    <DisplayPayments key={today._id} status={today} handleClick={payThisStaff} />
                );
            })}
            {upcomings.map((upcoming) => {
                return (
                    <DisplayPayments key={upcoming._id} status={upcoming} handleClick={payThisStaff} />
                );
            })}
            {dones.map((done) => {
                return (
                    <DisplayPayments key={done._id} status={done} handleClick={payThisStaff} />
                );
            })}
        </Container>
    );
}

export default Payments;