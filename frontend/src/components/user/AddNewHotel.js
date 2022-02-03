import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainDialog from 'components/shared/MainDialog';
import { createHotel } from 'state/hotel/hotelApi';
import {
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grid,
	InputAdornment,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	OutlinedInput,
} from '@mui/material';
import { styled } from '@mui/system';
import { AddLocationAlt, ImageOutlined } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';

const Input = styled('input')({
	display: 'none',
});

const AddNewHotel = ({ open, setOpen }) => {
	const [values, setValues] = useState({
		title: '',
		content: '',
		location: '',
		image: '',
		price: '',
		from: '',
		to: '',
		bed: '',
	});
	const [preview, setPreview] = useState(
		'https://via.placeholder.com/100x100.png?text=Preview'
	);

	const { title, content, location, price, image, from, to, bed } = values;

	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.user);
	const { status, error, alert } = useSelector(state => state.hotel);

	const handleChange = e => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handleImageChange = e => {
		setValues({ ...values, image: e.target.files[0] });
		setPreview(URL.createObjectURL(e.target.files[0]));
	};

	const handleSubmit = async e => {
		e.preventDefault();

		let hotelData = new FormData();
		image && hotelData.append('image', image);
		hotelData.append('hotelData', values);

		try {
			const hotel = await dispatch(
				createHotel({ token: userInfo?.token, hotelData })
			).unwrap();

			console.log({ hotel, status, error, alert });
		} catch (err) {
			console.log('error', err);
		}
	};

	const hotelForm = () => (
		<>
			<DialogContent>
				<DialogContentText sx={{ marginBottom: '20px' }}>
					Hotel will be added to your dashboard.
				</DialogContentText>
				<Grid
					container
					spacing={[1, 1]}
					component='form'
					onSubmit={handleSubmit}
				>
					<Grid item xs={12} sm={6}>
						<TextField
							name='title'
							label='Title'
							type='text'
							fullWidth
							variant='outlined'
							value={title}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							name='content'
							label='Content'
							multiline
							minRows={1}
							maxRows={1}
							fullWidth
							value={content}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							name='price'
							label='Price'
							type='number'
							maxRows={4}
							fullWidth
							value={price}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl sx={{ width: '100%' }}>
							<InputLabel id='numberOfBeds'>
								Number of Beds
							</InputLabel>
							<Select
								labelId='numberOfBeds'
								id='numberOfBeds'
								placeholder='Number of Beds'
								fullWidth
								value={bed}
								onChange={e =>
									setValues({
										...values,
										bed: e.target.value,
									})
								}
								input={<OutlinedInput label='Number of Beds' />}
							>
								<MenuItem key={1} value={1}>
									1
								</MenuItem>
								<MenuItem key={2} value={2}>
									2
								</MenuItem>
								<MenuItem key={3} value={3}>
									3
								</MenuItem>
								<MenuItem key={4} value={4}>
									4
								</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							name='location'
							label='Location'
							type='text'
							fullWidth
							variant='outlined'
							value={location}
							onChange={handleChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<AddLocationAlt fontSize='small' />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<DatePicker
								label='From'
								value={from}
								disablePast
								onChange={newValue => {
									setValues({
										...values,
										from: newValue._d,
									});
								}}
								renderInput={params => (
									<TextField {...params} fullWidth />
								)}
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={12}>
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<DatePicker
								label='To'
								value={to}
								disablePast
								onChange={newValue => {
									setValues({ ...values, to: newValue._d });
								}}
								renderInput={params => (
									<TextField {...params} fullWidth />
								)}
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={12} sm={6}>
						<label htmlFor='hotel-image'>
							<Input
								accept='image/*'
								id='hotel-image'
								name='hotel-image'
								type='file'
								onChange={handleImageChange}
							/>
							<Button
								fullWidth
								size='large'
								variant='contained'
								component='span'
								startIcon={<ImageOutlined />}
							>
								Image
							</Button>
						</label>
					</Grid>
					<Grid item xs={12} sm={6}>
						<img
							src={preview}
							width={100}
							height={100}
							style={{ objectFit: 'cover' }}
							alt='Preview'
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => setOpen(false)}
					variant='outlined'
					disableElevation
				>
					Close
				</Button>
				<Button
					onClick={handleSubmit}
					variant='contained'
					disableElevation
				>
					Save
				</Button>
			</DialogActions>
		</>
	);

	return (
		<MainDialog
			open={open}
			setOpen={setOpen}
			maxWidth='md'
			dialogTitle='Add a new hotel'
		>
			{hotelForm()}
		</MainDialog>
	);
};

export default AddNewHotel;
