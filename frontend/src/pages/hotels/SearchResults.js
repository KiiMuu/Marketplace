import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import SingleHotel from 'components/cards/SingleHotel';
import { searchHotels } from 'state/hotel/hotelApi';
import {
	Box,
	Container,
	Grid,
	Typography,
	CircularProgress,
	Alert,
} from '@mui/material';

const SearchResults = () => {
	const dispatch = useDispatch();
	const { searchStatus, searchResult } = useSelector(state => state.hotel);

	useEffect(() => {
		const { location, date, bed } = queryString.parse(
			window.location.search
		);

		if (searchStatus === 'idle') {
			dispatch(
				searchHotels({
					location,
					date: date?.split(','),
					bed,
				})
			);
		}
	}, [dispatch, searchStatus]);

	return (
		<Container maxWidth='xl'>
			<Box sx={{ m: '100px 0' }}>
				<Typography gutterBottom variant='h5' fontWeight='bold'>
					Search Result
				</Typography>
				{searchStatus === 'loading' ? (
					<CircularProgress size={20} />
				) : searchResult.length === 0 ? (
					<Alert icon={false} severity='info'>
						No hotels matched your keywords!.
					</Alert>
				) : (
					<Grid container spacing={[2, 2]}>
						{searchResult.map(hotel => (
							<SingleHotel key={hotel._id} hotel={hotel} />
						))}
					</Grid>
				)}
			</Box>
		</Container>
	);
};

export default SearchResults;
