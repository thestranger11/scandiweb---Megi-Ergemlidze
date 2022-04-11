import React, { Component } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../helpers/constants';
import { Container } from '../../helpers/utils';
import {connect} from 'react-redux';
import {toggleBackdrop} from '../../slices/backdropSlice';

class Page extends Component {
	backdropHandler = () => {
		this.props.dispatch(toggleBackdrop(false));
	};
	render() {
		return (
			<Main>
				{this.props.backdrop && <Backdrop onClick={this.backdropHandler} />}
				<Container>
					{this.props.title && (
						<Title>{this.props.title}</Title>
					)}
					{this.props.children}
				</Container>
			</Main>
		);
	}
}
const mapStateToProps = (state) =>({
	backdrop: state.backdrop.value
});
 
export default connect(mapStateToProps)(Page);

const Title = styled.h1`
    font-weight: 400;
    color: ${COLORS.text};
    text-transform: capitalize;
    text-align: left;
    margin: 0 0 80px;
`;
const Main = styled.main`
	position: relative;
	min-height: calc(100vh - 160px);
	padding-top: 80px;
`;
export const Backdrop = styled.div`
	background: ${COLORS.backdrop};
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
`;