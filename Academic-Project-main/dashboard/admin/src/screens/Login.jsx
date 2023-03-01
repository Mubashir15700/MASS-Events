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
        let response = await loginAdmin(admin);
        if (response) {
            response.data.status === "success" ? navigate("/") : alert(response.data.message);
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
            <FormControl style={{ flexDirection: 'row' }}>
                <Button variant="contained" style={{ marginRight: 10, width: 100, }} onClick={() => login()}>
                    Login
                </Button>
                <Button variant="contained" color="secondary" style={{ width: 100, }} component={Link} to={"/register"}>
                    Register
                </Button>
            </FormControl>
        </Container>
    );
}

export default Login;