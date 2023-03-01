import { TableBody, TableRow, TableCell } from "@mui/material";

export const DisplayBookings = (props) => {
    return (
        <TableBody>
            <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>
                    <p>{props.status.date}</p>
                    <p>{props.status.time}</p>
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                    {props.status.eventname}
                </TableCell>
            </TableRow>
            {props.status.bookings.length ?
                props.status.bookings.map((booking) => {
                    return (
                        <TableRow key={booking._id} style={{ backgroundColor: '#e5e5e5' }}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>{booking.username}</TableCell>
                            <TableCell>{booking.category}</TableCell>
                            <TableCell>{booking.phone}</TableCell>
                            <TableCell style={{ fontSize: 15 }}>
                                {props.status.attendance.some((staff) => staff.username === booking.username) ?
                                    '☑️' : '☐'
                                }
                            </TableCell>
                        </TableRow>
                    );
                })
                :
                <TableRow style={{ backgroundColor: '#e5e5e5' }}>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>No Bookings Yet!</TableCell>
                </TableRow>
            }
        </TableBody>
    );
}