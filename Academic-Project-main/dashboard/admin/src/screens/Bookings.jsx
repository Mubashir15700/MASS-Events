import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled, Button } from "@mui/material";
import { BsCheckSquareFill, BsSquare } from "react-icons/bs";
import { getEventBooking, assignDuty, cancelDuty, cancelBooking } from "../services/api.js";
import { useParams } from 'react-router';
import { Link } from "react-router-dom";

const Container = styled(Table)`
    width: 99%;
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

    const [event, setEvent] = useState([]);
    const [staffs, setStaffs] = useState([]);

    const params = useParams()

    useEffect(() => {
        getThisEvent();
    }, []);

    const getThisEvent = async () => {
        let response = await getEventBooking(params.id);
        if (response) {
            setEvent(response.data.event);
            setStaffs(response.data.bookedStaffs);
        }
    }

    const assignAttendanceDuty = async (event, staff) => {
        await assignDuty(event, staff);
        getThisEvent();
    }

    const cancelAttendanceDuty = async (event, staff) => {
        await cancelDuty(event, staff);
        getThisEvent();
    }

    const cancelThisBooking = async (event, staff) => {
        cancelAttendanceDuty(event, staff);
        let response = await cancelBooking(event, staff);
        if (response.data.status === "success") {
            alert(response.data.message);
            getThisEvent();
        }
    }

    return (
        <Container>
            <TableHead>
                <THead>
                    <TableCell>Date and Time(24hrs)</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Staffs Booked/Required</TableCell>
                    <TableCell>Payments</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Attendance Duty</TableCell>
                    <TableCell>Attendance</TableCell>
                    <TableCell>Actions</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>{event.eventname}</TableCell>
                    {event.bookings && <TableCell style={{ fontWeight: 'bold' }}>{event.bookings.length}/{event.reqstaffs}</TableCell>}
                    <TableCell>
                        {(event.attendance && event.attendance.length) ?
                            <Button
                                variant="contained"
                                style={{ marginRight: "10px", backgroundColor: 'rgb(54, 130, 139)' }}
                                component={Link}
                                to={`/payments/${event._id}`}
                            >
                                View Payments
                            </Button>
                            :
                            <Button
                                variant="contained"
                                style={{ marginRight: "10px" }}
                                disabled={true}
                            >
                                No Attendance
                            </Button>
                        }
                    </TableCell>
                </TableRow>
                    {staffs.map((staff) => {
                        return (
                            <TableRow key={staff._id} style={{ backgroundColor: '#e5e5e5' }}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>{staff.username}</TableCell>
                                <TableCell>{staff.phone}</TableCell>
                                <TableCell>{staff.category}</TableCell>
                                {(staff.category === "Head") ?
                                    <TableCell>
                                        {staff.attendanceduty.some((duty) => duty === event._id) ?
                                            !(event.attendance.some((staffs) => staffs === staff._id)) &&
                                            <BsCheckSquareFill style={{ color: 'rgb(54, 130, 139)', fontSize: 22 }} onClick={() => cancelAttendanceDuty(event._id, staff._id)} />
                                        :
                                            <BsSquare style={{ color: 'rgb(54, 130, 139)', fontSize: 22 }} onClick={() => assignAttendanceDuty(event._id, staff._id)} />
                                        }
                                    </TableCell> : 
                                    <TableCell>
                                        <BsSquare style={{ color: 'gray', fontSize: 22 }} />
                                    </TableCell>
                                }
                                <TableCell style={{ fontSize: 15 }}>
                                    {event.attendance.some((staffs) => staffs === staff._id) ?
                                        <BsCheckSquareFill /> : <BsSquare />
                                    }
                                </TableCell>
                                <TableCell>
                                    {!(event.attendance.some((staffs) => staffs === staff._id)) ?
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() =>
                                                cancelThisBooking(event._id, staff._id)
                                            }
                                        >
                                            Cancel Booking
                                        </Button>
                                        :
                                        <Button
                                            variant="contained"
                                            disabled={true}
                                        >
                                            Cancel Booking
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

export default Bookings;