import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: '',
};

export const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		changeActiveCurrency: (state, action) => {
			state.value = action.payload;
		}
	},
});

export const { changeActiveCurrency } = currencySlice.actions;

export default currencySlice.reducer;
