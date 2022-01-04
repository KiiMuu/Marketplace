import { createSlice } from '@reduxjs/toolkit';
import {
	createConnectAccount,
	getAccountBalance,
	payoutSetting,
} from './stripeApi';

export const stripeSlice = createSlice({
	name: 'stripe',
	initialState: {
		status: 'idle',
		errors: [],
		userBalance: 0,
	},
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(createConnectAccount.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(createConnectAccount.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.errors = [];
			})
			.addCase(createConnectAccount.rejected, (state, action) => {
				state.status = 'failed';
				state.errors = action.payload;
			})
			.addCase(getAccountBalance.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getAccountBalance.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.errors = [];
				state.userBalance = action.payload;
			})
			.addCase(getAccountBalance.rejected, (state, action) => {
				state.status = 'failed';
				state.errors = action.payload;
			})
			.addCase(payoutSetting.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(payoutSetting.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.errors = [];
			})
			.addCase(payoutSetting.rejected, (state, action) => {
				state.status = 'failed';
				state.errors = action.payload;
			});
	},
});

export default stripeSlice.reducer;
