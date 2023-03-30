import { useState, useEffect } from 'react';
import { 
    FormControl, 
    FormGroup, 
    InputLabel, 
    Input, 
    Typography, 
    styled, 
    Button, 
    Select, 
    MenuItem } from '@mui/material';
import { editStaff, getStaff } from '../services/api';
import { useNavigate, useParams } from "react-router-dom";

const Container = styled(FormGroup)`
    width: 50%;
    margin: 7% auto 0 auto;
    & > div {
        margin-top: 8px;
    }
`

const defaultValue = {
    name: '',
    username: '',
    dob: '',
    place: '',
    phone: '',
    role: 'staff',
    category: '',
    wage: '',
}

const EditStaff = () => {

    const [staff, setStaff] = useState(defaultValue);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        loadStaffDetails();
    }, []);

    const loadStaffDetails = async () => {
        let response = await getStaff(id);
        response && setStaff(response.data);
    }

    const handleChange = (e) => {
        setStaff({ ...staff, [e.target.name]: e.target.value });
    }

    const editThisStaff = async () => {
        let response = await editStaff(id, staff);
        if (response) {
            response.data.status === "success" ? navigate("/allstaffs") : alert(response.data.message);
        }
    }

    return (
        <Container>
            <Typography variant='h6' style={{ textAlign: 'center' }}>Edit Staff</Typography>
            <FormControl>
                <InputLabel>Name</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="name" value={staff.name} />
            </FormControl>
            <FormControl>
                <InputLabel>Username</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="username" value={staff.username} />
            </FormControl>
            <FormControl>
                <InputLabel>DOB</InputLabel>
                <Input type="date" onChange={(e) => handleChange(e)} name="dob" value={staff.dob} />
            </FormControl>
            <FormControl>
                <InputLabel>Place</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="place" value={staff.place} />
            </FormControl>
            <FormControl>
                <InputLabel>Phone</InputLabel>
                <Input type="number" onChange={(e) => handleChange(e)} name="phone" value={staff.phone} />
            </FormControl>
            <FormControl>
                <InputLabel>Category</InputLabel>
                <Select
                    value={staff.category}
                    label="Category"
                    name="category"
                    onChange={(e) => handleChange(e)}
                >
                    <MenuItem value={"Boy"}>Boy</MenuItem>
                    <MenuItem value={"Head"}>Head</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Wage</InputLabel>
                <Input type="number" onChange={(e) => handleChange(e)} name="wage" value={staff.wage} />
            </FormControl>
            <FormControl>
                <Button variant='contained' onClick={() => editThisStaff()}>Edit Staff</Button>
            </FormControl>
        </Container>
    );
}

export default EditStaff;