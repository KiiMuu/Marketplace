import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from 'components/user/DashboardLayout';
import AddNewHotel from 'components/user/AddNewHotel';
import { createConnectAccount } from 'state/stripe/stripeApi';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AddOutlined, HomeOutlined } from '@mui/icons-material';

const DashboardSeller = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.user);
	const { status, errors, data } = useSelector(state => state.stripe);

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

	console.log({ status, errors, data });

	const connected = () => (
		<Grid
			container
			spacing={[0, 2]}
			gap={1}
			justifyContent='space-between'
			flexWrap='wrap'
		>
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
			<Box sx={{ marginTop: '20px' }}>
				{userInfo?.stripe_seller?.charges_enabled
					? connected()
					: notConnected()}
			</Box>
		</DashboardLayout>
	);
};

export default DashboardSeller;
