import {Outlet} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

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
					{children}
				</Paper>
			</Box>
		</Box>
	);
}
