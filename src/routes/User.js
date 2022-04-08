import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import HomePageLayout from '../components/HomePageLayout';
import Login from './Login';
import Signup from './Signup';
import {useAuthContext} from '../components/AuthProvider';
import UserLayout from '../components/UserLayout';

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
				<Route element={<UserLayout />}>
					<Route index element={
						<Navigate to="/user/library" replace={true}/ >}
					/>
					<Route path="library" element={<h1>Library</h1>} />
					<Route path="reports" element={<h1>Reports</h1>} />
				</Route>
			</Route>
		</Routes>
	)
}

