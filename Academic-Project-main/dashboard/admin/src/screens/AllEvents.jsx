import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled, Button } from "@mui/material";
import { getEvents, deleteEvent } from "../services/api.js";
import { Link } from "react-router-dom";

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

const AllEvents = () => {

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

    const deleteThisEvent = async (id) => {
        let response = await deleteEvent(id);
        response && alert(response.data.message);
        getAllEvents();
    }

    return (
        <Container>
            <TableHead>
                <THead>
                    <TableCell>Date</TableCell>
                    <TableCell>Time(24hrs)</TableCell>
                    <TableCell>Duration(hrs)</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>
                        Staffs Booked/Required
                    </TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {loading && 
                    <TableRow>
                        <TableCell>Loading...</TableCell>
                    </TableRow>
                }
                {((todays.length === 0) && (upcomings.length === 0) && (dones.length === 0)) &&
                    <TableRow>
                        <TableCell>No data found</TableCell>
                    </TableRow>
                }
                {todays.map((today) => {
                        return (
                            <TableRow key={today._id}>
                                <TableCell style={{ fontWeight: 'bold' }}>{today.date}</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>{today.time}</TableCell>
                                <TableCell>{today.duration}</TableCell>
                                <TableCell>{today.eventname}</TableCell>
                                <TableCell>{today.location}</TableCell>
                                <TableCell>{today.bookings.length}/{today.reqstaffs}</TableCell>
                                <TableCell style={{ color: 'red' }}>Today</TableCell>
                                <TableCell>
                                    <Button 
                                    variant="contained" 
                                    style={{ marginRight: "10px" }} 
                                    component={Link} 
                                    to={`/editevent/${today._id}`}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => deleteThisEvent(today._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })
                 
                }
                {upcomings.map((upcoming) => {
                        return (
                            <TableRow key={upcoming._id}>
                                <TableCell style={{ fontWeight: 'bold' }}>{upcoming.date}</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>{upcoming.time}</TableCell>
                                <TableCell>{upcoming.duration}</TableCell>
                                <TableCell>{upcoming.eventname}</TableCell>
                                <TableCell>{upcoming.location}</TableCell>
                                <TableCell>{upcoming.bookings.length}/{upcoming.reqstaffs}</TableCell>
                                <TableCell style={{ color: 'blue' }}>Upcoming</TableCell>
                                <TableCell>
                                    <Button 
                                    variant="contained" 
                                    style={{ marginRight: "10px" }} 
                                    component={Link} 
                                    to={`/editevent/${upcoming._id}`}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => deleteThisEvent(upcoming._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })
                
                }
                {dones.map((done) => {
                        return (
                            <TableRow key={done._id}>
                                <TableCell style={{ fontWeight: 'bold' }}>{done.date}</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>{done.time}</TableCell>
                                <TableCell>{done.duration}</TableCell>
                                <TableCell>{done.eventname}</TableCell>
                                <TableCell>{done.location}</TableCell>
                                <TableCell>{done.bookings.length}/{done.reqstaffs}</TableCell>
                                <TableCell style={{ color: 'green' }}>Done</TableCell>
                                <TableCell>
                                    <Button 
                                    variant="contained" 
                                    style={{ marginRight: "10px" }} 
                                    component={Link} 
                                    to={`/editevent/${done._id}`}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => deleteThisEvent(done._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    }) 
                }
            </TableBody>
        </Container>
    );
}

export default AllEvents;