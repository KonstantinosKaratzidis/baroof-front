import Card from '@mui/material/Card';
import CardContent from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import format from 'date-format';
import {Link} from 'react-router-dom';
import BaroofCardMenu from './BaroofCardMenu';
import { useLibraryContext } from '../hooks/useLibraryContent';

export default function BaroofCard({baroof}){
	const dateUpdated = format("dd/MM/yy hh:mm", new Date(baroof.updatedAt));
	const {setFavoriteBaroof} = useLibraryContext();

	function onFavoriteChange(ev, value){
		setFavoriteBaroof(baroof, Boolean(value));
	}

	return (
		<Card>
			<CardActionArea disableRipple>
				<CardContent>
					<Box sx={{width: "90%", margin: "1em auto"}}>
						<Stack direction="row">
							<Typography component="span" variant="h5" sx={{
								fontWeight: "bold",
								flexGrow: 1,
								display: "flex",
								flexDirection: "row",
								alignItems: "center"
							}}>
								{baroof.title}
							</Typography>
							<CardActions disableSpacing pt={0} mt={0}>
								<Rating max={1} value={baroof.isFavorite ? 1 : 0} onChange={onFavoriteChange}>
								</Rating>
								<BaroofCardMenu baroof={baroof}/>
							</CardActions>
						</Stack>
						<Stack direction="row" sx={{backgroundColor: "#ddd", padding: "5px 3px"}}
							spacing={1} alignItems="center"
						>
							<Typography sx={{fontWeight: "bold", textAlign: "center"}}>
								0 plays
							</Typography>
							<Typography sx={{color: "#666", textAlign: "center"}}>
								Updated at {dateUpdated}
							</Typography>
							<Box component="div" flexGrow={1}>
							</Box>
							<Link to={`/user/editor/${baroof._id}`}>
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
						</Stack>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
