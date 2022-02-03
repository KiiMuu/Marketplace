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