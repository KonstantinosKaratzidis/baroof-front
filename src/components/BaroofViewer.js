import {useParams} from 'react-router-dom';
import {useLibraryContext} from "../hooks/useLibraryContent";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import format from 'date-format';
import {Link, Navigate} from 'react-router-dom';
import Rating from '@mui/material/Rating';
import BaroofCardMenu from './BaroofCardMenu';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {getIconForIndex} from './QuestionIcons';

function Info({baroof}){
	const dateUpdated = format("dd/MM/yy hh:mm", new Date(baroof.updatedAt));
	const {setFavoriteBaroof} = useLibraryContext();

	function onFavoriteChange(ev, value){
		setFavoriteBaroof(baroof, Boolean(value));
	}

	return (
		<Box mt={2}>
			<Typography variant="h3" component="h1">{baroof.title}</Typography>
			<Typography variant="h5" component="p">{baroof.description}</Typography>
			<Box>
				<Typography component="span" sx={{color: "grey"}}>
					{`${baroof.numPlays} plays ${baroof.numPlayers} players`}
				</Typography>
			</Box>
			<Stack direction="row" sx={{backgroundColor: "#ddd", padding: "5px 3px"}}
				spacing={1} alignItems="center"
			>
				<Link to={`/user/editor?_id${baroof._id}`}>
					<Button variant="contained" component="div">
						<Typography fontWeight="bold">
							Edit
						</Typography>
					</Button>
				</Link>
				<Link to={`/user/host/${baroof._id}`}>
					<Button variant="contained" component="div" color="success">
						<Typography fontWeight="bold">
							Play
						</Typography>
					</Button>
				</Link>
				<Typography sx={{color: "#666", textAlign: "center"}}>
					Updated at {dateUpdated}
				</Typography>
				<Box component="div" flexGrow={1}>
				</Box>
				<Rating max={1} value={baroof.isFavorite ? 1 : 0} onChange={onFavoriteChange}>
				</Rating>
				<BaroofCardMenu baroof={baroof}/>
			</Stack>
		</Box>
	)
}

function Option({option, index}){
	const Icon = getIconForIndex(index);
	return (
		<Stack direction="row" pt={1} pb={1} spacing={1}>
			<Icon />
			<Box sx={{display: "flex", flexGrow: "1", alignItems: "center"}}>
				<Typography fontSize="1.2em">{option.text}</Typography>
			</Box>
			{
				option.isCorrect ? 
				<CheckIcon sx={{fontSize: "2em",color: "green"}} /> :
				<ClearIcon sx={{fontSize: "2em", color: "red"}} />
			}
		</Stack>
	);
}

function Question({index, question}){
	return (
		<Paper sx={{padding: 2}}>
			<Typography variant="h4">{index} - {question.text}
			</Typography>
			<Divider />
			<Stack divider={<Divider />}>
				{question.options.map((option, index) =>
					<Option option={option} index={index} key={index}/>)}
			</Stack>
		</Paper>
	)
}

function QuestionList({questions}){
	if(!questions)
		questions = [];

	return (
		<Box>
			<Stack direction="row">
				<Typography>
					Questions ({questions.length})
				</Typography>
			</Stack>
			<Stack spacing={2}>
				{questions.map((question, index) => <Question question={question} index={index} key={index} />)}
			</Stack>
		</Box>
	);
}

function getSpecific(baroofs, _id){
	if(!baroofs)
		return null;
	const matched = baroofs.filter(baroof => baroof._id === _id)
	if(matched.length === 0)
		return null
	return matched[0];
}

export default function BaroofViewer(){
	const {baroofs} = useLibraryContext();
	const {_id} = useParams();

	const baroof = getSpecific(baroofs, _id);

	if(!baroof)
		return <Navigate to="/user/library" replace/>
	
	return (
		<>
			<Info baroof={baroof} />
			<QuestionList questions={baroof.questions} />
		</>
	)
}
