import React, {Component} from 'react';
import Header from './components/header';
import { Routes, Route } from 'react-router-dom';
import CategoryPage from './pages/categoryPage';
import NotFoundPage from './pages/notFoundPage';
import ProductPage from './pages/productPage';
import CartPage from './pages/cartPage';


class App extends Component {
	state = {  }; 
	render() { 
		return (
			<div className="App">
				<Header />
				<Routes>
					<Route 
						path="*" 
						element={<NotFoundPage />} 
					/>
					<Route
						path='/' 
						element={<CategoryPage />}
					/>
					<Route
						path="/cart"
						element={<CartPage />}
					/>
					<Route
						path="/shop"
						element={<CategoryPage category="all" />}
					/>
					<Route
						path="/shop/:name"
						element={<CategoryPage />}
					/>
					<Route
						path="/shop/:name/:id"
						element={<ProductPage />}
					/>
				</Routes>

			</div>
		);
	}
}
 
export default App;
