import React, { Component } from 'react';
import styled from 'styled-components';
import { COLORS } from '../helpers/constants';
import NoImage from '../assets/noImage.jpeg';
import { css } from 'styled-components';
import RightArrow from '../assets/rightArrow.png';
import LeftArrow from '../assets/leftArrow.png';

class Gallery extends Component {
	state = { activeIndex: 0 };

	changeHandler = (index) => {
		this.setState({activeIndex: index});
	};
	nextHandler = (i) => {
		if(i === this.props.data.length - 1){
			return this.setState({
				activeIndex: 0
			});
		}
		this.setState(prevState=>({
			activeIndex: prevState.activeIndex+1
		}));
	};
	prevHandler = (i) => {
		if(i === 0){
			return this.setState({
				activeIndex: this.props.data.length - 1
			});
		}
		this.setState(prevState=>({
			activeIndex: prevState.activeIndex-1
		}));
	};
	render() { 
		if(!this.props.data || this.props.data.length <=0){
			return (
				<Slide>
					<img src={NoImage} id="no-image" alt="no image available" />
				</Slide>
			);
		}
		return (
			<Flex thumbnails={this.props.thumbnails}>
				{this.props.thumbnails && (
					<Thumbnails>
						{this.props.data.map((item,index)=>(
							<Thumb
								key={item} 
								active={this.state.activeIndex === index} 
								onClick={() => this.changeHandler(index)}
							>
								<img src={item} alt={item} />
							</Thumb>
						))}
					</Thumbnails>
				)}
				{!this.props.thumbnails && (
					<Arrows>
						<Arrow 
							onClick={() => this.prevHandler(this.state.activeIndex)}
						>
							<img src={LeftArrow} alt="previous slide" />
						</Arrow>
						<Arrow
							right
							onClick={() => this.nextHandler(this.state.activeIndex)}
						>
							<img src={RightArrow} alt="next slide" />
						</Arrow>
					</Arrows>
				)}
				<Slider>
					{this.props.data.map((item,index)=>(
						<Slide key={item} active={this.state.activeIndex === index}>
							<img src={item} alt={item} />
						</Slide>
					))}
				</Slider>
			</Flex>
		);
	}
}
 
export default Gallery;

const Flex = styled.div`
    display: flex;
    position: relative;
    padding-left: ${props => props.thumbnails ? '120px' : 0};
`;
const Slider = styled.div`
    width: 100%;
`;
const Slide = styled.div`
    width: 100%;
    background: ${COLORS.shadow};
    display: none;
    ${props => props.active && css`
        display: block;
    `}
    img {
        height: 100%;
        width: 100%;
        object-position: top;
        object-fit: contain;
        &#no-image {
            object-fit: cover;
            object-position: center;
        }
    }
`;
const Thumbnails = styled.div`
    max-height: 100%;
    overflow-y: auto;
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 25px 0 5px;
`;
const Thumb = styled.div`
    width: 80px;
    height: 80px;
    background: ${COLORS.shadow};
    ${props => props.active && css`
        outline: ${COLORS.primary} solid 1px;
        outline-offset: 1px;
    `}
    margin-bottom: 30px;
    img {
        height: 100%;
        width: 100%;
        object-position: top;
        object-fit: cover;
    }
`;
const Arrows = styled.div`
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    display: flex;
    justify-content: space-between;
`;
const Arrow = styled.button`
    color: ${COLORS.white};
    padding: 9px;
    cursor: pointer;
`;