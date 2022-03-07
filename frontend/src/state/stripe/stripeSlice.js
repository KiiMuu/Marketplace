import { createSlice } from '@reduxjs/toolkit';
import {
	createConnectAccount,
	getAccountBalance,
	getSessionId,
	stripeSuccess,
} from './stripeApi';

export const stripeSlice = createSlice({
	name: 'stripe',
	initialState: {
		status: 'idle',
		errors: [],
		userBalance: 0,
		sessionId: null,
		isSuccess: false,
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
			.addCase(getSessionId.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getSessionId.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.errors = [];
				state.sessionId = action.payload.sessionId;
			})
			.addCase(getSessionId.rejected, (state, action) => {
				state.status = 'failed';
				state.errors = action.payload;
			})
			.addCase(stripeSuccess.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(stripeSuccess.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.errors = [];
				state.isSuccess = action.payload.isSuccess;
			})
			.addCase(stripeSuccess.rejected, (state, action) => {
				state.status = 'failed';
				state.errors = action.payload;
			});
	},
});

export default stripeSlice.reducer;
