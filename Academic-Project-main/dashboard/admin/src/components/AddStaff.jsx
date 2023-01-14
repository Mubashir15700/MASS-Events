import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FormControl, FormGroup, InputLabel, Input, Typography, styled, Button, Select, MenuItem } from '@mui/material';
import { addStaff } from "../services/api";

const Container = styled(FormGroup)`
    width: 50%;
    margin: 2% auto 0 auto;
    & > div {
        margin-top: 5px;
    }
`

const defaultValue = {
    name: '',
    username: '',
    dob: '',
    wage: '',
    role: 'staff',
    category: '',
    password: '',
    confpassword: '',
    phone: '',
}

const AddStaff = () => {

    const [staff, setStaff] = useState(defaultValue);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setStaff({ ...staff, [e.target.name]: e.target.value });
    }

    const addStaffDetails = async () => {
        let response = await addStaff(staff);
        console.log(response.data);
        navigate("/allstaffs");
    }

    return (
        <Container>
            <Typography variant='h6'>Add Staff</Typography>
            <FormControl>
                <InputLabel>Name</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="name" />
            </FormControl>
            <FormControl>
                <InputLabel>Username</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="username" />
            </FormControl>
            <FormControl>
                <InputLabel>D/B</InputLabel><br></br><br></br>
                <Input type="date" onChange={(e) => handleChange(e)} name="dob" />
            </FormControl>
            <FormControl>
                <InputLabel>Wage</InputLabel>
                <Input type="number" onChange={(e) => handleChange(e)} name="wage" />
            </FormControl>
            <FormControl>
                <InputLabel>Category</InputLabel>
                <Select
                    value={staff.category}
                    label="Category"
                    name="category"
                    onChange={(e) => handleChange(e)}
                >
                    <MenuItem value={"boy"}>Boy</MenuItem>
                    <MenuItem value={"head"}>Head</MenuItem>
                    <MenuItem value={"supervisor"}>Supervisor</MenuItem>
                </Select>
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
                <InputLabel>Phone</InputLabel>
                <Input type="number" onChange={(e) => handleChange(e)} name="phone" />
            </FormControl>
            <FormControl>
                <Button variant='contained' onClick={() => addStaffDetails()}>Add Staff</Button>
            </FormControl>
        </Container>
    );
}

export default AddStaff;