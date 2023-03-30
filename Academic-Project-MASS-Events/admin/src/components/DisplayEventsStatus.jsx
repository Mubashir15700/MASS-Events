import { TableBody, TableRow, TableCell } from "@mui/material";
import { BsCheckSquareFill, BsSquare } from "react-icons/bs";

export const DisplayEventsStatus = (props) => {
    return (
        <TableBody>
            <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>
                    <p>{props.event.date}</p>
                    <p>{props.event.time}</p>
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                    {props.event.eventname}
                </TableCell>
            </TableRow>
            {props.event.bookings.length ?
                props.event.bookings.map((booking) => {
                    return (
                        <TableRow key={booking._id} style={{ backgroundColor: '#e5e5e5' }}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>{booking.username}</TableCell>
                            <TableCell>{booking.category}</TableCell>
                            <TableCell>{booking.phone}</TableCell>
                            <TableCell style={{ fontSize: 15 }}>
                                {props.event.attendance.some((staff) => staff.username === booking.username) ?
                                    <BsCheckSquareFill /> : <BsSquare />
                                }
                            </TableCell>
                            <TableCell style={{ fontSize: 15 }}>
                                {props.event.payments.some((staff) => staff.username === booking.username) ?
                                    <BsCheckSquareFill /> : <BsSquare />
                                }
                            </TableCell>
                        </TableRow>
                    );
                })
                :
                <TableRow style={{ backgroundColor: '#e5e5e5' }}>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>No data found</TableCell>
                </TableRow>
            }{props.event.length !== 0 &&
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>
                        <p>Staffs booked: {props.event.bookings.length}</p>
                        <p>Staffs attended: {props.event.attendance.length}</p>
                        <p>Staffs paid: {props.event.payments.length}</p>
                    </TableCell>
                </TableRow>}
        </TableBody>
    );
}