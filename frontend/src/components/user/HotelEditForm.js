import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHotel } from 'state/hotel/hotelApi';
import {
	Button,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from '@mui/material';
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import { styled } from '@mui/system';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { AddLocationAlt, ImageOutlined } from '@mui/icons-material';

const Input = styled('input')({
	display: 'none',
});

const HotelEditForm = ({
	singleHotel,
	updateHotelStatus,
	setOpenSnack,
	match,
}) => {
	const [values, setValues] = useState({
		title: singleHotel.title,
		content: singleHotel.content,
		location: singleHotel.location,
		price: singleHotel.price,
		from: singleHotel.from,
		to: singleHotel.to,
		bed: singleHotel.bed,
	});
	const [image, setImage] = useState('');
	const [preview, setPreview] = useState(
		singleHotel?.image?.contentType
			? `${process.env.REACT_APP_API}/hotel/${singleHotel._id}/image`
			: 'https://via.placeholder.com/900x700.png?text=Preview'
	);

	const { title, content, location, price, from, to, bed } = values;

	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.user);
	const { errors } = useSelector(state => state.hotel);

	const handleChange = e => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handleImageChange = e => {
		setPreview(URL.createObjectURL(e.target.files[0]));
		setImage(e.target.files[0]);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		let hotelData = new FormData();
		image && hotelData.append('image', image);
		hotelData.append('title', title);
		hotelData.append('content', content);
		hotelData.append('price', price);
		hotelData.append('bed', bed);
		hotelData.append('location', location);
		hotelData.append('from', from);
		hotelData.append('to', to);

		try {
			await dispatch(
				updateHotel({
					token: userInfo?.token,
					hotelId: match.params.hotelId,
					hotelData,
				})
			).unwrap();

			setOpenSnack(true);
		} catch (err) {
			console.log(err);
			setOpenSnack(true);
		}
	};

	return (
		<Grid
			container
			spacing={[1, 1]}
			component='form'
			onSubmit={handleSubmit}
		>
			<Grid item xs={12} sm={6}>
				<TextField
					error={
						updateHotelStatus === 'failed' &&
						errors.find(e => e.param === 'title')
							? true
							: false
					}
					helperText={
						updateHotelStatus === 'failed' &&
						errors.map(e => (e.param === 'title' ? e.msg : null))
					}
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
					error={
						updateHotelStatus === 'failed' &&
						errors.find(e => e.param === 'content')
							? true
							: false
					}
					helperText={
						updateHotelStatus === 'failed' &&
						errors.map(e => (e.param === 'content' ? e.msg : null))
					}
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
					error={
						updateHotelStatus === 'failed' &&
						errors.find(e => e.param === 'price')
							? true
							: false
					}
					helperText={
						updateHotelStatus === 'failed' &&
						errors.map(e => (e.param === 'price' ? e.msg : null))
					}
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
					<InputLabel id='numberOfBeds'>Number of Beds</InputLabel>
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
			<Grid item xs={12}>
				<LoadingButton
					onClick={handleSubmit}
					variant='contained'
					disableElevation
					size='large'
					loading={updateHotelStatus === 'loading'}
				>
					Save
				</LoadingButton>
			</Grid>
		</Grid>
	);
};

export default HotelEditForm;
