import { TableRow, TableCell, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const DisplayAllEvents = (props) => {
    return (
        <TableRow>
            <TableCell>
                <p style={{ fontWeight: 'bold' }}>{props.status.date}</p>
                <p style={{ color: props.clr }}>{props.sts}</p>
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>{props.status.time}</TableCell>
            <TableCell>{props.status.duration}</TableCell>
            <TableCell>{props.status.eventname}</TableCell>
            <TableCell>{props.status.location}</TableCell>
            <TableCell>
                {props.status.bookings.length}/{props.status.reqstaffs}
                {props.status.bookings.length ?
                    <Button
                        variant="contained"
                        style={{ marginLeft: "10px", backgroundColor: 'rgb(54, 130, 139)' }}
                        component={Link}
                        to={`/booking/${props.status._id}`}
                    >
                        View Bookings
                    </Button>
                    :
                    <Button
                        variant="contained"
                        style={{ marginLeft: "10px" }}
                        disabled={true}
                    >
                        View Bookings
                    </Button>
                }
            </TableCell>
            <TableCell>
                <Button
                    variant="contained"
                    style={{ marginRight: "10px" }}
                    component={Link}
                    to={`/editevent/${props.status._id}`}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => props.handleClick(props.status._id)}
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
}