import React from 'react';
import TabPanel from '../common/TabPanel';
import AppBar from "@material-ui/core/AppBar";
import Box from '@material-ui/core/Box';
import StarIcon from '@material-ui/icons/Star';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";

class ProductButtons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 0
		};
	}

	onChange = (e, newValue) => {
		this.setState({ ...this.state, tab: newValue });
	}

	render() {
		return (
			<Box p={1}>
				<AppBar position="static" color="white">
			        <Tabs
			        	value={this.state.tab}
			          	onChange={this.onChange}
			          	indicatorColor="primary"
			          	textColor="primary"
			          	variant="fullWidth"
			        >
			        	<Tab label="Description" />
			        	<Tab label="Info" />
			        	<Tab label="Reviews" />
			        </Tabs>
			        <TabPanel value={this.state.tab} index={0}>
						<Box p={1}>
							<Typography variant="body1">
								{
									this.props.product.description ? this.props.product.description : <em>No Description Provided</em>
								}
							</Typography>
						</Box>
			        </TabPanel>
			        <TabPanel value={this.state.tab} index={1}>
						<Box p={1}>
							{
								this.props.product.info.length === 0
								?
								<Typography variant="body1"><em>No Reviews Provided</em></Typography>
								:
								<Table>
									<TableBody>
										{
											this.props.product.info.map(row => (
												<TableRow key={row.name}>
													<TableCell><strong>{row.name}</strong></TableCell>
													<TableCell>{row.value}</TableCell>
												</TableRow>
											))
										}
									</TableBody>
								</Table>
							}
						</Box>
					</TabPanel>
			        <TabPanel value={this.state.tab} index={2}>
						<Box p={1}>
							{
								this.props.reviews.length === 0
								?
								<Typography variant="body1"><em>No Reviews Provided</em></Typography>
								:
								this.props.reviews.map(row => (
									<Box p={1}>
										<Typography variant="h6">
											{
												row.customer.firstName 
												+ ' ' + row.customer.lastName
												+ ' (' + row.timestamp.split('-')[2].split('T')[0] 
												+ '/' + row.timestamp.split('-')[1]
												+ '/' + row.timestamp.split('-')[0] + ')'
											}
										</Typography>
										<Box>
											{ row.rating > 0 ? <StarIcon fontSize='small' style={{ color: '#ffd54f' }} /> : <StarIcon fontSize='small' style={{ color: 'grey' }} /> }
											{ row.rating > 1 ? <StarIcon fontSize='small' style={{ color: '#ffd54f' }} /> : <StarIcon fontSize='small' style={{ color: 'grey' }} /> }
											{ row.rating > 2 ? <StarIcon fontSize='small' style={{ color: '#ffd54f' }} /> : <StarIcon fontSize='small' style={{ color: 'grey' }} /> }
											{ row.rating > 3 ? <StarIcon fontSize='small' style={{ color: '#ffd54f' }} /> : <StarIcon fontSize='small' style={{ color: 'grey' }} /> }
											{ row.rating > 4 ? <StarIcon fontSize='small' style={{ color: '#ffd54f' }} /> : <StarIcon fontSize='small' style={{ color: 'grey' }} /> }
										</Box>
										<Typography variant="body1">{row.review}</Typography>
									</Box>
								))
							}
						</Box>
					</TabPanel>
			    </AppBar>
			</Box>
		);
	}
}

export default ProductButtons;