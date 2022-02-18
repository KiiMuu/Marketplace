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
