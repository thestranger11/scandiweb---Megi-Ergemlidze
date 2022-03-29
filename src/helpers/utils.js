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