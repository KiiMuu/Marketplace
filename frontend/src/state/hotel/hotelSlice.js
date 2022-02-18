import { createSlice } from '@reduxjs/toolkit';
import {
	createHotel,
	fetchHotels,
	fetchSellerHotels,
	deleteHotel,
} from './hotelApi';

export const hotelSlice = createSlice({
	name: 'hotels',
	initialState: {
		hotels: [],
		status: 'idle',
		deletionStatus: 'idle',
		errors: [],
		alert: '',
	},
	reducers: {
		// synchronous requests made to the store are handled HERE!
	},
	extraReducers(builder) {
		// asynchronous requests made to the store are handled HERE!
		builder
			.addCase(createHotel.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(createHotel.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.alert = 'Hotel created successfully';
				state.hotels = state.hotels.concat(action.payload);
			})
			.addCase(createHotel.rejected, (state, action) => {
				state.status = 'failed';
				state.alert = 'Failed to create hotel';
				state.errors = action.payload;
			})
			.addCase(fetchHotels.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchHotels.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.alert = 'Hotels loaded successfully';
				state.hotels = action.payload;
			})
			.addCase(fetchHotels.rejected, (state, action) => {
				state.status = 'failed';
				state.alert = 'Failed to load hotels';
				state.errors = action.payload;
			})
			.addCase(fetchSellerHotels.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchSellerHotels.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.alert = 'Hotels loaded successfully';
				state.hotels = action.payload;
			})
			.addCase(fetchSellerHotels.rejected, (state, action) => {
				state.status = 'failed';
				state.alert = 'Failed to load hotels';
				state.errors = action.payload;
			})
			.addCase(deleteHotel.pending, (state, action) => {
				state.deletionStatus = 'loading';
			})
			.addCase(deleteHotel.fulfilled, (state, action) => {
				state.deletionStatus = 'succeeded';
				state.alert = 'Hotel deleted successfully';
				state.hotels = state.hotels.filter(
					hotel => hotel._id !== action.payload._id
				);
			})
			.addCase(deleteHotel.rejected, (state, action) => {
				state.deletionStatus = 'failed';
				state.alert = 'Failed to delete this hotel';
				state.errors = action.payload;
			});
	},
});

export default hotelSlice.reducer;
