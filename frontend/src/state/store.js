import { configureStore } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
import userReducer from './user/userSlice';
import stripeReducer from './stripe/stripeSlice';
import hotelReducer from './hotel/hotelSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		stripe: stripeReducer,
		hotel: hotelReducer,
	},
});

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch(typeof store.dispatch);
