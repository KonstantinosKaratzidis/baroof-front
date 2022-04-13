import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingModal({open}){
	return (
		<Modal open={open}>
			<Box sx={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems:"center",
				justifyContent: "center"
			}}>
				<CircularProgress size={100}/>
			</Box>
		</Modal>
	)
}
