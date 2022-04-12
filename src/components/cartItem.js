import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { COLORS } from '../helpers/constants';
import RadioButtons from './radioButtons';
import {addProduct, removeProduct} from '../slices/cartSlice';
import Gallery from './gallery';
import { css } from 'styled-components';
// import { Link } from 'react-router-dom';


class CartItem extends Component {
	state = {  }; 
	addProduct = () => {
		this.props.dispatch(addProduct(this.props.item));
	};
	removeProduct = () => {
		this.props.dispatch(removeProduct(this.props.item));
	};
	render() { 
		return (
			<Container mini={this.props.mini}>
				<Details>
					<div>
						<Title onClick={this.props.clicked}>
							{this.props.mini ? 
								<label>{this.props.item.name}</label>
								:
								<Name>{this.props.item.name}</Name>
							}
							{this.props.mini ? 
								<p>{this.props.item.cat}</p>
								:
								<Category>{this.props.item.cat}</Category>
							}
						</Title>
						<Price mini={this.props.mini}>
							{this.props.activeCurrency}
							{this.props.item.prices.find(e=> e.currency.symbol === this.props.activeCurrency) && this.props.item.prices.find(e=> e.currency.symbol === this.props.activeCurrency).amount}
						</Price>
						{this.props.item.attributes.map((item)=>(
							<RadioButtons 
								disabled={true}
								key={item.id}
								size="small"
								name={item.name} 
								buttons={item.items}
								type={item.type}
								valueChanged={(val)=>this.attributesChangeHandler(item.name, val)}
								activeValue={
									this.props.item.chosenAttributes.find(e=>e.name === item.name) ? 
										this.props.item.chosenAttributes.find(e=>e.name === item.name).value
										: this.props.item.attributes[0].items[0].value
								}
							/>
						))}
					</div>
					<Counter>
						<ActionButton onClick={this.addProduct}>+</ActionButton>
						<p>{this.props.item.count}</p>
						<ActionButton onClick={this.removeProduct}>-</ActionButton>
					</Counter>
				</Details>
				{console.log(this.props.item)}
				<GalleryContainer mini={this.props.mini}>
					<Gallery data={this.props.item.image} />
				</GalleryContainer>
			</Container>
		);
	}
}

const mapStateToProps = (state) =>({
	activeCurrency: state.currency.value
});
export default connect(
	mapStateToProps
)(CartItem);

const Container = styled.li`
    padding: ${props => props.mini ? '25px 15px' : '25px 0'};
    display: flex;
    justify-content: space-between;
    align-items: stretch;
`;
const Title = styled.p`
    font-size: .888rem;
    line-height: 1.6em;
    font-weight: 300;
    color: ${COLORS.text};
    text-transform: capitalize;
    cursor: pointer;
`;
const Name = styled.h2`
	font-weight: 600;
	font-size: 1.666rem;
	line-height: .9em;
	color: ${COLORS.text};
`;
const Category = styled.h3`
	font-weight: 400;
	color: ${COLORS.text};
	font-size: 1.666rem;
	line-height: .9em;
	margin-top: 15px;
`;
const Price = styled.p`
    font-weight: 500;
    font-size: .888rem;
    line-height: 1.6em;
    color: ${COLORS.text};
    margin: 5px 0 25px;
	${props => !props.mini && css`
		font-size: 1.333rem;
		line-height: 1.9em;
		margin: 12px 0;
		font-weight: 700;
	`}
`;
const GalleryContainer = styled.div`
    width: ${props => props.mini ? '105px' : '140px'};
	
`;
const Details = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex: 1;
    margin-right: 10px;
`;
const Counter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: stretch;
    text-align: center;
    p {
        font-size: .777rem;
        line-height: 1.6em;
        font-weight: 500;
        color: ${COLORS.text}
    }
`;
const ActionButton = styled.button`
    background: ${COLORS.white};
    border: 1px solid ${COLORS.text};
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
`;