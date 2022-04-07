import {Input, Button} from '../components/HomePageComponents'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Login(){
	return (
		<Box component="form">
			<Typography variant="h4" pt={2}>Login</Typography>
			<Input label="E-mail"/>
			<Input label="Password" type="password"/>
			<Button>
				<Typography>Enter</Typography>
			</Button>
		</Box>
	)
}
