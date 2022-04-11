import React, { Component } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { COLORS } from '../helpers/constants';


class RadioButtons extends Component {
	state = { value: this.props.activeValue ? this.props.activeValue : this.props.buttons[0].value }; 
	changeHandler = (e) => {
		this.setState({value: e.target.value});
		this.props.valueChanged(e.target.value);
	};
	render() { 
		return (
			<Flex onChange={this.changeHandler}>
				{this.props.buttons.map(item => (
					<Radio
						htmlFor={item.id}
						className={this.state.value === item.value ? 'active' : ''}
						key={item.id}
						color={this.props.type === 'swatch' ? item.value : ''}
						disabled={this.props.disabled}
						size={this.props.size}
					>
						{this.props.type !== 'swatch' && item.value}
						<input 
							type="radio" 
							name={this.props.name} 
							id={item.id} 
							value={item.value}
							disabled={this.props.disabled}
							readOnly={this.props.disabled}
						/>
					</Radio>
				))}
			</Flex>
		);
	}
}
 
export default RadioButtons;

const Radio = styled.label`
	min-height: 24px;
	min-width: 24px;
	box-sizing: border-box;
	cursor: ${props => props.disabled ? 'default' : 'pointer'};
	position: relative;
	margin-top: 2px;
	${props => props.size === 'small' ? css`
		padding: 4px 6px;
		font-size: .777rem;
		margin-right: 6px;
	` : css`
		font-size: .888rem;
		padding: 13px 25px;
    	margin-right: 12px;
	`};
	${props => props.disabled ? css`
		background: ${props => props.color ? props.color : COLORS.disabledBg};
		opacity: ${props => props.color ? .5 : 1};
		color: ${COLORS.disabledText};
		border: 1px solid ${COLORS.disabledText};
		&.active {
			background: ${props => props.color ? props.color : COLORS.white};
			border: 1px solid ${COLORS.text};
			color: ${COLORS.text};
			opacity: 1;
		}
	` : css`
    	background: ${props => props.color ? props.color : 'none'};
    	border: 1px solid ${COLORS.text};
		color: ${COLORS.text};
		&.active {
			background: ${props => props.color ? props.color : COLORS.text};
			color: ${COLORS.white};
			outline: ${props => props.color ? `${COLORS.primary} solid 2px` : 'none'};
			outline-offset: 1px;
		}
	`};
    input {
        width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
		cursor: ${props => props.disabled ? 'default' : 'pointer'};
    }
`;
const Flex = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-wrap: wrap;
	margin: 5px 0;
	max-width: 100%;
	overflow-x: auto;
	padding: 3px;
`;