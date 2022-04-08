import {useState} from 'react';
import {getLoginStatus} from '../api/login.js';
import {logout} from '../api/logout.js';

const apiLogout = logout;

export default function useAuth(){
	const [loadingAuth, setLoadingAuth] = useState(false);
	const [authState, setAuthState] = useState({
		loggedIn: false,
		email: null,
		nickname: null
	});

	async function check(){
		setLoadingAuth(true);
		const resp = await getLoginStatus();
		if(resp.success){
			setAuthState(resp.data)
		}
		setLoadingAuth(false);
	}

	async function logout(){
		const resp = await apiLogout();
		setAuthState({
			loggedIn: false,
			email: null,
			nickname: null
		})
	}

	return {
		...authState,
		loadingAuth,
		check,
		logout,
	}
}
