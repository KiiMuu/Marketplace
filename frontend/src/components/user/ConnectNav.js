import { useSelector } from 'react-redux';
import moment from 'moment';
import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Grid,
} from '@mui/material';

const ConnectNav = () => {
	const { userInfo } = useSelector(state => state.user);

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
						Pending Balance
					</Grid>
					<Grid item xs={12} sm={6} lg={4}>
						Payout Settings
					</Grid>
				</>
			)}
		</Grid>
	);
};

export default ConnectNav;
