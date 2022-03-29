import React, { Component } from 'react';
import styled from 'styled-components';
import Page from '../components/UI/page';
import {Link} from 'react-router-dom';
import { COLORS } from '../helpers/constants';

class NotFoundPage extends Component {
	state = {  }; 
	render() { 
		return (
			<Page title="404 Page">
				<Text>Oops, the page you&apos;re looking for doesn&apos;t exist.</Text>
				<StyledLink to="/">
					&lt;- Go back to Home page
				</StyledLink>
			</Page>
		);
	}
}
 
export default NotFoundPage;
const Text = styled.p`
	text-align: left;
	font-size: 1rem;
	line-height: 1.6em;
`;
const StyledLink = styled(Link)`
	text-align: left;
	display: block;
	margin-top: 30px;
	color: ${COLORS.primary}
`;