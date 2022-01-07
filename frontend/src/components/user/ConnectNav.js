import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAccountBalance, payoutSetting } from 'state/stripe/stripeApi';
import { currencyFormatter } from 'utils/currencyFormatter';
import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Grid,
	IconButton,
	CircularProgress,
} from '@mui/material';
import { MoneyOffCsredOutlined, Settings } from '@mui/icons-material';

const ConnectNav = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.user);
	const { status, userBalance } = useSelector(state => state.stripe);

	useEffect(() => {
		dispatch(getAccountBalance({ token: userInfo?.token }));
	}, [dispatch, userInfo?.token]);

	const handlePayoutSettings = async () => {
		try {
			let res = await dispatch(
				payoutSetting({ token: userInfo?.token })
			).unwrap();

			window.location.href = res.url; // login link!
		} catch (error) {
			alert('Unable to access settings!');
		}
	};

	return (
		<Grid container spacing={[0, 2]}>
			<Grid item xs={12} sm={6} lg={4}>
				<ListItem disableGutters>
					<ListItemAvatar>
						<Avatar>{userInfo.name[0]}</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={userInfo.name}
						secondary={`Joined ${moment(
							userInfo.createdAt
						).fromNow()}`}
					/>
				</ListItem>
			</Grid>
			{userInfo?.stripe_seller?.charges_enabled && (
				<>
					<Grid item xs={12} sm={6} lg={4}>
						{status === 'loading' ? (
							<CircularProgress size={20} color='secondary' />
						) : (
							<ListItem disableGutters>
								<ListItemAvatar>
									<Avatar>
										<MoneyOffCsredOutlined />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary='Available'
									secondary={userBalance?.pending?.map(
										(b, i) => (
											<span key={i}>
												{currencyFormatter(b)}
											</span>
										)
									)}
								/>
							</ListItem>
						)}
					</Grid>
					<Grid item xs={12} sm={6} lg={4}>
						<ListItem disableGutters onClick={handlePayoutSettings}>
							<ListItemAvatar>
								<Avatar>
									<IconButton>
										<Settings sx={{ color: '#fff' }} />
									</IconButton>
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary='Payouts'
								secondary='Settings'
							/>
						</ListItem>
					</Grid>
				</>
			)}
		</Grid>
	);
};

export default ConnectNav;
