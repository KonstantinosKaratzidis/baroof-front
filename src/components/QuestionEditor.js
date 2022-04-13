import LimitedTextField from './LimitedTextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import {getIconForIndex, getIconColor} from './QuestionIcons';
import {useEditorContext} from '../hooks/useEditorContext';
import * as _ from 'lodash';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function OptionEditor({option}){
	const {dispatch} = useEditorContext();
	const isSet = option.text !== "";
	const {index, isCorrect} = option;
	const Icon = getIconForIndex(index);

	function onTextChange(ev){
		dispatch({action: "OPTION", value: {
			...option,
			text: ev.target.value,
		}})
	}

	function onCorrectClicked(ev, val){
		dispatch({action: "OPTION", value: {
			...option,
			isCorrect: !isCorrect
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
			<Stack direction="row" alignItems="center" spacing={1}>
				<Icon height="80px"/>
				<LimitedTextField
					value={option.text}
					size="small"
					limit={75}
					inputProps={{style: {color: isSet ? "white" : "inherit"}}}
					onChange={onTextChange}
					placeholder="Type answer"
					sx={{flexGrow: 1}}
					multiline
					minRows={2}
				/>
				<IconButton onClick={onCorrectClicked}>
					{ isCorrect ? 
						<CheckCircleOutlineIcon /> :
						<RadioButtonUncheckedIcon />
					}
				</IconButton>
			</Stack>
		</Paper>
	)
}

export default function QuestionEditor({question, onChange}){
	const {dispatch} = useEditorContext();

	const getOption = (index) => _.find(question.options, ["index", index])

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

