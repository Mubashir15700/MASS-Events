import { FormControl, FormGroup, InputLabel, Input, Typography, styled, Button } from '@mui/material';
import { Link } from "react-router-dom";

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% auto 0 auto;
    & > div {
        margin-top: 20px;
    }
`

const handleChange = () => {
    console.log("input changed");
}

const logIn = () => {
    console.log("logging in...");
}

const Login = () => {
    return (
        <Container>
        <Typography variant='h4'>Log In</Typography>
        <FormControl>
            <InputLabel>User ID</InputLabel>
            <Input onChange={(e) => handleChange(e)} name="userid" />
        </FormControl>
        <FormControl>
            <InputLabel>password</InputLabel>
            <Input onChange={(e) => handleChange(e)} name="password" />
        </FormControl>
        <FormControl>
            <Button variant="contained" style={{ marginBottom: "5px"}} onClick={() => logIn()}>Login</Button>
            <Button variant="contained" color="secondary" component={Link} to={"/register"}>Register</Button>
        </FormControl>
    </Container>
    )
}

export default Login;