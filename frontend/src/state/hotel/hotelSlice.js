import { createSlice } from '@reduxjs/toolkit';
import {
	createHotel,
	fetchHotels,
	fetchSellerHotels,
	deleteHotel,
	getHotelById,
	updateHotel,
	getUserBooking,
	isAlreadyBooked,
} from './hotelApi';

export const hotelSlice = createSlice({
	name: 'hotels',
	initialState: {
		hotels: [],
		status: 'idle',
		singleHotelStatus: 'idle',
		singleHotel: {},
		deletionStatus: 'idle',
		updateHotelStatus: 'idle',
		errors: [],
		alert: '',
		userBookingsStatus: 'idle',
		userHotelBookings: [],
		isBooked: false,
	},
	reducers: {
		// synchronous requests made to the store are handled HERE!
	},
	extraReducers(builder) {
		// asynchronous requests made to the store are handled HERE!
		builder
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
				// state.errors = action.payload;
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
				// state.errors = action.payload;
			})
			.addCase(createHotel.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(createHotel.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.alert = 'Hotel created successfully';
				state.hotels = [action.payload, ...state.hotels];
			})
			.addCase(createHotel.rejected, (state, action) => {
				state.status = 'failed';
				state.alert = 'Failed to create hotel';
				state.errors = action.payload;
			})
			.addCase(getHotelById.pending, (state, action) => {
				state.singleHotelStatus = 'loading';
			})
			.addCase(getHotelById.fulfilled, (state, action) => {
				state.singleHotelStatus = 'succeeded';
				state.alert = 'Hotel fetched successfully';
				state.singleHotel = action.payload;
			})
			.addCase(getHotelById.rejected, (state, action) => {
				state.status = 'failed';
				state.alert = 'Failed to fetch hotel';
				// state.errors = action.payload;
			})
			.addCase(updateHotel.pending, (state, action) => {
				state.updateHotelStatus = 'loading';
			})
			.addCase(updateHotel.fulfilled, (state, action) => {
				state.updateHotelStatus = 'succeeded';
				state.alert = 'Hotel updated successfully';
				state.singleHotel = action.payload;
			})
			.addCase(updateHotel.rejected, (state, action) => {
				state.updateHotelStatus = 'failed';
				state.alert = 'Failed to update hotel';
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
				// state.errors = action.payload;
			})
			.addCase(getUserBooking.pending, (state, action) => {
				state.userBookingsStatus = 'loading';
			})
			.addCase(getUserBooking.fulfilled, (state, action) => {
				state.userBookingsStatus = 'succeeded';
				state.userHotelBookings = action.payload;
			})
			.addCase(getUserBooking.rejected, (state, action) => {
				state.userBookingsStatus = 'failed';
				state.alert = 'Failed to fetch your hotel bookings';
			})
			.addCase(isAlreadyBooked.fulfilled, (state, action) => {
				state.isBooked = action.payload.isBooked;
			});
	},
});

export default hotelSlice.reducer;
