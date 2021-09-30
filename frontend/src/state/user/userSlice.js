import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userInfo: {
			username: 'Karim',
		},
	},
	reducers: {
		changeUsername: state => {
			state.userInfo.username = 'Mo';
		},
	},
});

export const { changeUsername } = userSlice.actions;

export default userSlice.reducer;
