import React, { Component } from 'react';
import {client, withRouter} from '../helpers/utils';
import Page from '../components/UI/page';
import {gql} from '@apollo/client';
import {connect} from 'react-redux';
import Loader from '../components/UI/loader';
import Product from '../components/product';
import styled from 'styled-components';
import NotFoundPage from './notFoundPage';

class CategoryPage extends Component {
	state = {}; 
	fetchData = () => {
		let category;
		if(this.props.category){
			category = this.props.category;
		}else if(!this.props.category && !this.props.router.params.name){
			category = 'all';
		}else if(this.props.router.params.name){
			category = this.props.router.params.name;
		}
		client.query({
			query: gql`
              	query getProducts {
                	category(input: {title: "${category}"}) {
						name,
						products {
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
              	}
            `
		}).then(result => {
			// console.log(result.data.category);
			if(!result.data.category){
				this.setState({
					error: true
				});
			}else{
				this.setState({
					category: result.data.category, 
					error: false
				});
			}
		});
	};
	componentDidMount(){
		this.fetchData();
	}
	componentDidUpdate(prevProps){
		if(prevProps.router.params.name !== this.props.router.params.name){
			this.fetchData();
		}
	}
	render() { 
		if(!this.state.category && this.state.error){
			return <NotFoundPage />;
		}
		if(!this.state.category && !this.state.error){
			return <Loader />;
		}
		return (
			<Page title={this.state.category.name}>
				{this.state.category.products && (
					<ProductList>
						{this.state.category.products.map(item=>(
							<Product 
								key={item.id}
								image={item.gallery[0]}
								title={item.name}
								price={
									item.prices.find(e=>e.currency.symbol === this.props.activeCurrency) &&
									item.prices.find(e=>e.currency.symbol === this.props.activeCurrency).currency.symbol + item.prices.find(e=>e.currency.symbol === this.props.activeCurrency).amount
								}
								inStock={item.inStock}
								url={`/shop/${this.state.category.name}/${item.id}`}
							/>
						))}
					</ProductList>
				)}
			</Page>
		);
	}
}
 
const mapStateToProps = (state) =>({
	activeCurrency: state.currency.value
});
export default withRouter(
	connect(mapStateToProps)(CategoryPage)
);

const ProductList = styled.ul`
    display: flex;
    justify-content: flex-start;
    list-style-type: none;
    flex-wrap: wrap;
    & > li {
        width: calc((100% - 80px) / 3);
        margin: 0 40px 100px 0;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        flex-direction: column;
        &:nth-child(3n){
            margin-right: 0;
        }
    }
`;