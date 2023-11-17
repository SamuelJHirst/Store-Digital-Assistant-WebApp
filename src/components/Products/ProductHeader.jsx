import React from 'react';
import CardWrapper from '../common/CardWrapper';
import ProductStatus from './ProductStatus';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';

class ProductHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 0
		}
	}

	componentDidMount() {
		const rating = Math.round(this.props.reviews.map(x => { return x.rating; }).reduce((a, b) => a + b, 0) / this.props.reviews.length);
		this.setState({ ...this.state, rating });
	}

	render() {
		return (
			<CardWrapper>
				<Box pl={1} pr={1} pt={2} pb={2}>
					<Grid container spacing={3}>
						<Grid item xs={8}>
							<Typography variant="h4">
								{this.props.product.name} 
								<ProductStatus status={this.props.product.status} />
							</Typography>
							<Typography variant="subtitle1">{this.props.product.ean}</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography variant="h5" align="right">£{this.props.product.price.toFixed(2)}</Typography>
							<Typography align="right">
								{ this.state.rating > 0 ? <StarIcon style={{ color: '#ffd54f' }} /> : <StarIcon style={{ color: 'grey' }} /> }
								{ this.state.rating > 1 ? <StarIcon style={{ color: '#ffd54f' }} /> : <StarIcon style={{ color: 'grey' }} /> }
								{ this.state.rating > 2 ? <StarIcon style={{ color: '#ffd54f' }} /> : <StarIcon style={{ color: 'grey' }} /> }
								{ this.state.rating > 3 ? <StarIcon style={{ color: '#ffd54f' }} /> : <StarIcon style={{ color: 'grey' }} /> }
								{ this.state.rating > 4 ? <StarIcon style={{ color: '#ffd54f' }} /> : <StarIcon style={{ color: 'grey' }} /> }
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</CardWrapper>
		);
	}
}

export default ProductHeader;