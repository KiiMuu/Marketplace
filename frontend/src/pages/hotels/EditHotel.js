import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MySnackbar from 'components/shared/MySnackbar';
import HotelEditForm from 'components/user/HotelEditForm';
import useSnackBar from 'hooks/useSnackbar';
import { getHotelById } from 'state/hotel/hotelApi';
import { Typography, Container, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

const EditHotel = ({ match }) => {
	const dispatch = useDispatch();
	const { singleHotelStatus, singleHotel, updateHotelStatus, alert } =
		useSelector(state => state.hotel);

	const {
		open: openSnack,
		setOpen: setOpenSnack,
		handleClose,
	} = useSnackBar();

	useEffect(() => {
		dispatch(getHotelById({ hotelId: match.params.hotelId }));
	}, [dispatch, match]);

	return (
		<Container maxWidth='xl'>
			<MySnackbar
				open={openSnack}
				autoHideDuration={5000}
				handleClose={handleClose}
				isCustomized={true}
				severity={
					updateHotelStatus === 'succeeded' ? 'success' : 'error'
				}
				customizedMsg={alert}
			/>
			<Box sx={{ m: '100px 0' }}>
				<Typography gutterBottom variant='h6' fontWeight='bold'>
					Edit Hotel
				</Typography>
				{singleHotelStatus === 'loading' ? (
					<CircularProgress size={20} />
				) : (
					<HotelEditForm
						setOpenSnack={setOpenSnack}
						singleHotel={singleHotel}
						updateHotelStatus={updateHotelStatus}
						match={match}
					/>
				)}
			</Box>
		</Container>
	);
};

export default EditHotel;
