import { createSlice } from '@reduxjs/toolkit';
import { createConnectAccount } from './stripeApi';

export const stripeSlice = createSlice({
	name: 'stripe',
	initialState: {
		status: 'idle',
		errors: [],
		data: {},
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
				state.data = action.payload;
			})
			.addCase(createConnectAccount.rejected, (state, action) => {
				state.status = 'failed';
				state.errors = action.payload;
			});
	},
});

export default stripeSlice.reducer;
