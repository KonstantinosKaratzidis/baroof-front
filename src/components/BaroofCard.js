import Card from '@mui/material/Card';
import CardContent from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import format from 'date-format';

export default function BaroofCard({baroof, onFavoriteChange, onEdit, onPlay}){
	const dateUpdated = format("dd/MM/yy hh:mm", new Date(baroof.updatedAt));

	function onChange(ev, value){
		console.log(value)
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
								<Rating max={1} onChange={onFavoriteChange}>
								</Rating>
								<IconButton component="span">
									<MoreVertIcon />
								</IconButton>
							</CardActions>
						</Stack>
						<Stack direction="row" sx={{backgroundColor: "#ddd", padding: "5px 3px"}}
							spacing={1} alignItems="end"
						>
							<Typography sx={{fontWeight: "bold"}}>
								0 plays
							</Typography>
							<Typography sx={{color: "#666", flexGrow: 1}}>
								Updated at {dateUpdated}
							</Typography>
							<Button variant="contained" component="div" onClick={onEdit}>
								<Typography fontWeight="bold">
									Edit
								</Typography>
							</Button>
							<Button variant="contained" component="div" color="success"
								onClick={onPlay}
							>
								<Typography fontWeight="bold">
									Play
								</Typography>
							</Button>
						</Stack>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
