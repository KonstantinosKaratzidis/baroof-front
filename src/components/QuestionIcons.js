import SvgIcon from '@mui/material/SvgIcon';
import Box from '@mui/material/Box';

function Boxed({children, backgroundColor}){
	return (
		<Box sx={{
			padding: 1,
			backgroundColor,
			width: "36px",
			height: "36px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			borderRadius: "5px"
		}}>
			{children}
		</Box>
	)
}

export function Question1Icon({...props}){
	return (
		<Boxed backgroundColor="red" {...props}>
			<SvgIcon viewBox="0 0 100 100" htmlColor="white">
				<polygon points="50,0 100,100, 0,100" />
			</SvgIcon>
		</Boxed>
  );
}
export function Question2Icon({...props}){
	return (
		<Boxed backgroundColor="blue" {...props}>
			<SvgIcon viewBox="0 0 100 100" htmlColor="white">
				<polygon points="50,0 100,50 50,100 0,50" />
			</SvgIcon>
		</Boxed>
  );
}
export function Question3Icon({...props}){
	return (
		<Boxed backgroundColor="#d89e00" {...props}>
			<SvgIcon viewBox="0 0 100 100" htmlColor="white">
				<circle cx="50" cy="50" r="50" />
			</SvgIcon>
		</Boxed>
  );
}
export function Question4Icon({...props}){
	return (
		<Boxed backgroundColor="green" {...props}>
			<SvgIcon viewBox="0 0 100 100" htmlColor="white">
				<polygon points="0,0 100,0 100,100 0,100" />
			</SvgIcon>
		</Boxed>
  );
}

const icons = [
	Question1Icon,
	Question2Icon,
	Question3Icon,
	Question4Icon
];

export function getIconForIndex(index){
	if(index < 0 || index > 4)
		return null;
	return icons[index];
}
