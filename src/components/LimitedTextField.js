import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {useState} from 'react';

export default function LimitedTextField({limit, onChange, value, ...props}){
	const [_value, setValue] = useState(value || "");

	function valueChanged(ev){
		if(ev.target.value.length <= limit && onChange){
			onChange(ev);
			setValue(ev.target.value);
		}
	}

	return (
		<TextField
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">{limit - value.length}</InputAdornment>
				)
			}}
			onChange={valueChanged}
			value={_value}
			{...props}
		/>
	)
}
