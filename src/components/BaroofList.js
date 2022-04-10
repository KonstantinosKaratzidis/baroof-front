import Stack from '@mui/material/Stack';
import BaroofCard from './BaroofCard';

export default function BaroofList({baroofs}){
	return (
		<Stack direction="column" spacing={2}>
			{baroofs.map(baroof => (
				<BaroofCard baroof={baroof} key={baroof._id} />
			))}
		</Stack>
	)
}
