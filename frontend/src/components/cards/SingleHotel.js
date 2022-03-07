import { useHistory } from 'react-router';
import { spaceBetweenCentering } from 'theme/mixins';
import { splitString } from 'utils/splitString';
import { getDiffDate } from 'utils/DifferenceDate';
import { currencyFormatter } from 'utils/currencyFormatter';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { LocationOn, DateRange, Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ModalInfo from 'components/shared/ModalInfo';

const SingleHotel = ({
	hotel,
	handleHotelDelete = f => f,
	owner = false,
	showViewMoreButton = true,
	session,
	orderedBy,
}) => {
	const history = useHistory();

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Card variant='outlined'>
				<CardMedia
					component='img'
					alt={hotel.title}
					height='200'
					image={
						hotel?.image?.contentType
							? `${process.env.REACT_APP_API}/hotel/${hotel._id}/image`
							: 'https://via.placeholder.com/900x700.png?text=Preview'
					}
				/>
				<CardContent>
					<Box sx={spaceBetweenCentering}>
						<Typography gutterBottom variant='h5' component='div'>
							{hotel.title}
						</Typography>
						<Chip
							label={currencyFormatter({
								currency: 'usd',
								amount: hotel.price * 100,
							})}
							variant='outlined'
							size='small'
							color='primary'
						/>
					</Box>
					<Box sx={spaceBetweenCentering}>
						<Chip
							label={hotel.location}
							variant='outlined'
							size='small'
							color='primary'
							icon={<LocationOn sx={{ fontSize: 17 }} />}
						/>
						{getDiffDate(hotel.from, hotel.to) !== 0 && (
							<Chip
								label={`for ${getDiffDate(
									hotel.from,
									hotel.to
								)} ${
									getDiffDate(hotel.from, hotel.to) <= 1
										? 'day'
										: 'days'
								}`}
								variant='outlined'
								size='small'
								color='primary'
								icon={<DateRange sx={{ fontSize: 17 }} />}
							/>
						)}
					</Box>
					<Typography
						sx={{ m: '10px 0' }}
						variant='body2'
						color='text.secondary'
					>
						{splitString(hotel.content)}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{hotel.bed} bed
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						Availabe from{' '}
						{new Date(hotel.from).toLocaleDateString()}
					</Typography>
				</CardContent>
				<CardActions sx={spaceBetweenCentering}>
					{showViewMoreButton && (
						<Box sx={spaceBetweenCentering}>
							<Button
								variant='outlined'
								size='small'
								onClick={() =>
									history.push(`hotel/${hotel._id}`)
								}
							>
								Learn More
							</Button>
							{session && (
								<ModalInfo
									session={session}
									orderedBy={orderedBy}
								/>
							)}
						</Box>
					)}
					{owner && (
						<Box>
							<IconButton
								color='secondary'
								size='small'
								aria-label='edit hotel'
								title='Edit hotel'
								component={Link}
								to={`/hotel/edit/${hotel._id}`}
							>
								<Edit sx={{ fontSize: 17 }} />
							</IconButton>
							<IconButton
								color='error'
								size='small'
								aria-label='delete hotel'
								title='Delete hotel'
								onClick={() => handleHotelDelete(hotel._id)}
							>
								<Delete sx={{ fontSize: 17 }} />
							</IconButton>
						</Box>
					)}
				</CardActions>
			</Card>
		</Grid>
	);
};

export default SingleHotel;
