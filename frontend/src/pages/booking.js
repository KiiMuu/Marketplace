import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels } from 'state/hotel/hotelApi';
import SingleHotel from 'components/cards/SingleHotel';
import {
	Alert,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';

const Booking = () => {
	const dispatch = useDispatch();
	const { status, hotels } = useSelector(state => state.hotel);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchHotels());
		}
	}, [status, dispatch]);

	return (
		<Box sx={{ margin: '100px 0' }}>
			<Container maxWidth='xl'>
				<Typography gutterBottom variant='h5'>
					All Hotels
				</Typography>
				{status === 'loading' ? (
					<CircularProgress size={20} />
				) : hotels.length === 0 ? (
					<Alert icon={false} severity='info'>
						No hotels created yet.
					</Alert>
				) : (
					<Grid container spacing={[2, 2]}>
						{hotels.map(hotel => (
							<SingleHotel key={hotel._id} hotel={hotel} />
						))}
					</Grid>
				)}
			</Container>
		</Box>
	);
};

export default Booking;
