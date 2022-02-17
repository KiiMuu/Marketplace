import { createSlice } from '@reduxjs/toolkit';
import { createHotel, fetchHotels, fetchSellerHotels } from './hotelApi';

export const hotelSlice = createSlice({
	name: 'hotels',
	initialState: {
		hotels: [],
		status: 'idle',
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
			});
	},
});

export default hotelSlice.reducer;
