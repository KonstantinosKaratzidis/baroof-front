import TextField from '@mui/material/TextField';
import MaterialButton from '@mui/material/Button';

export function Input({...props}){
	return <TextField variant="outlined" 
		sx={{width: 0.9, margin: "10px auto"}} size="small" {...props}
	/>
}


export function Button({...props}){
	return (
		<MaterialButton sx={{width: 0.9, margin: "10px auto"}} variant="contained"
			{...props}
		/>
	)
}
