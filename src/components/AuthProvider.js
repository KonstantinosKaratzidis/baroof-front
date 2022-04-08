import {useEffect, createContext, useContext} from 'react';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext();

export default function AuthProvider({children}){
	const authContext = useAuth();

	useEffect(() => {
		authContext.check();
	}, [])

	return (
		<AuthContext.Provider value={authContext}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuthContext(){
	return useContext(AuthContext);
}
