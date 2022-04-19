import {Input, Button} from '../components/HomePageComponents'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import LoadingModal from './LoadingModal';
import HomePageLayout from './HomePageLayout';
import {checkGamePin} from '../api/host';
import {io} from 'socket.io-client';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

function Pin({onSetPin}){
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [pin, setPin] = useState("");
	const [error, setError] = useState("");

	async function onEnter(){
		setLoading(true);
		const resp = await checkGamePin(pin);
		if(!resp.success)
			setError("Invalid pin");
		else{
			onSetPin(pin)
		}
		setLoading(false);
	}

	return (
		<HomePageLayout>
			<LoadingModal open={loading} />
			<Box>
				<Input placeholder="Game PIN" value={pin} error={Boolean(error)}
					helperText={error}
					onChange={ev => {setPin(ev.target.value)}}
				/>
				<Button onClick={onEnter}>
					<Typography>Enter</Typography>
				</Button>
			</Box>
		</HomePageLayout>
	)
}

function Name({onSetName, socket, name, setName}){
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	function callOnSetName(){
		onSetName(name);
	}

	useEffect(() => {
		socket.on("error", () => {
			setError("Invalid name");
			setLoading(false);
		}).on("NAME_INVALID", () => {
			setError("Invalid name");
			setLoading(false);
		}).on("NAME_OK", () => {
			callOnSetName();
			setLoading(false);
		})

		return () => {
			socket.off("error");
			socket.off("NAME_INVALID");
		}
	}, [])

	async function onEnter(){
		setLoading(true);
		socket.emit("SET_NAME", name);
	}

	return (
		<HomePageLayout>
			<LoadingModal open={loading} />
			<Box>
				<Input placeholder="Player Name" value={name} error={Boolean(error)}
					helperText={error}
					onChange={ev => {setName(ev.target.value)}}
				/>
				<Button onClick={onEnter}>
					<Typography>Enter</Typography>
				</Button>
			</Box>
		</HomePageLayout>
	)
}

function Game({socket, name}){
	const [waiting, setWaiting] = useState(true);
	const [points, setPoints] = useState(0);

	return (
	<Box sx={{display: "flex", flexDirection: "column", backgroundColor: "#46178f", height: "100vh"}}>
		<Container
			sx={{display: "flex", backgroundColor: "white",
				justifyContent: "space-between"}}
		>
			<Typography fontWeight="bold">{name}</Typography>
			<Typography fontWeight="bold">{points}</Typography>
		</Container>
		{
		waiting ? 
		<Box sx={{display: "flex", flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
			<Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
				<CircularProgress size={100}/>
				<Typography mt={5} variant="h4" color="white">... Waiting ...</Typography>
			</Box>
		</Box> :
		null
		}
	</Box>
	)
}

export default function Guest(){
	const [stage, setStage] = useState("pin");
	const [pin, setPin] = useState("");
	const [name, setName] = useState("");
	const [socket, setSocket] = useState(null);

	if(stage === "name" && !socket){
		setSocket(io(`ws://localhost:4000/${pin}`))
	}

	if(stage === "pin")
		return <Pin onSetPin={(pin) => {setPin(pin); setStage("name")}}/>
	if(stage === "name")
		return <Name socket={socket} name={name} setName={setName}
		onSetName={(name) => {
			setStage("game");
		}} />
	if(stage === "game")

	return <Game socket={socket} name={name}/>
}
