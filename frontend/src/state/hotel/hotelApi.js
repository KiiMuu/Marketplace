import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createHotel = createAsyncThunk(
	'hotels/createHotel',
	async ({ token, hotelData }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/hotel/create`,
				hotelData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			return data;
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const fetchHotels = createAsyncThunk(
	'hotels/fetchHotels',
	async rejectWithValue => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/hotel/all`,
				{}
			);

			return data;
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const fetchSellerHotels = createAsyncThunk(
	'hotels/fetchSellerHotels',
	async ({ token }, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/hotel/seller-hotels`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			return data;
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const deleteHotel = createAsyncThunk(
	'hotels/deleteHotel',
	async ({ token, hotelId }, { rejectWithValue }) => {
		try {
			const { data } = await axios.delete(
				`${process.env.REACT_APP_API}/hotel/${hotelId}/delete`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			return data;
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const getHotelById = createAsyncThunk(
	'hotels/getHotelById',
	async ({ hotelId }, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/hotel/${hotelId}`
			);

			return data;
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const updateHotel = createAsyncThunk(
	'hotels/updateHotel',
	async ({ token, hotelId, hotelData }, { rejectWithValue }) => {
		try {
			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/hotel/${hotelId}/update`,
				hotelData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			return data;
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const getUserBooking = createAsyncThunk(
	'hotels/getUserBooking',
	async ({ token }, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/hotel/user/bookings`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			return data;
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const isAlreadyBooked = createAsyncThunk(
	'hotels/isAlreadyBooked',
	async ({ token, hotelId }, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/hotel/isAlreadyBooked/${hotelId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			return data;
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const searchHotels = createAsyncThunk(
	'hotels/searchHotels',
	async (query, { rejectWithValue }) => {
		const { location, date, bed } = query;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/hotel/searchHotels`,
				{ location, date, bed }
			);

			return data;
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);
