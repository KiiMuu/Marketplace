import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stripeSuccess } from 'state/stripe/stripeApi';
import { useParams, useHistory } from 'react-router-dom';
import { Box, CircularProgress, Container } from '@mui/material';

const StripeSuccess = () => {
	const { hotelId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.user);

	useEffect(() => {
		let isSuccess = dispatch(
			stripeSuccess({ token: userInfo.token, hotelId })
		).unwrap();

		if (isSuccess) {
			history.push('/user/dashboard');
		} else {
			history.push('/stripe/cancel');
		}
	}, [dispatch, userInfo.token, hotelId, history]);

	return (
		<Container maxWidth='xl'>
			<Box sx={{ textAlign: 'center', marginTop: '100px' }}>
				<CircularProgress size={28} thickness={5} />
			</Box>
		</Container>
	);
};

export default StripeSuccess;
