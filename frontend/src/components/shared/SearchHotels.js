import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Select,
	TextField,
	Grid,
	InputAdornment,
	FormControl,
	InputLabel,
	OutlinedInput,
	MenuItem,
	IconButton,
} from '@mui/material';
import { LocalizationProvider, DateRangePicker } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { AddLocationAlt, SearchOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';

const SearchHotels = () => {
	const [location, setLocation] = useState('');
	const [date, setDate] = useState([null, null]);
	const [bed, setBed] = useState('');

	const history = useHistory();

	const handleSubmit = () => {
		history.push(
			`/search-result?location=${location}&date=${date}&bed=${bed}`
		);
	};

	return (
		<Grid container spacing={[1]} alignItems='center'>
			<Grid item xs={12} sm={6} md={4}>
				<TextField
					name='location'
					label='Location'
					type='text'
					fullWidth
					variant='outlined'
					value={location}
					onChange={e => setLocation(e.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<AddLocationAlt fontSize='small' />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<LocalizationProvider dateAdapter={AdapterMoment}>
					<DateRangePicker
						startText='From'
						endText='To'
						value={date}
						disablePast
						onChange={newValue => {
							setDate(newValue);
						}}
						renderInput={(startProps, endProps) => (
							<>
								<TextField {...startProps} />
								<Box sx={{ mx: 1 }}> to </Box>
								<TextField {...endProps} />
							</>
						)}
					/>
				</LocalizationProvider>
			</Grid>
			<Grid item xs={12} sm={6} md={3}>
				<FormControl sx={{ width: '100%' }}>
					<InputLabel id='numberOfBeds'>Number of Beds</InputLabel>
					<Select
						labelId='numberOfBeds'
						id='numberOfBeds'
						placeholder='Number of Beds'
						fullWidth
						value={bed}
						onChange={e => setBed(e.target.value)}
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
			<Grid item xs={12} sm={6} md={1}>
				<IconButton size='large' onClick={handleSubmit}>
					<SearchOutlined />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default SearchHotels;
