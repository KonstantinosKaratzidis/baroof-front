import {Input, Button} from '../components/HomePageComponents'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {signup} from '../api/signup';

export default function Signup(){
	const [nickname, setNickname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({})
	const navigate = useNavigate();

	const onChange = (setFunc) => {
		return (ev) => {
			setFunc(ev.target.value)
		}
	}

	const onSumbit = async (ev) => {
		const resp = await signup({nickname, email, password});
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

	return (
		<Box component="form">
			<Typography variant="h4" pt={2}>Signup</Typography>
			<Input
				error={errors.nickname !== undefined}
				helperText={errors.nickname}
				value={nickname}
				onChange={onChange(setNickname)}
				label="Nickname"
			/>
			<Input 
				error={errors.email !== undefined}
				helperText={errors.email}
				value={email}
				onChange={onChange(setEmail)}
				label="E-mail"
			/>
			<Input
				error={errors.password !== undefined}
				helperText={errors.password}
				value={password} 
				onChange={onChange(setPassword)}
				label="Password"
				type="password"
			/>
			<Button onClick={onSumbit}>
				<Typography>Signup</Typography>
			</Button>
		</Box>
	)
}
