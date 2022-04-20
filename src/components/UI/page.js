import React, { Component } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../helpers/constants';
import { Container } from '../../helpers/utils';
import {connect} from 'react-redux';
import {toggleBackdrop} from '../../slices/backdropSlice';
import Popup from './popup';

class Page extends Component {
	state = {
		popup: this.props.popupContent
	};
	backdropHandler = () => {
		this.props.dispatch(toggleBackdrop(false));
		this.setState(prevState=>({
			...prevState,
			popup: false
		}));
		// for clearing popupContent in props
		this.props.onPopupClose && this.props.onPopupClose();
	};
	componentDidUpdate(prevProps){
		if(prevProps.popupContent !== this.props.popupContent){
			this.setState(prevState=>({
				...prevState,
				popup: this.props.popupContent
			}));
		}
	}
	render() {
		return (
			<Main>
				{(this.props.backdrop || this.state.popup) && <Backdrop onClick={this.backdropHandler} />}
				<Container>
					{this.state.popup && (
						<Popup 
							onClose={ this.backdropHandler }
						>
							{this.props.popupContent}
						</Popup>
					)}
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
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
`;