import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './userApi';

let userState;
if (window.localStorage.getItem('marketUser')) {
	userState = JSON.parse(window.localStorage.getItem('marketUser'));
} else {
	userState = null;
}

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		status: 'idle',
		errors: [],
		userInfo: userState,
	},
	reducers: {
		onLogout: state => {
			state.userInfo = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(registerUser.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.errors = [];
				state.userInfo = action.payload;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failed';
				state.errors = action.payload;
			})
			.addCase(loginUser.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.errors = [];
				state.userInfo = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.errors = action.payload;
			});
	},
});

export const { onLogout } = userSlice.actions;

export default userSlice.reducer;
