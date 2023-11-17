import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ProductSellingLocations from './ProductSellingLocations';
import ProductNonSellingLocations from './ProductNonSellingLocations';

class ProductLocations extends React.Component {
	render() {
		return (
			<Box p={1}>
				<Grid container spacing={3}>
					<ProductSellingLocations sellingAssignments={this.props.sellingAssignments} modules={this.props.modules} />
					<ProductNonSellingLocations nonSellingAssignments={this.props.nonSellingAssignments} />
				</Grid>
			</Box>
		);
	}
}

export default ProductLocations;