import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useLibraryContext} from '../hooks/useLibraryContent';

export default function DeleteDialog({onClose, baroof, ...props}){
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
