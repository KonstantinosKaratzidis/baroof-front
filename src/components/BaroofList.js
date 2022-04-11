import Stack from '@mui/material/Stack';
import BaroofCard from './BaroofCard';
import {useLibraryContext} from '../hooks/useLibraryContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {Link} from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function BaroofList(){
	const [searchValue, setSearchValue] = useState("");
	const [showFilter, setShowFilter] = useState("all");
	const {baroofs} = useLibraryContext();

	const searchRegEx = new RegExp(searchValue, "i");
	const matchedSearch = (title) => searchRegEx.test(title);

	const renderBaroofs = () => (
		baroofs
		.filter(({isFavorite}) => (showFilter === "all") || isFavorite)
		.filter(({title}) => matchedSearch(title))
		.map(baroof => (
			<BaroofCard baroof={baroof} key={baroof._id} />
		))
	)


	return (
		<Box mt={5}>
			<Stack direction="row" justifyContent="space-between">
				<TextField placeholder="Search" size="small"
					InputProps={{
					startAdornment: (
						<InputAdornment position="start"><SearchIcon /></InputAdornment>
					),
					}}
					value={searchValue}
					onChange={(ev) => {setSearchValue(ev.target.value)}}
				/>
				<Link to="/user/editor">
					<Button variant="contained" color="success" startIcon={<AddIcon/>}>
						<Typography sx={{fontWeight: "bold"}}>New</Typography>
					</Button>
				</Link>
			</Stack>
			<Stack direction="row" mt={1}>
				<FormControl>
					<InputLabel>Show</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={showFilter}
						label="Show"
						onChange={(ev) => setShowFilter(ev.target.value)}
						sx={{width: 150}}
					>
						<MenuItem value={"all"}>All</MenuItem>
						<MenuItem value={"favorites"}>Favorites</MenuItem>
					</Select>
				</FormControl>
			</Stack>
			<Stack direction="column" spacing={2} mt={5}>
				{renderBaroofs()}
			</Stack>
		</Box>
	)
}
