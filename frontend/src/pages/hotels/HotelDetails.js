import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { loadStripe } from '@stripe/stripe-js';
import { getHotelById } from 'state/hotel/hotelApi';
import { getSessionId } from 'state/stripe/stripeApi';
import { getDiffDate } from 'utils/DifferenceDate';
import { currencyFormatter } from 'utils/currencyFormatter';
import { spaceBetweenCentering } from 'theme/mixins';
import {
	Typography,
	Container,
	CircularProgress,
	Grid,
	CardMedia,
	Chip,
	CardContent,
} from '@mui/material';
import { Box } from '@mui/system';
import { DateRange, LocationOn } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

const HotelDetails = ({ match, history }) => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.user);
	const { singleHotelStatus, singleHotel, alert } = useSelector(
		state => state.hotel
	);
	const { status } = useSelector(state => state.stripe);

	useEffect(() => {
		dispatch(getHotelById({ hotelId: match.params.hotelId }));
	}, [dispatch, match]);

	const handleClick = async e => {
		e.preventDefault();

		if (!userInfo?.token) history.push('/login');

		let res = await dispatch(
			getSessionId({
				token: userInfo.token,
				hotelId: match.params.hotelId,
			})
		).unwrap();

		const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);

		stripe
			.redirectToCheckout({
				sessionId: res.sessionId,
			})
			.then(result => console.log({ result }));
	};

	return (
		<Container maxWidth='xl'>
			<Box sx={{ m: '100px 0' }}>
				{singleHotelStatus === 'loading' ? (
					<CircularProgress size={20} />
				) : singleHotelStatus === 'rejected' ? (
					<Typography>{alert}</Typography>
				) : (
					<Grid container spacing={[0, 2]}>
						<Grid item xs={12} md={6}>
							<CardMedia
								component='img'
								alt={singleHotel.title}
								height='auto'
								image={
									singleHotel?.image?.contentType
										? `${process.env.REACT_APP_API}/hotel/${singleHotel._id}/image`
										: 'https://via.placeholder.com/900x700.png?text=Preview'
								}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<CardContent>
								<Box sx={spaceBetweenCentering}>
									<Typography
										gutterBottom
										variant='h5'
										component='div'
									>
										{singleHotel.title}
									</Typography>
									<Chip
										label={currencyFormatter({
											currency: 'usd',
											amount: singleHotel.price,
										})}
										variant='outlined'
										size='small'
										color='primary'
									/>
								</Box>
								<Box sx={spaceBetweenCentering}>
									<Chip
										label={singleHotel.location}
										variant='outlined'
										size='small'
										color='primary'
										icon={
											<LocationOn sx={{ fontSize: 17 }} />
										}
									/>
									{getDiffDate(
										singleHotel.from,
										singleHotel.to
									) !== 0 && (
										<Chip
											label={`for ${getDiffDate(
												singleHotel.from,
												singleHotel.to
											)} ${
												getDiffDate(
													singleHotel.from,
													singleHotel.to
												) <= 1
													? 'day'
													: 'days'
											}`}
											variant='outlined'
											size='small'
											color='primary'
											icon={
												<DateRange
													sx={{ fontSize: 17 }}
												/>
											}
										/>
									)}
								</Box>
								<Typography
									sx={{ m: '10px 0' }}
									variant='body2'
									color='text.secondary'
								>
									{singleHotel.content}
								</Typography>
								<Typography
									gutterBottom
									variant='body2'
									color='text.secondary'
								>
									{singleHotel.bed} bed
								</Typography>
								<Typography
									variant='body2'
									color='text.secondary'
									gutterBottom
								>
									Availabe from{' '}
									{new Date(
										singleHotel.from
									).toLocaleDateString()}
								</Typography>
								<Typography
									variant='body2'
									color='text.secondary'
									gutterBottom
								>
									<b>
										<u>From</u>
									</b>{' '}
									{moment(new Date(singleHotel.from)).format(
										'MMMM Do YYYY, h:mm:ss a'
									)}
								</Typography>
								<Typography
									gutterBottom
									variant='body2'
									color='text.secondary'
								>
									<b>
										<u>To</u>
									</b>{' '}
									{moment(new Date(singleHotel.to)).format(
										'MMMM Do YYYY, h:mm:ss a'
									)}
								</Typography>
								<Typography gutterBottom>
									<i>
										Created by {singleHotel.createdBy?.name}
									</i>
								</Typography>
								<LoadingButton
									onClick={handleClick}
									variant='contained'
									disableElevation
									size='large'
									sx={{ mt: '25px' }}
									loading={status === 'loading'}
								>
									{userInfo?.token
										? 'Book Now'
										: 'Login to Book'}
								</LoadingButton>
							</CardContent>
						</Grid>
					</Grid>
				)}
			</Box>
		</Container>
	);
};

export default HotelDetails;
