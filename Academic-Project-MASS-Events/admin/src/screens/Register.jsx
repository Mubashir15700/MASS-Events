import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FormControl, FormGroup, InputLabel, Input, Typography, styled, Button } from '@mui/material';
import { registerAdmin } from '../services/api';

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% auto 0 auto;
    & > div {
        margin-top: 8px;
    }
`

const defaultValue = {
    name: '',
    username: '',
    dob: '00/00/0000',
    place: 'qwerty',
    phone: '',
    role: 'admin',
    category: '-',
    wage: '000',
    password: '',
    confpassword: '',
}

const Register = () => {

    const [admin, setAdmin] = useState(defaultValue);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    }

    const register = async () => {
        let response = await registerAdmin(admin);
        if (response) {
            alert(response.data.message);
            if (response.data.status === "success" || response.data.message === "Admin already exists") {
                navigate("/");
            }
        }
    }

    return (
        <Container>
            <Typography variant='h5' style={{ textAlign: 'center', marginBottom: 70 }}>
                MASS Events
            </Typography>
            <Typography variant='h5'>Register</Typography>
            <FormControl>
                <InputLabel>Name:</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="name" />
            </FormControl>
            <FormControl>
                <InputLabel>User Name:</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="username" />
            </FormControl>
            <FormControl>
                <InputLabel>Password:</InputLabel>
                <Input type="password" onChange={(e) => handleChange(e)} name="password" />
            </FormControl>
            <FormControl>
                <InputLabel>Confirm Password:</InputLabel>
                <Input type="password" onChange={(e) => handleChange(e)} name="confpassword" />
            </FormControl>
            <FormControl>
                <InputLabel>Phone:</InputLabel>
                <Input type="number" onChange={(e) => handleChange(e)} name="phone" />
            </FormControl>
            <FormControl>
                <Button variant="contained" style={{ width: 100 }} onClick={() => register()}>Register</Button>
            </FormControl>
        </Container>
    );
}

export default Register;