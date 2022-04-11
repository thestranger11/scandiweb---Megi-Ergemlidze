import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { COLORS, FONTS } from '../helpers/constants';
import CartImage from '../assets/cart.png';
import {toggleBackdrop} from '../slices/backdropSlice';
import CartItem from './cartItem';
import { Button, withRouter } from '../helpers/utils';
import { Link } from 'react-router-dom';


class MiniCart extends Component {
	state = { visible: this.props.backdrop }; 
	toggleHandler = (isOpen) => {
		this.setState({visible: !isOpen});
		if(!isOpen && !this.props.backdrop){
			this.props.dispatch(toggleBackdrop(true));
		}else{
			this.props.dispatch(toggleBackdrop(false));
		}
	};
	render() {
		let total = 0;
		if(this.props.cartTotal.find(e=>e.currency.symbol === this.props.activeCurrency)){
			total = this.props.cartTotal.find(e=>e.currency.symbol === this.props.activeCurrency).amount.toFixed(2);
		}
		return (
			<ToggleContainer>
				<CartBtn onClick={()=>this.toggleHandler(this.state.visible && this.props.backdrop)}>
					<Icon src={CartImage} alt="cart" />
				</CartBtn>
				{this.state.visible && this.props.backdrop && (
					<Card>
						<ul>
							<CartTitle>
								<strong>My Bag</strong>
								{', '}
								{this.props.products.length}
								{' '}
								{this.props.products.length <= 1 ? 'item' : 'items'}
							</CartTitle>
							{this.props.products.length > 0 && this.props.products.map(item=>(
								<CartItem 
									key={item.id}
									item={item}
									clicked={()=>{
										this.props.router.navigate(item.url, true);
										this.toggleHandler(this.state.visible && this.props.backdrop);
									}}
								/>
							))}
						</ul>
						<CartFooter>
							<Total>
								<dt>total: </dt>
								<dd>
									{this.props.activeCurrency}
									{total}
								</dd>
							</Total>
							<BtnContainer>
								<Link to="/cart">
									<Button 
										size="small" 
										onClick={()=>this.toggleHandler(this.state.visible && this.props.backdrop)}
									>
										view bag
									</Button>
								</Link>
								<Link to="/checkout">
									<Button 
										primary 
										size="small" 
										onClick={()=>this.toggleHandler(this.state.visible && this.props.backdrop)}
									>
										check out
									</Button>
								</Link>
									
							</BtnContainer>
						</CartFooter>
					</Card>
				)}
			</ToggleContainer>
		);
	}
}
const mapStateToProps = (state) =>({
	products: state.cart.products,
	backdrop: state.backdrop.value,
	activeCurrency: state.currency.value,
	cartTotal: state.cart.total
});
export default withRouter(
	connect(
		mapStateToProps
	)(MiniCart)
);

const Card = styled.div`
	position: absolute;
	top: 50px;
	right: 0;
	background: ${COLORS.white};
	box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
	width: 325px;
	max-width: 100vw;
    padding: 0 0 20px;
    z-index: 11;
	text-align: left;
	ul {
		list-style-type: none;
		max-height: calc(100vh - 220px);
		overflow-y: auto;
		&:-webkit-scrollbar {
			margin-right: -20px;
		}
	}
`;
const CartTitle = styled.p`
	padding: 10px 15px 0;
`;
const Icon = styled.img`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0px 10px;
`;

const CartBtn = styled.button`
    background: ${COLORS.clear};
    border-width: 0;
    font-size: 1rem;
    line-height: 1.6em;
    color: ${COLORS.text};
`;
const ToggleContainer = styled.div`
    position: relative;
    margin-left: 10px;
`;

const BtnContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 35px;
`;
const CartFooter = styled.div`
	padding: 20px 15px;
`;
const Total = styled.dl`
	font-weight: 500;
	size: .888rem;
	line-height: 1.125em;
	color: ${COLORS.text};
	font-family: ${FONTS.secondary};
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	dd {
		font-family: ${FONTS.primary};
		line-height: 1.6em;
		font-weight: 700;
	}
`;