import React from 'react';
import axios from '../../helpers/axios';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Loading from '../common/Loading';
import CardWrapper from '../common/CardWrapper';
import ListItemText from '@material-ui/core/ListItemText'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
	tableCell: {
		padding: 8
	},
});

class DeliveryProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true
        };
    }

    componentDidMount() {
        axios.get('/delivery/' + this.props.match.params.delivery, { headers: { Authorization: this.props.apiToken } }).then((products) => {
            console.log(products)
            this.setState({ ...this.state, products: products.data.data.products, loading: false });
		}, (error) => {
			this.setState({ ...this.state, loading: false });
			this.props.showBanner('Cannot Get Delivery Products: Something Went Wrong', 'error');
		});
    }

	render() {
        const { classes } = this.props;
        if (this.state.loading) return ( <Loading /> );
		return (
            <>
                <CardWrapper>
                    <Link to={'/deliveries/' + this.props.match.params.type}>
                        <Typography color='textPrimary'>Go Back</Typography>
                    </Link>
				</CardWrapper>
                <CardWrapper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCell}>
                                    <Typography variant='h6'>Product</Typography>
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Typography variant='h6'>Quantity</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.products.map(row => (
                                    <TableRow key={row.product.ean}>
                                        <TableCell className={classes.tableCell}>
                                            <ListItemText primary={row.product.name} secondary={row.product.ean} />
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>{row.quantity}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardWrapper>
            </>
		);
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, null)(withRouter(withStyles(useStyles)(DeliveryProducts)));