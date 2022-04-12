import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import {useAuthContext} from '../components/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';

function basename(path){
	return path.slice(path.lastIndexOf('/') + 1)
}

const validPaths = new Set(["library", "reports", "editor"]);
function getTabValue(pathname){
	const value = basename(pathname);
	if(!validPaths.has(value))
		return 'library';
	return value;
}

function Progress(){
	return (
		<Box sx={{pt: 20, display: "flex", justifyContent: "center"}}>
			<CircularProgress size={100}/>
		</Box>
	);
}

export default function UserLayout() {
	const [logingOut, setLogingOut] = useState(false);
	const {pathname} = useLocation();
	const {logout} = useAuthContext();
	const navigate = useNavigate();

	function onTabChange(ev, value){
		navigate(`/user/${value}`);
	}

	async function onLogoutClicked(){
		setLogingOut(true);
		await logout();
		navigate("/");
	}

  return (
		<Box>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" color="transparent">
					<Toolbar>
						<Typography component="div" variant="h4" color="#46178f" mr={2}>
							Baroof!
						</Typography>
						<Box flexGrow={1}>
							<Tabs value={getTabValue(pathname)} onChange={onTabChange}>
								<Tab value="library" label="Library"></Tab>
								<Tab value="reports" label="Reports"></Tab>
								<Tab value="editor" label="Editor"></Tab>
							</Tabs>
						</Box>
						<Button variant="outlined" color="error" disabled={logingOut}
							onClick={onLogoutClicked}
						>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
			</Box>
			<Container>
				{logingOut ? <Progress /> : <Outlet />}
			</Container>
		</Box>
  );
}

