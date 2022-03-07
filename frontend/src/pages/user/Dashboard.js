import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserBooking } from 'state/hotel/hotelApi';
import DashboardLayout from 'components/user/DashboardLayout';
import HotelBookings from 'components/user/HotelBookings';
import {
	Alert,
	Button,
	CircularProgress,
	Grid,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';

const Dashboard = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.user);
	const { userBookingsStatus, alert, userHotelBookings } = useSelector(
		state => state.hotel
	);

	useEffect(() => {
		dispatch(getUserBooking({ token: userInfo.token }));
	}, [dispatch, userInfo.token]);

	return (
		<DashboardLayout>
			<Box sx={{ marginTop: '20px' }}>
				<Grid
					container
					gap={1}
					justifyContent='space-between'
					flexWrap='wrap'
				>
					<Typography variant='h6' fontWeight='bold'>
						Your Booking
					</Typography>
					<Button variant='contained' disableElevation size='small'>
						<Link
							to='/'
							style={{ color: 'inherit', textDecoration: 'none' }}
						>
							Browse Hotels
						</Link>
					</Button>
				</Grid>
			</Box>
			<Box sx={{ m: '30px 0' }}>
				{userBookingsStatus === 'loading' ? (
					<CircularProgress size={20} />
				) : userBookingsStatus === 'rejected' ? (
					<Alert icon={false} severity='error'>
						{alert}
					</Alert>
				) : (
					<HotelBookings userHotelBookings={userHotelBookings} />
				)}
			</Box>
		</DashboardLayout>
	);
};

export default Dashboard;
