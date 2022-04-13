import {useSearchParams} from 'react-router-dom';
import {useLibraryContext} from '../hooks/useLibraryContent';
import {useReducer} from 'react';
import Box from '@mui/material/Box';
import EditorToolbar from './EditorToolbar';
import QuestionEditor from './QuestionEditor';
import {EditorProvider} from '../hooks/useEditorContext';
import CircularProgress from '@mui/material/CircularProgress';
import EditorSlides from './EditorSlides';
import * as _ from 'lodash'

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
	console.log(action, value);
	const newState = _.cloneDeep(state);
	switch(action){
		case "SAVE":
			break;
		case "EXIT":
			break;
		case "BAROOF_TITLE":
			newState.baroof.title = value
			break;
		case "QUESTION_TEXT":
			newState.baroof.questions[state.editIndex].text = value;
			break;
		case "OPTION":
			newState.baroof.questions[state.editIndex].options = 
				newState.baroof.questions[state.editIndex].options.map(option => {
					if(option.index !== value.index)
						return option
					return {...value};
				})
			break;
		case "EDIT_INDEX":
			newState.editIndex = value;
			break;
		case "SLIDE_ADD":
			newState.baroof.questions.push(_.cloneDeep(emptyBaroof.questions[0]))
			newState.editIndex = newState.baroof.questions.length - 1;
			break;
		case "SLIDE_REMOVE":
			_.pullAt(newState.baroof.questions, [newState.editIndex])
			newState.editIndex =
				_.clamp(newState.editIndex, 0, newState.baroof.questions.length - 1);
			if(newState.baroof.questions.length === 0)
				newState.baroof.questions.push(_.cloneDeep(emptyBaroof.questions[0]))
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

			break;
		default:
			console.log("UNKNOWN ACTION !!!")
			break;
	}
	return newState;
}

// workaround for useReducer
function EditorInner(){
	const {loading} = useLibraryContext();
	const baroof = useGetBaroof();
	const initialState = {
		loading,
		baroof: _.cloneDeep(baroof),
		editIndex: 0
	}
	const [state, dispatch] = useReducer(reducer, initialState);
	console.log(state.editIndex)


	return (
		<EditorProvider dispatch={dispatch}>
			<Box>
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
