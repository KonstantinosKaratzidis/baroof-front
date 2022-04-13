import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {useState} from 'react';

export default function LimitedTextField({limit, onChange, value, ...props}){
	function valueChanged(ev){
		if(ev.target.value.length <= limit && onChange){
			onChange(ev);
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
			value={value}
			{...props}
		/>
	)
}
