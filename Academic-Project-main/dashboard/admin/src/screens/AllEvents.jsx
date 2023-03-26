import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled } from "@mui/material";
import { getEvents, deleteEvent } from "../services/api.js";
import { DisplayAllEvents } from "../components/DisplayAllEvents.jsx";

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
                        <DisplayAllEvents 
                            key={today._id} 
                            status={today} 
                            sts={'Today'} 
                            clr={'red'} 
                            handleClick={deleteThisEvent} 
                        />
                    );
                })}
                {upcomings.map((upcoming) => {
                    return (
                        <DisplayAllEvents 
                            key={upcoming._id} 
                            status={upcoming} 
                            sts={'Upcoming'} 
                            clr={'blue'} 
                            handleClick={deleteThisEvent} 
                        />
                    );
                })}
                {dones.map((done) => {
                    return (
                        <DisplayAllEvents 
                            key={done._id} 
                            status={done} 
                            sts={'Done'} 
                            clr={'green'} 
                            handleClick={deleteThisEvent} 
                        />
                    );
                })}
            </TableBody>
        </Container>
    );
}

export default AllEvents;