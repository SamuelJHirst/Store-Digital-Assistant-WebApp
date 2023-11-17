import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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

class ModuleProducts extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<CardWrapper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableCell}>
								<Typography variant="h6">Product</Typography>
							</TableCell>
							<TableCell className={classes.tableCell}>
								<Typography variant="h6">Sequence</Typography>
							</TableCell>
							<TableCell className={classes.tableCell}>
								<Typography variant="h6">Facings</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							this.props.products.map((row, index) => (
								<TableRow key={index}>
									<TableCell className={classes.tableCell}>
										<ListItemText primary={row.product.name} secondary={row.product.ean} />
									</TableCell>
									<TableCell className={classes.tableCell}>{index + 1}</TableCell>
									<TableCell className={classes.tableCell}>{row.facings}</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</CardWrapper>
		);
	}
}

export default withStyles(useStyles)(ModuleProducts);