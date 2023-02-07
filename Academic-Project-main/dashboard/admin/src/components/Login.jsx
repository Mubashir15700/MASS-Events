import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FormControl, FormGroup, InputLabel, Input, Typography, styled, Button } from '@mui/material';
import { Link } from "react-router-dom";
import { loginAdmin } from '../services/api';

const Container = styled(FormGroup)`
    width: 50%;
    margin: 8% auto 0 auto;
    & > div {
        margin-top: 20px;
    }
`

const defaultValue = {
    username: '',
    password: '',
}

const Login = () => {

    const [admin, setAdmin] = useState(defaultValue);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    }
    
    const login = async () => {
        const response = await loginAdmin(admin);
        alert(response.data.message);
        if(response.data.status === "success") {
            console.log("token: " + response.data.token);
            navigate("/");
        }
    }

    return (
        <Container>
            <Typography variant='h5'>Log In</Typography>
            <FormControl>
                <InputLabel>User Name:</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="username" />
            </FormControl>
            <FormControl>
                <InputLabel>password:</InputLabel>
                <Input type="password" onChange={(e) => handleChange(e)} name="password" />
            </FormControl>
            <FormControl>
                <Button variant="contained" style={{ marginBottom: "5px"}} onClick={() => login()}>Login</Button>
                <Button variant="contained" color="secondary" component={Link} to={"/register"}>Register</Button>
            </FormControl>
        </Container>
    );
}

export default Login;