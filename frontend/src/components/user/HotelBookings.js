import { Alert, Grid } from '@mui/material';
import SingleHotel from 'components/cards/SingleHotel';

const HotelBookings = ({ userHotelBookings }) => {
	return userHotelBookings?.length === 0 ? (
		<Alert icon={false} severity='info'>
			Your bookings will be listed here.
		</Alert>
	) : (
		<Grid container spacing={[2, 2]}>
			{userHotelBookings?.map(order => (
				<SingleHotel
					key={order.hotel._id}
					hotel={order.hotel}
					session={order.session}
					orderedBy={order.orderedBy}
				/>
			))}
		</Grid>
	);
};

export default HotelBookings;
