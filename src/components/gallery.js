import React, { Component } from 'react';
import styled from 'styled-components';
import { COLORS } from '../helpers/constants';
import NoImage from '../assets/noImage.jpeg';
import { css } from 'styled-components';

class Gallery extends Component {
	state = { activeIndex: 0 };

	changeHandler = (index) => {
		this.setState({activeIndex: index});
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
			<Flex>
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
    padding-left: 120px;
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