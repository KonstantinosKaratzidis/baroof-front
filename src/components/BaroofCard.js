import Card from '@mui/material/Card';
import CardContent from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Crop169Icon from '@mui/icons-material/Crop169';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import format from 'date-format';
import {Link} from 'react-router-dom';
import {useState} from 'react';

function BaroofMenu({baroofId}){
	const [menuAnchor, setMenuAnchor] = useState(null);
	const openMenu = Boolean(menuAnchor);

	function onMoreActionsClicked(ev){
		setMenuAnchor(ev.target);
	}


	return (
		<>
		<IconButton component="span" onClick={onMoreActionsClicked}>
			<MoreVertIcon />
		</IconButton>
		<Menu 
			open={openMenu}
			anchorEl={menuAnchor}
			onClose={() => {setMenuAnchor(null)}}
		  anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
		>
			<MenuItem>
				<ListItemIcon>
					<EditIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>Edit</ListItemText>
			</MenuItem>
			<MenuItem>
				<ListItemIcon>
					<Crop169Icon fontSize="small" />
				</ListItemIcon>
				<ListItemText>Rename</ListItemText>
			</MenuItem>
			<MenuItem>
				<ListItemIcon>
					<DeleteIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>Delete</ListItemText>
			</MenuItem>
		</Menu>
		</>
	);
}

export default function BaroofCard({baroof}){
	const dateUpdated = format("dd/MM/yy hh:mm", new Date(baroof.updatedAt));

	// function onChange(ev, value){
	// 	console.log(value)
	// }

	function onFavoriteChange(ev, value){
	}

	return (
		<Card>
			<CardActionArea disableRipple>
				<CardContent>
					<Box sx={{width: "90%", margin: "1em auto"}}>
						<Stack direction="row">
							<Typography component="span" variant="h5" sx={{
								fontWeight: "bold",
								flexGrow: 1,
								display: "flex",
								flexDirection: "row",
								alignItems: "center"
							}}>
								{baroof.title}
							</Typography>
							<CardActions disableSpacing pt={0} mt={0}>
								<Rating max={1} value={baroof.isFavorite ? 1 : 0} onChange={onFavoriteChange}>
								</Rating>
								<BaroofMenu baroofId={baroof._id}/>
							</CardActions>
						</Stack>
						<Stack direction="row" sx={{backgroundColor: "#ddd", padding: "5px 3px"}}
							spacing={1} alignItems="center"
						>
							<Typography sx={{fontWeight: "bold", textAlign: "center"}}>
								0 plays
							</Typography>
							<Typography sx={{color: "#666", textAlign: "center"}}>
								Updated at {dateUpdated}
							</Typography>
							<Box component="div" flexGrow={1}>
							</Box>
							<Link to={`/user/editor/${baroof._id}`}>
								<Button variant="contained" component="div">
									<Typography fontWeight="bold">
										Edit
									</Typography>
								</Button>
							</Link>
							<Link to={`/user/host/${baroof._id}`}>
								<Button variant="contained" component="div" color="success">
									<Typography fontWeight="bold">
										Play
									</Typography>
								</Button>
							</Link>
						</Stack>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
