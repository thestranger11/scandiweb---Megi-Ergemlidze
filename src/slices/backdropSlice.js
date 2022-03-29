import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: false,
};

export const backdropSlice = createSlice({
	name: 'backdrop',
	initialState,
	reducers: {
		toggleBackdrop: (state, action) => {
			state.value = action.payload;
			if(typeof action.payload === 'undefined'){
				state.value = !state.value;
			}
		}
	},
});

export const { toggleBackdrop } = backdropSlice.actions;

export const selectBackdrop = (state) => state.backdrop.value;


export default backdropSlice.reducer;
