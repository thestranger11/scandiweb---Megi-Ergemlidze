import React, { Component } from 'react';
import {client, withRouter} from '../helpers/utils';
import {gql} from '@apollo/client';
import Page from '../components/UI/page';
import NotFoundPage from './notFoundPage';
import Loader from '../components/UI/loader';

class ProductPage extends Component {
	state = {  }; 
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
			console.log('res',result.data.product);
			if(!result.data.product){
				this.setState({
					error: true
				});
			}else{
				this.setState({
					data: result.data.product,
					error: false
				});
			}
		});
	};
	componentDidMount(){
		this.fetchData();
	}

	render() { 
		if(!this.state.data && this.state.error){
			return <NotFoundPage />;
		}
		if(!this.state.data && !this.state.error){
			return <Loader />;
		}
		return (
			<Page>
				{/* // <Gallery /> */}
				<div>
					<h1></h1>
					
				</div>
				{console.log('props',this.props.router.params.id)}
			</Page>
		);
	}
}
 
export default withRouter(ProductPage);