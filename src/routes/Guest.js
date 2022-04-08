import {Routes, Route} from 'react-router-dom';
import HomePageLayout from '../components/HomePageLayout';
import GuestJoin from './GuestJoin';

export default function Guest(){
	return (
		<Routes>
			<Route element={<HomePageLayout />}>
				<Route index element={<GuestJoin />} />
			</Route>
		</Routes>
	)
}
