import {useEffect, useState} from 'react';
import {getLoginStatus} from '../api/login.js';

export default function User(){
	const [loggedIn, setLoggedIn] = useState(false);

	const text = loggedIn ? "logged in" : "not logged in"

	useEffect(() => {
		(async function() {
			const resp = await getLoginStatus();
			setLoggedIn(resp.data.isLoggedIn)
		})();
	}, [])
	return <h1>User {text}</h1>
}
