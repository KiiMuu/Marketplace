import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerHotels, deleteHotel } from 'state/hotel/hotelApi';
import DashboardLayout from 'components/user/DashboardLayout';
import AddNewHotel from 'components/user/AddNewHotel';
import { createConnectAccount } from 'state/stripe/stripeApi';
import SingleHotel from 'components/cards/SingleHotel';
import {
	Alert,
	Button,
	CircularProgress,
	Grid,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { AddOutlined, HomeOutlined } from '@mui/icons-material';
import useSnackBar from 'hooks/useSnackbar';
import MySnackbar from 'components/shared/MySnackbar';

const DashboardSeller = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.user);
	const { status } = useSelector(state => state.stripe);
	const {
		status: hotelsStatus,
		hotels,
		alert,
		deletionStatus,
	} = useSelector(state => state.hotel);
	const {
		open: openSnack,
		setOpen: setOpenSnack,
		handleClose,
	} = useSnackBar();

	const handleClick = async () => {
		try {
			let res = await dispatch(
				createConnectAccount({ token: userInfo?.token })
			).unwrap();

			window.location.href = res; // login link!
		} catch (err) {
			console.log('error', err);
		}
	};

	const handleHotelDelete = useCallback(
		async hotelId => {
			if (!window.confirm('Are you sure?')) return;

			try {
				await dispatch(
					deleteHotel({ token: userInfo?.token, hotelId })
				).unwrap();

				setOpenSnack(true);
			} catch (err) {
				console.log('error', err);
				setOpenSnack(true);
			}
		},
		[dispatch, userInfo?.token, setOpenSnack]
	);

	useEffect(() => {
		if (hotelsStatus === 'idle') {
			dispatch(fetchSellerHotels({ token: userInfo?.token }));
		}
	}, [hotelsStatus, dispatch, userInfo?.token]);

	const connected = () => (
		<Grid container gap={1} justifyContent='space-between' flexWrap='wrap'>
			<Typography variant='h6' fontWeight='bold'>
				Your Hotels
			</Typography>
			<Button
				variant='contained'
				disableElevation
				size='small'
				startIcon={<AddOutlined fontSize='small' />}
				onClick={() => setOpen(true)}
			>
				Add New
			</Button>
			<AddNewHotel open={open} setOpen={setOpen} />
		</Grid>
	);

	const notConnected = () => (
		<Grid
			container
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			gap={1}
			flexWrap='wrap'
		>
			<HomeOutlined fontSize='large' />
			<Typography variant='h6' fontWeight='bold'>
				Setup payouts to post hotel rooms.
			</Typography>
			<Typography variant='subtitle1'>
				Mern partners with stripe to transfer earnings to your bank
				account.
			</Typography>
			<Button
				onClick={handleClick}
				variant='contained'
				disableElevation
				disabled={status === 'loading'}
			>
				{status === 'loading' ? 'Processing...' : 'Setup Payouts'}
			</Button>
			<Typography variant='caption'>
				You will be redirected to Stripe to complete the onboarding
				process.
			</Typography>
		</Grid>
	);

	return (
		<DashboardLayout>
			<MySnackbar
				open={openSnack}
				autoHideDuration={5000}
				handleClose={handleClose}
				isCustomized={true}
				severity={deletionStatus === 'succeeded' ? 'success' : 'error'}
				customizedMsg={alert}
			/>
			<Box sx={{ margin: '20px 0' }}>
				{userInfo?.stripe_seller?.charges_enabled
					? connected()
					: notConnected()}
			</Box>
			{hotelsStatus === 'loading' ? (
				<CircularProgress size={20} />
			) : hotels.length === 0 ? (
				<Alert icon={false} severity='info'>
					Your hotels will be listed here.
				</Alert>
			) : (
				<Grid container spacing={[0, 2]} sx={{ mb: '50px' }}>
					{hotels.map(hotel => (
						<SingleHotel
							key={hotel._id}
							hotel={hotel}
							showViewMoreButton={false}
							owner={true}
							handleHotelDelete={handleHotelDelete}
						/>
					))}
				</Grid>
			)}
		</DashboardLayout>
	);
};

export default DashboardSeller;
