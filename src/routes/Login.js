import {Input, Button} from '../components/HomePageComponents'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import {login} from '../api/login';
import {useNavigate, Link, Navigate} from 'react-router-dom';
import {useAuthContext} from '../components/AuthProvider';

export default function Login(){
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const {isLoggedIn} = useAuthContext();
	const navigate = useNavigate();

	const onChange = (changeFunc) => {
		return (ev) => {
			changeFunc(ev.target.value)
		}
	}

	const onSumbit = async () => {
		const resp = await login({email, password});
		console.log(resp)
		if(!resp.success){
			if(resp.errors){
				setErrors(resp.errors.reduce((acc, error) => {
					return {...acc, [error.param]: error.msg}
				}, {}))
			}
		} else {
			navigate("/user");
			setErrors({})
		}
	}

	if(isLoggedIn){
		return <Navigate to="/user" />
	}
	
	return (
		<Box component="form">
			<Typography variant="h4" pt={2}>Login</Typography>
			<Input 
				error={errors.email !== undefined}
				helperText={errors.email}
				label="E-mail"
				value={email}
				onChange={onChange(setEmail)}
			/>
			<Input
				error={errors.password !== undefined}
				helperText={errors.password}
				label="Password"
				type="password"
				value={password}
				onChange={onChange(setPassword)}
			/>
			<Button onClick={onSumbit}>
				<Typography>Enter</Typography>
			</Button>
			<Typography>
				Don't have an account? <Link to="/user/signup">Signup</Link>
			</Typography>
		</Box>
	)
}
