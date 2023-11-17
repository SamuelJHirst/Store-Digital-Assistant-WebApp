import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
	noNonSellingLocations: {
		backgroundColor: '#a5d6a7',
		height: '100%',
		display: 'flex',
		flexDirection: "column",
	    justifyContent: "center"
	},
});

class ProductNonSellingsLocations extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Grid item md={5} xs={12}>
				{
					this.props.nonSellingAssignments.length === 0
					?
					<Paper className={classes.noNonSellingLocations}>
						<Box p={3}>
							<Typography variant="body1" align="center">No Non-Selling Locations Found</Typography>
						</Box>
					</Paper>
					:
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Aisle</TableCell>
									<TableCell>Bay</TableCell>
									<TableCell>Type</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									this.props.nonSellingAssignments.map((row) => (
										<TableRow key={row.product.ean + '-' + row.bay.aisle.aisle + '-' + row.bay.bay + '-' + row.type}>
											<TableCell>{row.bay.aisle.aisle}</TableCell>
											<TableCell>{row.bay.bay}</TableCell>
											<TableCell>{row.type}</TableCell>
										</TableRow>
									))
								}
							</TableBody>
						</Table>
					</TableContainer>
				}
			</Grid>
		);
	}
}

export default withStyles(useStyles)(ProductNonSellingsLocations);