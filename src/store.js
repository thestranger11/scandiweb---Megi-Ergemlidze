import { configureStore } from '@reduxjs/toolkit';
import backdropReducer from './slices/backdropSlice';
import currencyReducer from './slices/currencySlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
	reducer: {
		backdrop: backdropReducer,
		currency: currencyReducer,
		cart: cartReducer
	},
});
