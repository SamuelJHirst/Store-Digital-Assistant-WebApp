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
	noSellingLocations: {
		backgroundColor: '#fff59d',
		height: '100%',
		display: 'flex',
		flexDirection: "column",
	    justifyContent: "center"
	},
});

class ProductSellingsLocations extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Grid item md={7} xs={12}>
				{
					this.props.sellingAssignments.length === 0 && this.props.modules.length === 0
					?
					<Paper className={classes.noSellingLocations}>
						<Box p={3}>
							<Typography variant="body1" align="center">No Selling Locations Found</Typography>
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
									<TableCell>Sequence</TableCell>
									<TableCell>Facings</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									this.props.modules.map((row) => (
										<TableRow key={row.ean + '-' + row.aisle + '-' + row.bay + '-' + row.sequence}>
											<TableCell>{row.aisle}</TableCell>
											<TableCell>{row.bay}</TableCell>
											<TableCell>Module</TableCell>
											<TableCell>{row.sequence}</TableCell>
											<TableCell>{row.facings}</TableCell>
										</TableRow>
									))
								}
								{
									this.props.sellingAssignments.map((row) => (
										<TableRow key={row.product.ean + '-' + row.bay.aisle.aisle + '-' + row.bay.bay + '-' + row.type}>
											<TableCell>{row.bay.aisle.aisle}</TableCell>
											<TableCell>{row.bay.bay}</TableCell>
											<TableCell>{row.type}</TableCell>
											<TableCell>-</TableCell>
											<TableCell>-</TableCell>
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

export default withStyles(useStyles)(ProductSellingsLocations);