import React, { Component } from 'react';
import styled from 'styled-components';
import { COLORS } from '../helpers/constants';
import Cart from '../assets/cart.svg';
import {Link} from 'react-router-dom';

class Product extends Component {
	render() { 
		return (
			<Container passive={!this.props.inStock} >
				<ImageContainer 
					to={this.props.inStock ? this.props.url : '#'} 
					role="link" 
					aria-disabled={!this.props.inStock}
					passive={!this.props.inStock ? 'true' : 'false'}
				>
					{!this.props.inStock && (
						<OutOfStockLayer>
						out of stock
						</OutOfStockLayer>
					)}
					<Image src={this.props.image} alt={this.props.title} />
					
				</ImageContainer>
				<Info>
					{this.props.inStock && (
						<AddToCartButton className='flexOnHover' onClick={()=>console.log('add to cart')}>
							<img src={Cart} alt="add to cart" />
						</AddToCartButton>
					)}
					<TitleLink
						to={this.props.inStock ? '/' : '#'} 
						role="link" 
						aria-disabled={!this.props.inStock}
						passive={!this.props.inStock ? 'true' : 'false'}
					>
						<Title passive={!this.props.inStock}>{this.props.title}</Title>
					</TitleLink>
					{this.props.price && 
						<Price passive={!this.props.inStock}>{this.props.price}</Price>
					}
				</Info>
				
			</Container>
		);
	}
}
 
export default Product;

const Container = styled.li`
    padding: 15px;
    box-sizing: border-box;
    text-align: left;
    &:hover {
        background-color: ${COLORS.white};
        box-shadow: ${props => props.passive ? 'none' : `0px 4px 35px ${COLORS.shadow}`};
		.flexOnHover {
			display: flex;
		}
    }
`;
const Image = styled.img`
    height: 360px;
    width: 100%;
    object-position: center;
    object-fit: cover;
`;
const Title = styled.h2`
    font-size: 1rem;
    color: ${props => props.passive ? COLORS.grey : COLORS.text};
    font-weight: 300;
    line-height: 1.6em;
`;
const Price = styled.p`
    font-size: 1rem;
    line-height: 1.6em;
    font-weight: 500;
	color: ${props => props.passive ? COLORS.grey : COLORS.text};
`;
const Info = styled.div`
    margin-top: 24px;
    position: relative;
`;
const AddToCartButton = styled.button`
    background: ${COLORS.primary};
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border-width: 0;
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 15px;
    top: -50px;
`;
const OutOfStockLayer = styled.label`
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	color: ${COLORS.grey};
	font-size: 1.33rem;
	line-height: 1.6em;
	font-weight: 400;
	background: ${COLORS.whiteOverlay};
	cursor: not-allowed;
`;
const ImageContainer = styled(Link)`
	position: relative;
	cursor: ${props => props.passive === 'true' ? 'not-allowed' : 'pointer'}
`;
const TitleLink = styled(Link)`
	cursor: ${props => props.passive === 'true' ? 'not-allowed' : 'pointer'}
`;