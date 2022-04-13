import {useSearchParams} from 'react-router-dom';
import {useLibraryContext} from '../hooks/useLibraryContent';
import {useReducer} from 'react';
import Box from '@mui/material/Box';
import EditorToolbar from './EditorToolbar';
import QuestionEditor from './QuestionEditor';
import {EditorProvider, useEditorContext} from '../hooks/useEditorContext';
import CircularProgress from '@mui/material/CircularProgress';
import EditorSlides from './EditorSlides';
import * as _ from 'lodash';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate, Navigate} from 'react-router-dom';

const emptyBaroof = {
	title: "Unititled",
	questions: [{
		text: "",
		options: [
			{index: 0, isCorrect: false, text: ""},
			{index: 1, isCorrect: false, text: ""},
			{index: 2, isCorrect: false, text: ""},
			{index: 3, isCorrect: false, text: ""}
		]
	}]
}

function normalized(baroof){
	if(!baroof){
		return _.cloneDeep(emptyBaroof);
	}

	const copied = _.cloneDeep(baroof);
	copied.questions = copied.questions.map(q =>
		({
			...q,
			options: 
		_.unionBy(q.options, [
			{index: 0, isCorrect: false, text: ""},
			{index: 1, isCorrect: false, text: ""},
			{index: 2, isCorrect: false, text: ""},
			{index: 3, isCorrect: false, text: ""}
		], "index")
		})
	)

	return copied;
}

function useGetBaroof(){
	const {baroofs} = useLibraryContext();
	const [params] = useSearchParams();
	const _id = params.get("_id");

	const matching = _.find(baroofs, (baroof) => baroof._id === _id)
	return normalized(matching ? matching : null);
}

function reducer(state, {action, value}){
	const newState = _.cloneDeep(state);
	switch(action){
		case "SAVE":
			break;
		case "EXIT":
			newState.showExitModal = value;
			break;
		case "BAROOF_TITLE":
			newState.baroof.title = value;
			newState.hasChanges = true;
			break;
		case "QUESTION_TEXT":
			newState.baroof.questions[state.editIndex].text = value;
			newState.hasChanges = true;
			break;
		case "OPTION":
			newState.baroof.questions[state.editIndex].options = 
				newState.baroof.questions[state.editIndex].options.map(option => {
					if(option.index !== value.index)
						return option
					return {...value};
				})
			newState.hasChanges = true;
			break;
		case "EDIT_INDEX":
			newState.editIndex = value;
			break;
		case "SLIDE_ADD":
			newState.baroof.questions.push(_.cloneDeep(emptyBaroof.questions[0]))
			newState.editIndex = newState.baroof.questions.length - 1;
			newState.hasChanges = true;
			break;
		case "SLIDE_REMOVE":
			_.pullAt(newState.baroof.questions, [newState.editIndex])
			newState.editIndex =
				_.clamp(newState.editIndex, 0, newState.baroof.questions.length - 1);
			if(newState.baroof.questions.length === 0)
				newState.baroof.questions.push(_.cloneDeep(emptyBaroof.questions[0]))
			newState.hasChanges = true;
			break;
		case "SLIDE_MOVE":
			const destIndex = newState.editIndex + value;
			if(destIndex < 0 || destIndex >= newState.baroof.questions.length)
				break;
			const tmp = newState.baroof.questions[destIndex];
			newState.baroof.questions[destIndex] = 
				newState.baroof.questions[newState.editIndex];
			newState.baroof.questions[newState.editIndex] = tmp;
			newState.editIndex = destIndex;
			newState.hasChanges = true;
			break;
		default:
			console.log("UNKNOWN ACTION !!!")
			break;
	}
	return newState;
}

function ExitDialog({...props}){
	const {dispatch} = useEditorContext();
	const navigate = useNavigate();

	function onExit(){
		navigate('/user/library');
	}
	return (
		<Dialog {...props} sx={{padding: 2}}>
			<DialogTitle>
				<Typography component="p" variant="h4" textAlign="center">
					Exit Editor ?
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Typography>
					If you quit now your changes will be lost
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button size="large" variant="outlined"
					color="success"
					onClick={() =>  {dispatch({action: "EXIT", value: false})}}
				>
					Cancel
				</Button>
				<Button size="large" variant="contained" color="error"
					onClick={onExit}
				>
					Exit
				</Button>
			</DialogActions>
		</Dialog>
	)
}

// workaround for useReducer
function EditorInner(){
	const baroof = useGetBaroof();
	const initialState = {
		loading: false,
		baroof: _.cloneDeep(baroof),
		editIndex: 0,
		showExitModal: false,
		hasChanges: false
	}
	const [state, dispatch] = useReducer(reducer, initialState);
	console.log("has changes", state.hasChanges);

	if(!state.hasChanges && state.showExitModal)
		return <Navigate to="/user/library" />

	return (
		<EditorProvider dispatch={dispatch}>
			<Box>
				<ExitDialog open={state.showExitModal}
					onClose={() => dispatch({action: "EXIT", value: false})}
				/>
				<EditorToolbar state={state}/>
				<EditorSlides state={state}/>
				<QuestionEditor state={state} />
			</Box>
		</EditorProvider>
	)
}

export default function Editor(){
	const {loading} = useLibraryContext();
	if(loading)
		return <CircularProgress />
	else
		return <EditorInner />
}
