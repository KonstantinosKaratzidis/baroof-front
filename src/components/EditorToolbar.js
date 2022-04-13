import LimitedTextField from './LimitedTextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useEditorContext} from '../hooks/useEditorContext';

export default function EditorToolbar({state}){
	const {dispatch} = useEditorContext();
	const {baroof} = state;
	function onTitleChange(ev){
		dispatch({action: "BAROOF_TITLE", value: ev.target.value})
	}

	function onExit(){
		dispatch({action: "EXIT", value: true})
	}

	function onSave(){
		dispatch({action: "SAVE"})
	}

	return (
		<Stack mt={2} direction="row" spacing={2}>
			<LimitedTextField
				size="small"
				value={baroof.title}
				onChange={onTitleChange}
				limit={95}
				placeholder="Title"
			/>
			<Box flexGrow={1} />
			<Button variant="outlined" onClick={onExit}>
				Exit
			</Button>
			<Button variant="contained" color="success"
				onClick={onSave}
			>
				Save
			</Button>
		</Stack>
	)
}
