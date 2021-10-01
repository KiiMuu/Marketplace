import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
	'user/register',
	async (userData, { rejectWithValue }) => {
		const { name, email, password } = userData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/user/register`,
				{
					name,
					email,
					password,
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

export const loginUser = createAsyncThunk(
	'user/login',
	async (userData, { rejectWithValue }) => {
		const { email, password } = userData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/user/login`,
				{
					email,
					password,
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
