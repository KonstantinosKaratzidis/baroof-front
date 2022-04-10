import Stack from '@mui/material/Stack';
import BaroofCard from './BaroofCard';
import {useLibraryContext} from '../hooks/useLibraryContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from 'react';

export default function BaroofList(){
	const [searchValue, setSearchValue] = useState("");
	const {baroofs} = useLibraryContext();

	const searchRegEx = new RegExp(searchValue, "i");
	const matchedSearch = (title) => searchRegEx.test(title);

	return (
		<Box mt={5}>
			<TextField placeholder="Search" size="small"
				InputProps={{
				startAdornment: (
					<InputAdornment position="start"><SearchIcon /></InputAdornment>
				),
				}}
				value={searchValue}
				onChange={(ev) => {setSearchValue(ev.target.value)}}
			/>
			<Stack direction="column" spacing={2} mt={5}>
				{baroofs.filter(({title}) => matchedSearch(title)).map(baroof => (
					<BaroofCard baroof={baroof} key={baroof._id} />
				))}
			</Stack>
		</Box>
	)
}
