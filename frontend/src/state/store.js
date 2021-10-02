import { configureStore } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
import userReducer from './user/userSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch(typeof store.dispatch);
