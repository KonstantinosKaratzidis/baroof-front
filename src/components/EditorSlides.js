import Box from '@mui/material/Box';
import Stack from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Paper from '@mui/material/Paper';
import {useEditorContext} from '../hooks/useEditorContext';

function Slide({question, index, selected}){
	const {dispatch} = useEditorContext();
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
					borderRadius: 1,
					mr: "5px", ml: "5px",
					width: "200px",
					height: "150px",
					'& :hover': {
						cursor: "pointer"
					}
				}}
				onClick={() => dispatch({action: "EDIT_INDEX", value: index})}
			>
				<Typography mt={2} textAlign="center" component="div" variant="h5" sx={{flexGrow: 1, overflow: "hidden"}}>
					{question.text}
				</Typography>
				<Stack direction="row" justifyContent="center" sx={{display: "flex"}}>
				</Stack>
			</Paper>
		</Box>
	)
}

export default function EditorSlides({state}){
	const question = state.baroof.questions[0];
	const {dispatch} = useEditorContext();

	function onRemove(){
		dispatch({action: "SLIDE_REMOVE"})
	}

	function onAdd(){
		dispatch({action: "SLIDE_ADD"})
	}

	function onForward(){
		dispatch({action: "SLIDE_MOVE", value: 1})
	}

	function onBackward(){
		dispatch({action: "SLIDE_MOVE", value: -1})
	}

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
				<IconButton onClick={onRemove}>
					<RemoveCircleIcon color="error" fontSize="large"/>
				</IconButton>
				<IconButton onClick={onAdd}>
					<AddCircleIcon color="success" fontSize="large"/>
				</IconButton>
				<IconButton onClick={onBackward}>
					<ArrowBackIcon />
				</IconButton>
				<IconButton onClick={onForward}>
					<ArrowForwardIcon />
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
				{state.baroof.questions.map((question, index) => (
				<Slide question={question} index={index}
					selected={index === state.editIndex}
				/>
				))}
			</Box>
		</Box>
	)
}
