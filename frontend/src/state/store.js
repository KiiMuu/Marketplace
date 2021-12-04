import { configureStore } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
import userReducer from './user/userSlice';
import stripeReducer from './stripe/stripeSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		stripe: stripeReducer,
	},
});

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch(typeof store.dispatch);
