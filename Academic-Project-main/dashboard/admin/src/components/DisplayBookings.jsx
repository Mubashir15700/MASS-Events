import { TableBody, TableRow, TableCell, Button } from "@mui/material";

export const DisplayBookings = (props) => {
    return (
        <TableBody key={props.status._id}>
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
                            <TableCell>{booking._id}</TableCell>
                            <TableCell>{booking.username}</TableCell>
                            <TableCell>{booking.category}</TableCell>
                            <TableCell>{booking.phone}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() =>
                                        props.handleClick(props.status.eventname, booking.username)
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
}