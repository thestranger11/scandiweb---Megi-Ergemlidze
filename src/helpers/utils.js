import React from 'react';
import {
	ApolloClient,
	InMemoryCache
} from '@apollo/client';
import {
	useLocation,
	useNavigate,
	useParams
} from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from './constants';
import { css } from 'styled-components';


// apollo client
export const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache()
});

  
export const withRouter = Component => {
	const ComponentWithRouterProp = props => {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return (
			<Component
				{...props}
				router={{ location, navigate, params }}
			/>
		);
	};
  
	return ComponentWithRouterProp;
};

// common container
export const Container = styled.div`
	max-width: 1240px;
	margin: 0 auto;
	padding: 0 10px;
`;
// common button
export const Button = styled.div`
	max-width: 100%;
	text-align: center;
	text-transform: uppercase;
	box-sizing: border-box;
	${props => props.size === 'small' ? css`
		padding: 13px;
		width: 140px;
		font-size: .777rem;
		line-height: 1.2em;
	` : css`
		padding: 16px;
		width: 290px;
		font-size: .9rem;
		line-height: 1.2em;
	`};
	${props => props.primary ? css`
			background: ${COLORS.primary};
			color: ${COLORS.white};
			border: none;
		` 
		: css`
			background: ${COLORS.white};
			color: ${COLORS.text};
			border: 1px solid ${COLORS.text};
		`
}
`;