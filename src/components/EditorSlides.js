import Box from '@mui/material/Box';
import Stack from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Paper from '@mui/material/Paper';

function Slide({question, index, selected}){
	return (
		<Box sx={{
			border: selected ? "2px solid #aad" : "2px solid white",
			pb: 0.5, pt: 0.5,
			borderRadius: 2
		}}>
			<Paper
				elevation={2}
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "80px",
					borderRadius: 1,
					mr: "5px", ml: "5px",
					width: "200px",
					height: "150px",
					'& :hover': {
						cursor: "pointer"
					}
				}}
			>
				<Typography mt={2} textAlign="center" component="div" variant="h5" sx={{flexGrow: 1}}>
					{question.text}
				</Typography>
				<Stack direction="row" justifyContent="center" sx={{display: "flex"}}>
					<Box>
						<IconButton component="div">
							<ArrowBackIcon />
						</IconButton>
						<IconButton component="div">
							<ArrowForwardIcon />
						</IconButton>
					</Box>
				</Stack>
			</Paper>
		</Box>
	)
}

export default function EditorSlides({state}){
	const question = state.baroof.questions[0];
	return (
		<Box sx={{
			border: "1px solid #bbb",
			mt: 2,
			height: "200px",
			borderRadius: 1,
			display: "flex",
			alignItems: "center",
			flexDirection: "row",
		}}>
			<Box sx={{display: "flex", flexDirection: "column"}}>
				<IconButton>
					<RemoveCircleIcon color="error" fontSize="large"/>
				</IconButton>
				<IconButton>
					<AddCircleIcon color="success" fontSize="large"/>
				</IconButton>
			</Box>
			<Box sx={{
					overflowX: "scroll",
					height: "100%",
					display: "flex",
					alignItems: "center",
					flexDirection: "row",
				}}
			>
				<Slide question={question} index={0} selected/>
				<Slide question={question} index={0} />
				<Slide question={question} index={0} />
				<Slide question={question} index={0} />
				<Slide question={question} index={0} />
				<Slide question={question} index={0} />
				<Slide question={question} index={0} />
			</Box>
		</Box>
	)
}
