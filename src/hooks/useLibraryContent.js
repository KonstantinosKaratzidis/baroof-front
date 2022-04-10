import {createContext, useContext, useState, useEffect} from 'react';
import {getBaroofs} from '../api/baroofs.js';

const LibraryContext = createContext();

export default function LibraryProvider({children}){
	const [loading, setLoading] = useState(true);
	const [baroofs, setBaroofs] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		(async () => {
			try { 
				const resp = await getBaroofs();
				if(!resp.success){
					setError(resp.msg);
				} else {
					setBaroofs(resp.data);
				}
			} catch(err){
			}
			setLoading(false)
		})()
	}, [])

	return (
		<LibraryContext.Provider value={{
			loading,
			error,
			baroofs
		}}>
			{children}
		</LibraryContext.Provider>
	)
}

export function useLibraryContext(){
	return useContext(LibraryContext);
}
