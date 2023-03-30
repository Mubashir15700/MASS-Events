import { TableRow, TableCell, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const DisplayAllEvents = (props) => {
    return (
        <TableRow>
            <TableCell>
                <p style={{ fontWeight: 'bold' }}>{props.status.date}</p>
                <p style={{ fontWeight: 'bold' }}>{props.status.time}</p>
                <p style={{ color: props.clr, fontSize: 12 }}>{props.sts}</p>
            </TableCell>
            <TableCell>{props.status.duration}</TableCell>
            <TableCell>{props.status.eventname}</TableCell>
            <TableCell>{props.status.location}</TableCell>
            <TableCell style={{ paddingLeft: 80 }}>
                {props.status.bookings.length}/{props.status.reqstaffs}
            </TableCell>
            <TableCell>
                {props.status.bookings.length ?
                    <Button
                        variant="contained"
                        style={{ marginRight: 15, backgroundColor: '#4682b4' }}
                        component={Link}
                        to={`/bookings/${props.status._id}`}
                    >
                        View Bookings
                    </Button>
                    :
                    <Button
                        variant="contained"
                        style={{ marginLeft: "10px", backgroundColor: '#7e8e9e', color: '#e5e5e5' }}
                        disabled={true}
                    >
                        No Bookings
                    </Button>
                }
            </TableCell>
            <TableCell>
                <Button
                    variant="contained"
                    style={{ marginRight: "10px" }}
                    component={Link}
                    to={`/edit_event/${props.status._id}`}
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