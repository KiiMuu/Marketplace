import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels } from 'state/hotel/hotelApi';
import SingleHotel from 'components/cards/SingleHotel';
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Booking = () => {
	const dispatch = useDispatch();
	const { status, errors, hotels } = useSelector(state => state.hotel);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchHotels());
		}
	}, [status, dispatch]);

	if (status === 'loading') return <p>loading</p>;
	if (status === 'failed') return JSON.stringify(errors);

	return (
		<Box sx={{ margin: '100px 0' }}>
			<Container maxWidth='lg'>
				<Typography gutterBottom variant='h5'>
					All Hotels
				</Typography>
				<Grid container spacing={[2, 2]}>
					{hotels.map(hotel => (
						<SingleHotel key={hotel._id} hotel={hotel} />
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default Booking;
