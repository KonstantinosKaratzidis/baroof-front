import LoadingModal from './LoadingModal';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {hostBaroof} from '../api/host';
import PlayersJoin from './hosting/PlayersJoin';
import {io} from 'socket.io-client';
import Typography from '@mui/material/Typography';

export default function Host(){
	const {baroofId} = useParams();
	const [loading, setLoading] = useState(true);
	const [gamePin, setGamePin] = useState("");
	const [err, setErr] = useState("");
	const [gameState, setGameState] = useState("JOIN");
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		(async function(){
			const resp = await hostBaroof(baroofId);
			if(!resp.success){
				setErr("Failed to get a game pin");
			} else {
				const pin = resp.data;
				setGamePin(pin);
				const socket = io(`ws://localhost:4000/${pin}`)
				setSocket(socket);
			}
			setLoading(false);
		})()
	}, [])

	if(loading)
		return <LoadingModal open={true}/>
	if(err)
		<Typography color="red">{err}</Typography>
	else {
		if(gameState === "JOIN")
			return <PlayersJoin socket={socket} gamePin={gamePin}/>
	}

}
