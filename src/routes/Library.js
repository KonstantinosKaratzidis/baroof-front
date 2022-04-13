import BaroofList from '../components/BaroofList';
import BaroofViewer from '../components/BaroofViewer';
import {useLibraryContext} from '../hooks/useLibraryContent.js';
import {Routes, Route} from 'react-router-dom';
import LoadingModal from '../components/LoadingModal';

export default function Library(){
	const {loading} = useLibraryContext();
	return (
		<>
			<LoadingModal open={loading}/>
			<Routes>
				<Route path="/" element={<BaroofList />} />
				<Route path="/:_id" element={<BaroofViewer />} />
			</Routes>
		</>
	)
}
