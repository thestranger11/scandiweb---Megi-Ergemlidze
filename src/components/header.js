import React, {Component} from 'react';
import {client, Container} from '../helpers/utils';
import {gql} from '@apollo/client';
import Loader from './UI/loader';
import { NavLink } from 'react-router-dom';
import Logo from '../logo.svg';
import styled from 'styled-components';
import { COLORS } from '../helpers/constants';
import CurrencyDropdown from './currencyDropdown';
import MiniCart from './miniCart';

class Header extends Component {
	state = {  }; 

	componentDidMount(){
		client.query({
			query: gql`
              query getCategories {
                categories {
                    name
                }
              }
            `
		}).then(result => {
			this.setState({categories: result.data.categories});
		});
	}

	render() {
		if(!this.state.categories){
			return (<Loader />);
		}
		return (
			<Container>
				<StyledHeader>
					<Nav>
						{this.state.categories.map(item=>(
							<StyledLink 
								to={`/shop/${item.name}`} 
								key={item.name}
							>
								{item.name}
							</StyledLink>
						))}
					</Nav>
					<StyledLink to='/' id="logo">
						<img src={Logo} alt="logo" />
					</StyledLink>
					<Icons>
						<CurrencyDropdown />
						<MiniCart />
					</Icons>
				</StyledHeader>
			</Container>
		);
	}
}
 
export default Header;

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    height: 60px;
	margin: 0 -10px;
    width: calc(100% + 20px);
    max-width: calc(100% + 20px);
	@media(min-width: 425px){
		margin: 0;
		width: 100%;
		max-width: 100%;
		height: 80px;
	}
`;
const StyledLink = styled(NavLink)`
    text-decoration: none;
    padding: 0 10px;
    display: inline-flex;
    align-items: center;
    height: 100%;
    text-transform: uppercase;
    color: ${COLORS.text};
    font-weight: 400;
    &:not(#logo):hover,
    &:not(#logo).active {
        color: ${COLORS.primary};
        border-bottom: 2px solid ${COLORS.primary};
        font-weight: 600;
    }
	@media(min-width: 425px){
		padding: 0 16px;
	}
	img {
		width: 20px;
		@media(min-width: 425px){
			width: auto;
		}
	}
`;
const Icons = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const Nav = styled.nav`
	display: flex;
`;