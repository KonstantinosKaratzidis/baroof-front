import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import HomePageLayout from '../components/HomePageLayout';
import Login from './Login';
import Signup from './Signup';
import {useAuthContext} from '../components/AuthProvider';
import UserLayout from '../components/UserLayout';
import CircularProgress from '@mui/material/CircularProgress';
import Library from './Library';
import LibraryProvider from '../hooks/useLibraryContent.js';
import Editor from '../components/Editor';

function RedirectToLogin(){
	const {isLoggedIn, loadingAuth} = useAuthContext();

	if(loadingAuth)
		return <CircularProgress />

	
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
					<Route element={<LibraryProvider />}>
						<Route index element={
							<Navigate to="/user/library" replace={true}/ >
						}/>
						<Route path="library/*" element={<Library />} />
						<Route path="reports" element={<h1>Reports</h1>} />
					</Route>
					<Route path="editor" element={<Editor />} />
				</Route>
			</Route>
		</Routes>
	)
}

