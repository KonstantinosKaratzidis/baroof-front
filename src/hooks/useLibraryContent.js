import {createContext, useContext, useState, useEffect} from 'react';
import {getBaroofs, deleteBaroof} from '../api/baroofs.js';

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

	async function delBaroof(baroof){
		if(!baroof)
			return;
		setLoading(true);
		const resp = await deleteBaroof(baroof._id);
		setLoading(false);
		if(resp.success){
			setBaroofs(baroofs.filter(({_id}) => _id !== baroof._id))
		}
	}

	return (
		<LibraryContext.Provider value={{
			loading,
			error,
			baroofs,
			delBaroof
		}}>
			{children}
		</LibraryContext.Provider>
	)
}

export function useLibraryContext(){
	return useContext(LibraryContext);
}
