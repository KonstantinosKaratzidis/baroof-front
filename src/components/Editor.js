import {useSearchParams} from 'react-router-dom';
import {useLibraryContext} from '../hooks/useLibraryContent';
import {useReducer} from 'react';
import Box from '@mui/material/Box';
import EditorToolbar from './EditorToolbar';
import QuestionEditor from './QuestionEditor';
import {EditorProvider} from '../hooks/useEditorContext';

function normalized(baroof){
	function normalizeQuestion(question){
		const {options} = question;
		const indexes = new Set();
		for(const option of options)
			indexes.add(option.index)
		for(let i = 0; i < 4; i++){
			if(!indexes.has(i))
				options.push({index: i, isCorrect: false, text: ""})
		}
		return {
			...question,
			options
		}
	}
	return {
		...baroof,
		questions: baroof.questions.map(normalizeQuestion)
	}
}

const emptyBaroof = {
	title: "",
	questions: [{
		text: "",
		options: [
			{index: 0, isCorrect: false, text: ""},
			{index: 0, isCorrect: false, text: ""},
			{index: 0, isCorrect: false, text: ""},
			{index: 0, isCorrect: false, text: ""}
		]
	}]
};

function useGetBaroof(){
	const {baroofs} = useLibraryContext();
	const [params] = useSearchParams();
	const _id = params.get("_id");

	const matching = baroofs.filter(baroof => baroof._id === _id)

	if(_id && matching.length){
		const matchedBaroof = matching[0];
		return(normalized(matchedBaroof))
	}
	else
		return emptyBaroof;
}

function reducer(state, {action, value}){
	if(action === "BAROOF_TITLE")
		return {...state, title: action.value}
	if(action === "QUESTION_TEXT"){
		return {
			...state,
			baroof: {
				...state.baroof,
				questions: state.baroof.questions.map((q, index) => {
					if(index !== state.editIndex)
						return q;
					return {
						...q,
						text: value
					}
				})
			}
		};
	}
	if(action === "OPTION"){
		return {
			...state,
			baroof: {
				...state.baroof,
				questions: state.baroof.questions.map((q, index) => {
					if(index !== state.editIndex)
						return q;
					return {
						...q,
						options:
						state.baroof.questions[state.editIndex].options.map(option => {
							if(option.index !== value.index)
								return option;
							return value
						})
					}
				})
			}
		};
	}
	return state;
}

export default function Editor(){
	const baroof = useGetBaroof();
	const [state, dispatch] = useReducer(reducer, {
		baroof,
		editIndex: 0
	});

	return (
		<EditorProvider dispatch={dispatch}>
			<Box>
				<EditorToolbar baroof={state.baroof}/>
	 			<QuestionEditor question={baroof.questions[state.editIndex]} />
			</Box>
		</EditorProvider>
	)
}
