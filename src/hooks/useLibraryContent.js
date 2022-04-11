import {createContext, useContext, useState, useEffect} from 'react';
import {getBaroofs, deleteBaroof, renameBaroof} from '../api/baroofs.js';

const LibraryContext = createContext();
const renameBaroofApi = renameBaroof; // fixes name clash

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

	async function renameBaroof(baroof, newTitle){
		if(!baroof)
			return;
		setLoading(true);
		const resp = await renameBaroofApi(baroof._id, newTitle);
		setLoading(false);
		console.log("got response", resp);
		if(resp.success){
			setBaroofs(baroofs.map(baroof_ => {
				if(baroof_._id !== baroof._id)
					return baroof_;
				return {...baroof_, title: newTitle}
			}))
		}
	}

	return (
		<LibraryContext.Provider value={{
			loading,
			error,
			baroofs,
			delBaroof,
			renameBaroof
		}}>
			{children}
		</LibraryContext.Provider>
	)
}

export function useLibraryContext(){
	return useContext(LibraryContext);
}
