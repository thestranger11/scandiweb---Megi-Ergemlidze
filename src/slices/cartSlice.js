import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: [],
	total: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct: (state, action) => {
			let products = [...state.products];
			const match = products.find(e=>e.id === action.payload.id);
			if(match){
				products = products.map(item => {
					if(item.id === action.payload.id){
						return {
							...item,
							count: products.find(item => item.id === action.payload.id).count+1
						};
					}
					return {...item};
				});
			}else{
				products = [
					...state.products,
					action.payload
				];
			}
			// updates cart products
			state.products = [...products];
			// updates cart total
			state.total = action.payload.prices.map(item=>{
				const currentTotal = state.total.find(e=>e.currency.symbol === item.currency.symbol);
				return{
					...item,
					amount: currentTotal ? item.amount + currentTotal.amount : item.amount
				};
			});
		},
		removeProduct: (state, action) => {
			let products = state.products;
			const match = products.find(e => e.id === action.payload.id);
			if(match && match.count > 1){
				products.find(e => e.id === action.payload.id).count--;
			}else{
				products = products.filter(e => e.id !== action.payload.id);
			}
			// updates cart products
			state.products = [...products];
			// updates cart total
			state.total = action.payload.prices.map(item=>{
				const currentTotal = state.total.find(e=>e.currency.symbol === item.currency.symbol);
				return{
					...item,
					amount: currentTotal ? currentTotal.amount - item.amount : 0
				};
			});
		}
	},
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
