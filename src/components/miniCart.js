import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { COLORS } from '../helpers/constants';
import CartImage from '../assets/cart.png';
// import Loader from './UI/loader';
// import { changeActiveCurrency } from '../slices/currencySlice';
import {toggleBackdrop} from '../slices/backdropSlice';


class MiniCart extends Component {
	state = { visible: false }; 
	toggleHandler = (isOpen) => {
		this.setState({visible: !isOpen});
		if(!isOpen && !this.props.backdrop){
			this.props.dispatch(toggleBackdrop(true));
		}else{
			this.props.dispatch(toggleBackdrop(false));
		}
	};
	render() {
		return (
			<ToggleContainer 
				tabIndex='0' 
				onBlur={()=>this.toggleHandler(true)}
			>
				<Button onClick={()=>this.toggleHandler(this.state.visible)}>
					<Icon src={CartImage} alt="cart" />
				</Button>
				{this.state.visible && (
					<Card>
						{this.props.products.length > 0 ?
							<ul>
								{/* {this.state.currencies.map(item=>( */}
								<li>
									{/* <button onMouseDown={()=>this.activeCurrencyChangeHandler(item.symbol)}>
											{item.symbol+' '+item.label}
										</button> */}
								</li>
								{/* ))} */}
							</ul>
							:
							<p>Your cart is empty</p>    }
					</Card>
				)}
			</ToggleContainer>
		);
	}
}
const mapStateToProps = (state) =>({
	products: state.cart.products,
	backdrop: state.backdrop.value
});
export default connect(
	mapStateToProps
)(MiniCart);

const Card = styled.div`
	position: absolute;
	top: 50px;
	right: 0;
	background: ${COLORS.white};
	box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
	min-width: 115px;
    padding: 10px 15px 20px;
    z-index: 11;
	ul {
		list-style-type: none;
        li {
            padding: 0;
            button {
                padding: 10px 20px;
                display: block;
                width: 100%;
                height: 100%;
                background: ${COLORS.clear};
                border-width: 0;
                margin: 0;
                text-align: left;
                background: yellow;
            }
        }
	}
`;
const Icon = styled.img`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0px 10px;
`;

const Button = styled.button`
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