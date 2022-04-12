import LimitedTextField from './LimitedTextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import {getIconForIndex, getIconColor} from './QuestionIcons';
import {useEditorContext} from '../hooks/useEditorContext';

function OptionEditor({option}){
	const {dispatch} = useEditorContext();
	const isSet = option.text !== "";
	const {index} = option;
	const Icon = getIconForIndex(index);

	function onTextChange(ev){
		dispatch({action: "OPTION", value: {
			...option,
			text: ev.target.value,
		}})
	}

	return (
		<Paper
			sx={{
				padding: 1,
				height: "100px",
				backgroundColor: isSet ? getIconColor(index) : "transparent"
			}}
		>
			<Stack direction="row" alignItems="center">
				<Icon height="80px"/>
				<LimitedTextField
					value={option.text}
					size="small"
					limit={75}
					inputProps={{style: {color: isSet ? "white" : "inherit"}}}
					onChange={onTextChange}
				/>
			</Stack>
		</Paper>
	)
}


export default function QuestionEditor({question, onChange}){
	const {dispatch} = useEditorContext();

	function getOption(index){
		return question.options.filter(option => option.index === index)[0]
	}

	function onQuestionTextChange(ev){
		dispatch({action: "QUESTION_TEXT", value: ev.target.value})
	}

	function renderOption(index){
		const option = getOption(index);
		return (
			<Grid item xs={6}>
				<OptionEditor option={option} />
			</Grid>
		)
	}

	return (
		<Grid container mt={3} spacing={1}>
			<Grid item xs={12}>
				<LimitedTextField
					inputProps={{style: {textAlign: "center", fontSize: "2em", lineHeight: "1.5"}}}
					sx={{width: "100%", textAlign: "center"}}
					value={question.text}
					limit={120}
					onChange={onQuestionTextChange}
					placeholder="Start typing your question"
					multiline
				/>
			</Grid>
			{renderOption(0)}
			{renderOption(1)}
			{renderOption(2)}
			{renderOption(3)}
		</Grid>
	)
}
