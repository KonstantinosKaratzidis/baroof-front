import BaroofList from '../components/BaroofList';
import BaroofViewer from '../components/BaroofViewer';
import LibraryProvider, {useLibraryContext} from '../hooks/useLibraryContent.js';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Routes, Route} from 'react-router-dom';

function LoadingModal(){
	const {loading} = useLibraryContext();
	return (
		<Modal open={loading}>
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

export default function Library(){
	return (
		<LibraryProvider>
			<LoadingModal />
			<Routes>
				<Route path="/" element={<BaroofList />} />
				<Route path="/:_id" element={<BaroofViewer />} />
			</Routes>
		</LibraryProvider>
	)
}
