import {getBaroofs} from '../api/baroofs.js';
import {useEffect, useState} from 'react';
import BaroofList from '../components/BaroofList';

export default function Library(){
	const [baroofs, setBaroofs] = useState([]);

	useEffect(() => {
		(async () => {
			const resp = await getBaroofs();
			if(!resp.success){
			} else {
				setBaroofs(resp.data);
			}
		})()
	}, [])

	return <BaroofList baroofs={baroofs} />;
}
