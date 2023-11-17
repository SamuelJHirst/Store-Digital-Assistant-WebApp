import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = theme => ({
	liveProduct: {
		backgroundColor: '#a5d6a7',
		marginLeft: 10,
	},
	ordersBlockedProduct: {
		backgroundColor: '#fff59d',
		marginLeft: 10,
	},
	discontinuedProduct: {
		backgroundColor: '#ef9a9a',
		marginLeft: 10,
	},
});

class ProductStatus extends React.Component {
	render() {
		const { classes } = this.props;
		switch (this.props.status) {
			case 'Discontinued': 
				return <Chip label="Discontinued" className={classes.discontinuedProduct} />
			case 'Orders Blocked': 
				return <Chip label="Orders Blocked" className={classes.ordersBlockedProduct} />
			default: 
				return <Chip label="Live" className={classes.liveProduct} />
		}
	}
}

export default withStyles(useStyles)(ProductStatus);