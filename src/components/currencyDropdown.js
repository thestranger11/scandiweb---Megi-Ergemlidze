import React, { Component } from 'react';
import styled from 'styled-components';
import {gql} from '@apollo/client';
import {connect} from 'react-redux';
import {client} from '../helpers/utils';
import { COLORS } from '../helpers/constants';
import DownArrow from '../assets/downArrow.png';
import Loader from './UI/loader';
import { changeActiveCurrency } from '../slices/currencySlice';
import {toggleBackdrop} from '../slices/backdropSlice';


class CurrencyDropdown extends Component {
	state = { visible: false }; 
	componentDidMount(){
		client.query({
			query: gql`
              query getCurrencies {
                currencies {
                    label,
                    symbol
                  }
              }
            `
		}).then(result => {
			this.setState(prevState=>({
				...prevState,
				currencies: result.data.currencies
			}));
			if(!this.props.activeCurrency){
				this.props.dispatch(changeActiveCurrency(result.data.currencies[0].symbol));
			}
		});
	}
	toggleHandler = (currentVal) => {
		this.setState(prevState=>({
			...prevState,
			visible: !currentVal
		}));
		if(this.props.hasBackdrop){
			this.props.dispatch(toggleBackdrop());
		}
	};
	activeCurrencyChangeHandler = (symbol) => {
		this.props.dispatch(changeActiveCurrency(symbol));
		this.toggleHandler(this.state.visible);
	};
	render() {
		if(!this.state.currencies){
			return <Loader size="15px" />;
		}
		return (
			<ToggleContainer
				tabIndex='0'
				onBlur={()=>this.toggleHandler(true)}
			>
				<Button 
					onClick={()=>this.toggleHandler(this.state.visible)}
				>
					<Flex>
						{this.props.activeCurrency} 
						<Arrow src={DownArrow} alt="arrow" className={this.state.visible ? 'active' : ''} />
					</Flex>
				</Button>
				{this.state.visible && (
					<Card onClick={()=>console.log('card')}
					>
						<ul>
							{this.state.currencies.map(item=>(
								<li key={item.label}>
									<button onMouseDown={()=>this.activeCurrencyChangeHandler(item.symbol)}>
										{item.symbol+' '+item.label}
									</button>
								</li>
							))}
						</ul>
					</Card>
				)}
			</ToggleContainer>
		);
	}
}
const mapStateToProps = (state) =>({
	activeCurrency: state.currency.value,
	backdrop: state.backdrop
});
export default connect(
	mapStateToProps
)(CurrencyDropdown);

const Card = styled.div`
	position: absolute;
	top: 30px;
	right: 0;
	background: ${COLORS.white};
	box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
	min-width: 115px;
    padding: 10px 0;
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
            }
        }
	}
`;
const Arrow = styled.img`
    padding: 0 0 0 10px;
    &.active {
        transform: rotate(180deg);
        padding: 0 10px 0 0;
    }
`;
const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
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
`;