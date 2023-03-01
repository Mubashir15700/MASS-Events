import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FormControl, FormGroup, InputLabel, Input, Typography, styled, Button, Select, MenuItem } from '@mui/material';
import { addStaff } from "../services/api";

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% auto 0 auto;
    & > div {
        margin-top: 5px;
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
    password: '',
    confpassword: '',
}

const AddStaff = () => {

    const [staff, setStaff] = useState(defaultValue);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setStaff({ ...staff, [e.target.name]: e.target.value });
    }

    const addNewStaff = async () => {
        let response = await addStaff(staff);
        if (response) {
            response.data.status === "success" ? navigate("/allstaffs") : alert(response.data.message);
        }
    }

    return (
        <Container>
            <FormControl>
                <InputLabel>Name</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="name" />
            </FormControl>
            <FormControl>
                <InputLabel>Username</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="username" />
            </FormControl>
            <FormControl>
                <InputLabel>DOB</InputLabel><br></br><br></br>
                <Input type="date" onChange={(e) => handleChange(e)} name="dob" />
            </FormControl>
            <FormControl>
                <InputLabel>Place</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="place" />
            </FormControl>
            <FormControl>
                <InputLabel>Phone</InputLabel>
                <Input type="number" onChange={(e) => handleChange(e)} name="phone" />
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
                <Input type="number" onChange={(e) => handleChange(e)} name="wage" />
            </FormControl>
            <FormControl>
                <InputLabel>Password</InputLabel>
                <Input type="password" onChange={(e) => handleChange(e)} name="password" />
            </FormControl>
            <FormControl>
                <InputLabel>Confirm Password</InputLabel>
                <Input type="password" onChange={(e) => handleChange(e)} name="confpassword" />
            </FormControl>
            <FormControl>
                <Button variant='contained' onClick={() => addNewStaff()}>Add Staff</Button>
            </FormControl>
        </Container>
    );
}

export default AddStaff;