import {Outlet} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';

const StyledLink = ({outlined, to, children, ...props}) => {
	return (
		<Link to={to} style={{textDecoration: "none"}}>
			<Box sx={{
				backgroundColor: outlined ? "transparent" : "white",
				width: "100px",
				textAlign: "center",
				padding: "5px 0",
				borderRadius: "10px",
				border: "2px solid white"
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

export default function HomePageLayout({children, ...props}){
	return (
		<Box sx={{
			outline: "2px solid green",
			display: "flex",
			flexDirection: "column",
			minHeight: "100vh",
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "#46178f"
		}}>
			<Box sx={{maxWidth: 320, textAlign: "center"}}>
				<Typography variant="h2" component="h1" color="white">
					Baroof!
				</Typography>
				<Paper>
					<Outlet />
				</Paper>
			</Box>
			<Box sx={{position: "absolute", top: 10, right: 10}}>
				<Stack direction="row" spacing={1}>
					<StyledLink to="/login">Login</StyledLink>
					<StyledLink to="/signup" outlined>Signup</StyledLink>
				</Stack>
			</Box>
		</Box>
	);
}
