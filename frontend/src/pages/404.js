import { Box, Typography } from '@mui/material';

const NotFound = () => {
	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography variant='h4' fontWeight='bold'>
				Page does not exist.
			</Typography>
		</Box>
	);
};

export default NotFound;
