import React from 'react';
import CardWrapper from '../common/CardWrapper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

class ProductQuantity extends React.Component {
	render() {
		return (
			<CardWrapper>
				<Box p={1}>
					<Typography variant="body1">Available Quantity: {this.props.quantity}</Typography>
				</Box>
			</CardWrapper>
		);
	}
}

export default ProductQuantity;