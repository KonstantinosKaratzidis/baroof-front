import {Input, Button} from '../components/HomePageComponents'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

export default function HomePage(){
	const navigate = useNavigate();
	const [pin, setPin] = useState("");
	const [name, setName] = useState("");
	return (
		<Box>
			<Input placeholder="Game PIN" value={pin}
				onChange={ev => {setPin(ev.target.value)}}
			/>
			<Input placeholder="Nickname" value={name}
				onChange={ev => {setName(ev.target.value)}}
			/>
			<Button onClick={() => {navigate(`/guest/play?pin=${pin}&name=${name}`)} }>
				<Typography>Enter</Typography>
			</Button>
		</Box>
	)
}
