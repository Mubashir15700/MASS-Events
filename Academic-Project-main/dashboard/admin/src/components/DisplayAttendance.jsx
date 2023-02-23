import { TableBody, TableRow, TableCell, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const DisplayAttendance = (props) => {
    return (
        <TableBody key={props.status._id}>
            <TableRow >
                <TableCell style={{ fontWeight: 'bold' }}>
                    <p>{props.status.date}</p>
                    <p>{props.status.time}</p>
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                    {props.status.eventname}
                </TableCell>
            </TableRow>
            {props.status.attendance.length ?
                props.status.attendance.map((attendance) => {
                    return (
                        <TableRow key={attendance._id} style={{ backgroundColor: '#e5e5e5' }}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>{attendance._id}</TableCell>
                            <TableCell>{attendance.username}</TableCell>
                            <TableCell>{attendance.category}</TableCell>
                            <TableCell>{attendance.phone}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={Link} to={"/payments"}
                                >
                                    Payments
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })
                :
                <TableRow style={{ backgroundColor: '#e5e5e5' }}>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>No data found</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            }
        </TableBody>
    );
}