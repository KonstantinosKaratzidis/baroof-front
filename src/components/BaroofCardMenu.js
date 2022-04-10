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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LimitedTextField from './LimitedTextField';
import {useLibraryContext} from '../hooks/useLibraryContent';

function DeleteDialog({onClose, baroof, ...props}){
	const {delBaroof} = useLibraryContext();
	return (
		<Dialog {...props}>
			<DialogTitle>
				<Typography component="p" variant="h4">Delete Kahoot</Typography>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete "{baroof.title}"?
					This action can't be undone.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button size="large" variant="outlined"
					color="success" onClick={onClose}
				>
					Cancel
				</Button>
				<Button size="large" variant="contained" color="error"
					onClick={() => delBaroof(baroof)}
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	)
}

function RenameDialog({onClose, baroof, ...props}){
	const [title, setTitle] = useState(baroof.title);

	return (
		<Dialog {...props}>
			<DialogTitle>
				<Typography component="p" variant="h4">
					Rename "{baroof.title}"
				</Typography>
			</DialogTitle>
			<LimitedTextField limit={95} size="small"
				value={title} onChange={(ev) => {setTitle(ev.target.value)}}
			/>
			<DialogContent>
			</DialogContent>
			<DialogActions>
				<Button size="large" variant="outlined"
					color="success" onClick={onClose}
				>
					Cancel
				</Button>
				<Button size="large" variant="contained" color="error"
					disabled={title.length === 0}
				>
					Rename
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default function BaroofMenu({baroof}){
	const [menuAnchor, setMenuAnchor] = useState(null);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openRenameDialog, setOpenRenameDialog] = useState(false);
	const navigate = useNavigate();
	const openMenu = Boolean(menuAnchor);

	function onMoreActionsClicked(ev){
		setMenuAnchor(ev.target);
	}

	function onEdit(){
		navigate(`/user/editor/${baroof._id}`);
	}

	function onDelete(){
		setOpenDeleteDialog(true);
	}

	function onRename(){
		setOpenRenameDialog(true);
	}

	return (
		<>
		{
			openDeleteDialog ? 
			<DeleteDialog
				baroof={baroof}
				open={openDeleteDialog}
				onClose={() => setOpenDeleteDialog(false)}
			/> : null
		}
		{
			openRenameDialog ? 
			<RenameDialog
				baroof={baroof}
				open={openRenameDialog}
				onClose={() => setOpenRenameDialog(false)}
			/> : null
		}
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
			<MenuItem onClick={onRename}>
				<ListItemIcon>
					<Crop169Icon fontSize="small" />
				</ListItemIcon>
				<ListItemText>Rename</ListItemText>
			</MenuItem>
			<MenuItem onClick={onDelete}>
				<ListItemIcon>
					<DeleteIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>Delete</ListItemText>
			</MenuItem>
		</Menu>
		</>
	);
}
