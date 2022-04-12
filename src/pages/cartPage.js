import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import {withRouter} from '../helpers/utils';
import {connect} from 'react-redux';
import Page from '../components/UI/page';
import { COLORS } from '../helpers/constants';
import CartItem from '../components/cartItem';

class CartPage extends Component {
	state = {  }; 
	render() { 
		return (
			<Page>
				<Title>cart</Title>
				{(!this.props.products || this.props.products.length === 0) 
					? 
					<h2>Cart is empty</h2>
					: 
					this.props.products.map(item=>(
						<Fragment key={item.id}>
							<Devider />
							<CartItem 
								item={item}
								clicked={()=>{
									this.props.router.navigate(item.url, true);
								}}
							/>
						</Fragment>
					))
				}
			</Page>
		);
	}
}
const mapStateToProps = (state) =>({
	products: state.cart.products,
	// backdrop: state.backdrop.value,
	// activeCurrency: state.currency.value,
	// cartTotal: state.cart.total
});
export default withRouter(
	connect(
		mapStateToProps
	)(CartPage)
);

const Title = styled.h1`
    text-align: left;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.777rem;
    line-height: 1.25em;
    color: ${COLORS.text};
    margin-bottom: 60px;
`;
const Devider = styled.div`
    height: 1px;
    width: 100%;
    background: ${COLORS.devider};
    margin: 20px 0;
`;