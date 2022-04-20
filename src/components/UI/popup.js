import React, { Component } from 'react';
import styled from 'styled-components';
import { COLORS, FONTS } from '../../helpers/constants';

class Popup extends Component {
	render() { 
		return <Container>
			<Close onClick={this.props.onClose}>x</Close>
			{this.props.children}
		</Container>;
	}
}
 
export default Popup;

const Container = styled.div`
    background: ${COLORS.white};
	position: sticky;
	z-index: 999;
    padding-bottom: 20px;
    top: 5vh;
    overflow: auto;
    max-height: 70vh;
    max-width: 96vw;
    border-radius: 10px;
    padding-top: 46px;
`;
const Close = styled.button`
    font-size: 1.3rem;
    line-height: 1em;
    font-weight: 200;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid ${COLORS.grey};
    float: right;
    margin: -36px 10px 0;
    background: ${COLORS.white};
    font-family: ${FONTS.primary};
    cursor: pointer;
`;