import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createConnectAccount = createAsyncThunk(
	'stripe/createConnectAccount',
	async (stripeData, { rejectWithValue }) => {
		const { token } = stripeData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/stripe/createConnectAccount`,
				{},
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

export const getAccountStatus = createAsyncThunk(
	'stripe/getAccountStatus',
	async (stripeData, { rejectWithValue }) => {
		const { token } = stripeData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/stripe/getAccountStatus`,
				{},
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
