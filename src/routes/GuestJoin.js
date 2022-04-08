import {Input, Button} from '../components/HomePageComponents'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HomePage(){
	return (
		<Box component="form">
			<Input placeholder="Game PIN" />
			<Button>
				<Typography>Enter</Typography>
			</Button>
		</Box>
	)
}
