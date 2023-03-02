import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled, Button } from "@mui/material";
import { getEventBooking } from "../services/api.js";
import { useParams } from 'react-router';
import { payStaff } from "../services/api.js";

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

const Payment = () => {

    const [event, setEvent] = useState([]);

    const params = useParams()

    useEffect(() => {
        getThisEvent();
    }, []);

    const getThisEvent = async () => {
        let response = await getEventBooking(params.id);
        if (response) {
            setEvent(response.data);
        }
    }

    const payThisStaff = async (eventName, staff) => {
        let response = await payStaff(eventName, staff);
        if (response) {
            response.data.status === "success" ? alert("Paid successfully") : alert("failed");
        }
        getThisEvent();
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
                    <TableCell>Payable</TableCell>
                    <TableCell>Action</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>
                        {event.eventname}
                    </TableCell>
                </TableRow>
                {event.attendance &&
                    event.attendance.map((staffs) => {
                        return (
                            <TableRow key={staffs._id} style={{ backgroundColor: '#e5e5e5' }}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>{staffs.username}</TableCell>
                                <TableCell>{staffs.category}</TableCell>
                                <TableCell>{staffs.phone}</TableCell>
                                <TableCell>{staffs.wage}</TableCell>
                                <TableCell>
                                    {event.payments.some((staff) => staff.username === staffs.username) ?
                                        <Button
                                            variant="contained"
                                            style={{ marginRight: "10px" }}
                                            disabled={true}
                                        >
                                            paid
                                        </Button>
                                        :
                                        <Button
                                            variant="contained"
                                            style={{ marginRight: "10px" }}
                                            onClick={() => payThisStaff(event._id, staffs.username)}
                                        >
                                            pay
                                        </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        </Container>
    );
}

export default Payment;