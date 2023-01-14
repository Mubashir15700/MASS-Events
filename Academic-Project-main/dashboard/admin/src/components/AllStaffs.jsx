import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled, Button } from "@mui/material";
import { getStaffs, deleteStaff } from "../services/api.js";
import { Link } from "react-router-dom";

const Container = styled(Table)`
    width: 80%;
    margin: 3% auto 0 auto;
    & > div {
        margin-top: 10px;
    }
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
        setStaffs(response.data);
        setLoading(false);
    }

    const deleteStaffDetails = async (id) => {
        let response = await deleteStaff(id);
        console.log(response.data);
        getAllStaffs();
    }

    return (
        <Container>
            <TableHead>
                <THead>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>D/B</TableCell>
                    <TableCell>Wage</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Actions</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {
                    loading ? (
                        <TableRow>
                            <TableCell>Loading...</TableCell>
                        </TableRow>) :
                    staffs.map((staff) => {
                        return (
                            <TableRow key={staff._id}>
                                <TableCell>{staff._id}</TableCell>
                                <TableCell>{staff.name}</TableCell>
                                <TableCell>{staff.username}</TableCell>
                                <TableCell>{staff.dob}</TableCell>
                                <TableCell>{staff.wage}</TableCell>
                                <TableCell>{staff.category}</TableCell>
                                <TableCell>{staff.phone}</TableCell>
                                <TableCell>
                                    <Button variant="contained" style={{ marginRight: "10px" }} component={Link} to={`/editstaff/${staff._id}`}>Edit</Button>
                                    <Button variant="contained" color="secondary" onClick={() => deleteStaffDetails(staff._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        </Container>
    );
}

export default AllStaffs;