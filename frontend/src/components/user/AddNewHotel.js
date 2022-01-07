import { useState } from 'react';
import MainDialog from 'components/shared/MainDialog';
import {
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grid,
	InputAdornment,
	TextField,
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

	const { title, content, location, image, price, from, to, bed } = values;

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

	const handleSubmit = e => {};

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
						<TextField
							name='bed'
							label='Number of Beds'
							type='number'
							maxRows={4}
							fullWidth
							value={bed}
							onChange={handleChange}
						/>
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
									setValues({ ...values, from: newValue });
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
									setValues({ ...values, to: newValue });
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
				<Button variant='contained' disableElevation>
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
