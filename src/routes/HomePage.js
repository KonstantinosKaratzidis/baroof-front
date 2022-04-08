import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';

const StyledLink = ({outlined, to, children, ...props}) => {
	return (
		<Link to={to} style={{textDecoration: "none"}}>
			<Box sx={{
				backgroundColor: "transparent",
				width: "120px",
				textAlign: "center",
				padding: "5px 0",
				borderRadius: "10px",
				border: "2px solid black",
			}}>
				<Typography component="span" variant="h6" sx={{
					color: outlined ? "white" : "black",
					fontWeight: "bold",
				}}>
					{children}
				</Typography>
			</Box>
		</Link>
	)
}

export default function HomePage(){
	return (
		<Box sx={{padding: "2em 0.5em"}}>
			<Typography variant="h4" mb={2}>Choose your role!</Typography>
			<Stack direction="row" justifyContent="space-around">
				<StyledLink to="/guest">Guest</StyledLink>
				<StyledLink to="/user/login">Teacher</StyledLink>
			</Stack>
		</Box>
	)
}
