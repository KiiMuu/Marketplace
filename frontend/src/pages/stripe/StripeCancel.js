import { Box, Container, Typography } from '@mui/material';

const StripeCancel = () => {
	return (
		<Container maxWidth='xl'>
			<Box sx={{ textAlign: 'center', marginTop: '100px' }}>
				<Typography variant='h6' fontWeight='bold'>
					Payment failed. Try again.
				</Typography>
			</Box>
		</Container>
	);
};

export default StripeCancel;
