import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useState} from 'react';
import LimitedTextField from './LimitedTextField';

export default function RenameDialog({onClose, baroof, ...props}){
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

