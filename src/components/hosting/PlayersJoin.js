import {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';

function formatGamePin(pin){
	return pin.slice(0, 3) + " " + pin.slice(3)
}

function WaitingPlayers(){
	return (
	<Box sx={{height: "30em", display: "flex", alignItems: "center", justifyContent: "center"}}>
		<Box sx={{backgroundColor: "#1f0a3f", padding: 1, borderRadius: 2}}>
			<Typography component="span" variant="h3" fontWeight="bold">
				Waiting for players...
			</Typography>
		</Box>
	</Box>
	)
}

function Players({players}){
	return (
		<Box sx={{display: "flex", justifyContent: "center", flexWrap: "wrap",
			pt:5}}
		>
		{players.map(player => (
		<Box sx={{backgroundColor: "#1f0a3f", margin: 1, pl: 1, pr: 1,
			borderRadius: 1}}
			key={player}
		>
				<Typography fontWeight="bold" fontSize="1.5em">
					{player}
				</Typography>
			</Box>
		))}
	</Box>
	)
}

// #25076b
export default function PlayersJoin({gamePin, socket}){
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		socket.on("NEW_PLAYER", (name) => {
			setPlayers((players) => ([...players, name]))
		})

		return () => {
			socket.off("NEW_PLAYER")
		}
	}, [])

	return (
	<Box>
		<Box sx={{
			backgroundColor: "#25076b",
			height: "13em",
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		}}>
			<Box sx={{backgroundColor: "white", borderRadius: 1, padding: 1}}>
				<Typography variant="p" variant="h6" sx={{fontWeight: "bold"}}>
					Game Pin:
				</Typography>
				<Typography component="p" variant="h1" sx={{fontWeight: "bold"}}>
					{formatGamePin(gamePin)}
				</Typography>
			</Box>
		</Box>
		<Box sx={{backgroundColor: "#46178f", color: "white", minHeight: "calc(100vh - 13em)"}}>
			<Container>
				<Box sx={{
					display: "flex",
					pt: 3,
					justifyContent: "space-between"
				}}>
					<Box sx={{display: "flex", backgroundColor: "#1f0a3f", alignItems: "center", borderRadius: 2, padding: 1}}>
						<PersonIcon />
						<Typography ml={1}>{players.length}</Typography>
					</Box>
					<Button variant="contained" disabled={players.length === 0}>
						Start
					</Button>
				</Box>
				{players.length ?
					<Players players={players}/> :
					<WaitingPlayers />
				}
			</Container>
		</Box>
	</Box>
	)
}
