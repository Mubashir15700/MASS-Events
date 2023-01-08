import { FormControl, FormGroup, InputLabel, Input, Typography, styled, Button } from '@mui/material';

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

const register = () => {
    console.log("logging in...");
}

const Register = () => {
    return (
        <Container>
        <Typography variant='h4'>Register</Typography>
        <FormControl>
            <InputLabel>User ID</InputLabel>
            <Input onChange={(e) => handleChange(e)} name="userid" />
        </FormControl>
        <FormControl>
            <InputLabel>password</InputLabel>
            <Input onChange={(e) => handleChange(e)} name="password" />
        </FormControl>
        <FormControl>
            <Button variant="contained" onClick={() => register()}>Register</Button>
        </FormControl>
    </Container>
    )
}

export default Register;