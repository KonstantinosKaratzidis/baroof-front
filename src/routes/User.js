import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import HomePageLayout from '../components/HomePageLayout';
import Login from './Login';
import Signup from './Signup';
import {useAuthContext} from '../components/AuthProvider';

function RedirectToLogin(){
	const {isLoggedIn} = useAuthContext();
	console.log(isLoggedIn);
	return (
		<>
		{isLoggedIn ? <Outlet /> : <Navigate to="/user/login" />}
		</>
	)
}

export default function User(){
	return (
		<Routes>
			<Route element={<HomePageLayout />}>
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
			</Route>
			<Route element={<RedirectToLogin />}>
				<Route path="/" element={<h1>Home</h1>} />
			</Route>
		</Routes>
	)
}
