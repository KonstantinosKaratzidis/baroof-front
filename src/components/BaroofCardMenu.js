import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Crop169Icon from '@mui/icons-material/Crop169';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

export default function BaroofMenu({baroofId}){
	const [menuAnchor, setMenuAnchor] = useState(null);
	const navigate = useNavigate();
	const openMenu = Boolean(menuAnchor);

	function onMoreActionsClicked(ev){
		setMenuAnchor(ev.target);
	}

	function onEdit(){
		navigate(`/user/editor/${baroofId}`);
	}

	function onDelete(){
	}

	function onRename(){
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
			<MenuItem onClick={onEdit}>
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
