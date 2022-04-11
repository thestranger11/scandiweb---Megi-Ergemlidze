import React, { Component } from 'react';
import {client, withRouter, Button} from '../helpers/utils';
import {gql} from '@apollo/client';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Page from '../components/UI/page';
import NotFoundPage from './notFoundPage';
import Loader from '../components/UI/loader';
import RadioButtons from '../components/radioButtons';
import { COLORS } from '../helpers/constants';
import {addProduct} from '../slices/cartSlice';
import Gallery from '../components/gallery';

class ProductPage extends Component {
	state = {}; 
	fetchData = () => {
		const id = this.props.router.params.id;
		client.query({
			query: gql`
              	query getProducts {
                	product(id: "${id}") {
						id,
						name,
						inStock,
						gallery,
						description,
						category,
						attributes {
							id,
							name,
							type,
							items {
								displayValue,
								value,
								id
							}
						},
						prices {
							currency {
								label,
								symbol
							},
							amount
						},
						brand
					}
              	}
            `
		}).then(result => {
			if(!result.data.product){
				this.setState(prevState=>({
					...prevState,
					error: true
				}));
			}else{
				// chosen attributes by default
				const chosenAttrs = result.data.product.attributes.map(item=>({
					name: item.name,
					value: item.items[0].value
				}));
				this.setState(prevState=>({
					...prevState,
					error: false,
					product: result.data.product,
					attributes: [...result.data.product.attributes],
					attributeValues: [...chosenAttrs]
				}));
			}
		});
	};
	componentDidMount(){
		this.fetchData();
	}
	componentDidUpdate(prevProps){
		if( prevProps.router.location.pathname !== this.props.router.location.pathname 
			|| this.props.router.params.id !== prevProps.router.params.id )
		{
			this.fetchData();
		}
	}

	addToCartHandler = () => {
		this.props.dispatch(addProduct({
			id: this.state.product.id+JSON.stringify(this.state.attributeValues),
			url: `/shop/all/${this.state.product.id}`,
			name: this.state.product.name,
			cat: this.state.product.category,
			prices: this.state.product.prices,
			count: 1,
			image: this.state.product.gallery[0],
			attributes: [...this.state.attributes],
			chosenAttributes: [...this.state.attributeValues],
		}));
	};
	attributesChangeHandler = (name, val) => {
		let updatedAttributes = [...this.state.attributeValues];
		updatedAttributes = updatedAttributes.map(item => {
			if(item.name === name){
				return {
					...item,
					value: val
				};
			}
			return {...item};
		});
		this.setState(prevState=>({
			...prevState,
			attributeValues: [...updatedAttributes]
		}));
	};

	render() { 
		const product = this.state.product;
		if(!product && this.state.error){
			return <NotFoundPage />;
		}
		if(!product && !this.state.error){
			return <Loader />;
		}
		return (
			<Page>
				<Article>
					<GalleryContainer>
						<Gallery
							thumbnails
							data={product.gallery}
						/>
					</GalleryContainer>
					<ProductDetails>
						<Title>{product.name}</Title>
						<Category>{product.category}</Category>

						{product.attributes && product.attributes.map(item=>(
							<FieldContainer key={item.id}>
								<p><Label>{item.name}</Label></p>
								<RadioButtons 
									name={item.name} 
									buttons={item.items}
									type={item.type}
									valueChanged={(val)=>this.attributesChangeHandler(item.name, val)}
								/>
							</FieldContainer>
						))}
						<FieldContainer>
							<dl>
								<dt>
									<Label>price:</Label>
								</dt>
								<Price>
									{this.props.activeCurrency}
									{product.prices.find(e=> e.currency.symbol === this.props.activeCurrency) && product.prices.find(e=> e.currency.symbol === this.props.activeCurrency).amount}
								</Price>
							</dl>
							<button onClick={this.addToCartHandler}>
								<Button primary>add to cart</Button>
							</button>
							<Description dangerouslySetInnerHTML={{__html: product.description}} />
						</FieldContainer>
					
					</ProductDetails>
				</Article>
			</Page>
		);
	}
}
const mapStateToProps = (state) =>({
	activeCurrency: state.currency.value
});
export default withRouter(
	connect(mapStateToProps)(ProductPage)
);
const Article = styled.article`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
`;
const GalleryContainer = styled.div`
	width: 50%;
	@media(max-width: 768px){
		width: 100%;
		margin-bottom: 30px;
	}
`;
const Title = styled.h1`
	font-size: 1.666rem;
	line-height: .9em;
	font-weight: 600;
	color: ${COLORS.text};
	margin-bottom: 15px;
`;
const Category = styled.h2`
	font-weight: 400;
	font-size: 1.666rem;
	line-height: .9em;
	color: ${COLORS.text};
`;
const Label = styled.span`
	text-transform: uppercase;
	font-weight: 700;
	font-size: 1rem;
	line-height: 1em;
	color: ${COLORS.text};
	margin-bottom: 8px;
	display: block;
`;
const ProductDetails = styled.div`
	text-align: left;
	padding: 0 100px;
	width: 50%;
	box-sizing: border-box;
	@media(max-width: 1024px){
		padding: 0 50px;
	}
	@media(max-width: 768px){
		padding: 0;
		width: 100%;
		margin-bottom: 30px;
	}
`;
const Price = styled.dd`
	font-size: 1.333rem;
	line-height: 1em;
	font-weight: 700;
	margin-top: 10px;
	margin-bottom: 25px;
`;
const FieldContainer = styled.div`
	margin: 40px 0;
`;
const Description = styled.p`
	font-size: .9rem;
	line-height: 1.6em;
	color: ${COLORS.text};
	margin-top: 40px;
	width: 290px;
	max-width: 100%;
	p {
		margin-top: 15px;
	}
`;