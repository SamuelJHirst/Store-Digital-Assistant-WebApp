import React from 'react';
import axios from '../../helpers/axios';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { showBanner } from '../../actions/bannerActions';
import Loading from '../common/Loading';
import CardWrapper from '../common/CardWrapper';
import Button from '@material-ui/core/Button';
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

class Deliveries extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			deliveries: []
		};
	}

	componentDidMount() {
		this.getDeliveries();
	}
	
	componentDidUpdate(prevProps) {
		if (this.props.match.params.type !== prevProps.match.params.type) {
			this.setState({ ...this.state, deliveries: [], loading: true });
			this.getDeliveries();
		}
	}

	getDeliveries = () => {
		axios.get('/delivery/' + this.props.match.params.type + '/' + this.props.apiUser.site.code, { headers: { Authorization: this.props.apiToken } }).then((deliveries) => {
            this.setState({ ...this.state, deliveries: deliveries.data.data, loading: false });
		}, (error) => {
			this.setState({ ...this.state, loading: false });
			this.props.showBanner('Cannot Get Deliveries: Something Went Wrong', 'error');
		});
	}

	processDelivery = (deliveryNumber) => {
		this.setState({ ...this.state, loading: true });
		axios.get('/delivery/' + deliveryNumber, { headers: { Authorization: this.props.apiToken } }).then((delivery) => {
            if (this.props.match.params.type === 'outbound') {
				axios.patch('/delivery/' + deliveryNumber, {
					status: 'In Transit'
				}, { headers: { Authorization: this.props.apiToken } }).then(async (resp) => {
					for (const product of delivery.data.data.products) {
						await axios.patch('/product/quantity/' + this.props.apiUser.site.code + '/' + product.product.ean, {
							method: 'decrement',
							quantity: product.quantity
						}, { headers: { Authorization: this.props.apiToken } });
					}
					this.setState({
						...this.state,
						deliveries: this.state.deliveries.filter(x => { return x.deliveryNumber !== deliveryNumber; }),
						loading: false
					});
					this.props.showBanner('Delivery Successfully Processed', 'success');
				}, (error) => {
					this.props.showBanner('Cannot Process Delivery: Something Went Wrong', 'error');
				});
			} else {
				axios.patch('/delivery/' + deliveryNumber, {
					status: 'Completed'
				}, { headers: { Authorization: this.props.apiToken } }).then(async (resp) => {
					for (const product of delivery.data.data.products) {
						await axios.patch('/product/quantity/' + this.props.apiUser.site.code + '/' + product.product.ean, {
							method: 'increment',
							quantity: product.quantity
						}, { headers: { Authorization: this.props.apiToken } });
					}
					this.setState({
						...this.state,
						deliveries: this.state.deliveries.filter(x => { return x.deliveryNumber !== deliveryNumber; }),
						loading: false
					});
					this.props.showBanner('Delivery Successfully Processed', 'success');
				}, (error) => {
					this.props.showBanner('Cannot Process Delivery: Something Went Wrong', 'error');
				});
			}
		}, (error) => {
			this.setState({ ...this.state, loading: false });
			this.props.showBanner('Cannot Process Delivery: Something Went Wrong', 'error');
		});
	}

	cancelDelivery = (deliveryNumber) => {
		this.setState({ ...this.state, loading: true });
		axios.delete('/delivery/' + deliveryNumber, { headers: { Authorization: this.props.apiToken } }).then((resp) => {
            this.setState({
				...this.state,
				deliveries: this.state.deliveries.filter(x => { return x.deliveryNumber !== deliveryNumber; }),
				loading: false
			});
			this.props.showBanner('Delivery Successfully Cancelled', 'success');
		}, (error) => {
			this.setState({ ...this.state, loading: false });
			this.props.showBanner('Cannot Cancel Delivery: Something Went Wrong', 'error');
		});
	}

	render() {
		const { classes } = this.props;
		if (this.state.loading) return ( <Loading /> );
		return (
			<CardWrapper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableCell}>
								<Typography variant='h6'>Type</Typography>
							</TableCell>
							<TableCell className={classes.tableCell}>
								<Typography variant='h6'>Delivery Number</Typography>
							</TableCell>
							<TableCell className={classes.tableCell}>
								<Typography variant='h6'>{
									this.props.match.params.type === 'inbound' ? 'From' : 'To'	
								}</Typography>
							</TableCell>
							<TableCell className={classes.tableCell}>
								<Typography variant='h6'>Date Due</Typography>
							</TableCell>
							<TableCell className={classes.tableCell}>
								<Typography variant='h6'>Actions</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							this.state.deliveries.map(row => (
								((row.status === 'Booked' && this.props.match.params.type === 'outbound') ||
								(row.status === 'In Transit' && this.props.match.params.type === 'inbound')) &&
								<TableRow key={row.deliveryNumber}>
									<TableCell>
										{
											row.inbound.type === 'Store' && row.outbound.type === 'Store' && 'Transfer'
										}{
											row.inbound.type === 'Distribution Centre' && row.outbound.type === 'Distribution Centre' && 'Transfer'
										}{
											row.inbound.type === 'Store' && row.outbound.type === 'Distribution Centre' && 'Replenishment'
										}{
											row.inbound.type === 'Store' && row.outbound.type === 'Supplier' && 'Replenishment'
										}{
											row.inbound.type === 'Distribution Centre' && row.outbound.type === 'Store' && 'Returns'
										}
									</TableCell>
									<TableCell className={classes.tableCell}>{row.deliveryNumber}</TableCell>
									<TableCell className={classes.tableCell}>{
										this.props.match.params.type === 'inbound'
										? (row.outbound.name + ' (' + row.outbound.code + ')')
										: (row.inbound.name + ' (' + row.inbound.code + ')')
									}</TableCell>
									<TableCell className={classes.tableCell}>{
										row.arrivesAt.split('-')[2].split('T')[0] 
										+ '/' + row.arrivesAt.split('-')[1]
										+ '/' + row.arrivesAt.split('-')[0]
									}</TableCell>
									<TableCell className={classes.tableCell}>
										<Button component={Link} to={'/deliveries/' + this.props.match.params.type + '/' + row.deliveryNumber} variant='contained' color='primary'>View Details</Button>
										{
											this.props.match.params.type === 'outbound' 
											?
											<>
												<Button variant='contained' color='primary' onClick={() => { this.processDelivery(row.deliveryNumber) }} style={{ marginLeft: 5 }}>Send</Button>
												<Button variant='contained' color='secondary' onClick={() => this.cancelDelivery(row.deliveryNumber)} style={{ marginLeft: 5 }}>Cancel</Button>
											</>
											:
											<Button variant='contained' color='primary' onClick={() => { this.processDelivery(row.deliveryNumber) }} style={{ marginLeft: 5 }}>Receive</Button>
										}
									</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</CardWrapper>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withRouter(withStyles(useStyles)(Deliveries)));