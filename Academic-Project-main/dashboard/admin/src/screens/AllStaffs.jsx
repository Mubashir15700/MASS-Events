import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled, Button } from "@mui/material";
import { getStaffs, deleteStaff } from "../services/api.js";
import { Link } from "react-router-dom";

const Container = styled(Table)`
    width: 95%;
    margin: 5% auto 0 auto;
    & > div {
        margin-top: 10px;
    }
    background-color: #e5e5e5;
`

const THead = styled(TableRow)`
    background: #000000;
    & > th {
        color: #fff;
    }
`

const AllStaffs = () => {

    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllStaffs();
    }, []);

    const getAllStaffs = async () => {
        let response = await getStaffs();
        response && setStaffs(response.data);
        setLoading(false);
    }

    const deleteThisStaff = async (id) => {
        let response = await deleteStaff(id);
        response && alert(response.data.message);
        getAllStaffs();
    }

    return (
        <Container>
            <TableHead>
                <THead>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>DOB</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Wage</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Actions</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {loading ? 
                    <TableRow>
                        <TableCell>Loading...</TableCell>
                    </TableRow> 
                :
                staffs.length ?
                    staffs.map((staff) => {
                        return (
                            <TableRow key={staff._id}>
                                <TableCell>{staff.name}</TableCell>
                                <TableCell>{staff.username}</TableCell>
                                <TableCell>{staff.dob}</TableCell>
                                <TableCell>{staff.category}</TableCell>
                                <TableCell>{staff.wage}</TableCell>
                                <TableCell>{staff.phone}</TableCell>
                                <TableCell>
                                    <Button 
                                    variant="contained" 
                                    style={{ marginRight: "10px" }} 
                                    component={Link} 
                                    to={`/editstaff/${staff._id}`}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => deleteThisStaff(staff._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    }) 
                    :
                    <TableRow>
                        <TableCell>No data found</TableCell>
                    </TableRow>
                }
            </TableBody>
        </Container>
    );
}

export default AllStaffs;