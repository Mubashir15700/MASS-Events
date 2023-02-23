import { TableBody, TableRow, TableCell, Button } from "@mui/material";

export const DisplayPayments = (props) => {
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
            {props.status.attendance.length ?
                props.status.attendance.map((payments) => {
                    return (
                        <TableRow key={payments._id} style={{ backgroundColor: '#e5e5e5' }}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>{payments._id}</TableCell>
                            <TableCell>{payments.username}</TableCell>
                            <TableCell>{payments.category}</TableCell>
                            <TableCell>{payments.phone}</TableCell>
                            <TableCell>{payments.wage}</TableCell>
                            <TableCell>
                                {props.status.payments.some((staff) => staff.username === payments.username) ?
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
                                onClick={() => props.handleClick(props.status.eventname, payments.username)}
                                >
                                    pay
                                </Button>
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
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            }
        </TableBody>
    );
}