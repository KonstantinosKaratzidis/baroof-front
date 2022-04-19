import {Routes, Route} from 'react-router-dom';
import HomePageLayout from '../components/HomePageLayout';
import GuestComp from '../components/Guest';
import GuestJoin from './GuestJoin';

export default function Guest(){
	return (
		<Routes>
			<Route index element={<GuestComp />} />
		</Routes>
	)
}
