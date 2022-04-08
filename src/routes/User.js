import {Routes, Route} from 'react-router-dom';
import HomePageLayout from '../components/HomePageLayout';
import Login from './Login';
import Signup from './Signup';

export default function User(){
	console.log("User");
	return (
		<Routes>
			<Route element={<HomePageLayout />}>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Route>
		</Routes>
	)
}
