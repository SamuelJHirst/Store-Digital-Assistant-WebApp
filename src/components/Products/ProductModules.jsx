import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CardWrapper from '../common/CardWrapper';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 'calc(100% - 120px)';

const useStyles = theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,

	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: theme.palette.primary.light,
	},
});

class ProductModules extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Drawer 
				anchor='right' 
				open={this.props.open}
				className={classes.drawer}
				classes={{
					paper: classes.drawerPaper,
				}}
				ModalProps={{
					onBackdropClick: this.props.close
				}}
			>
				<CardWrapper>
					<Link onClick={this.props.close}>
						<Typography color="textPrimary">Close Menu</Typography>
					</Link>
				</CardWrapper>
				<CardWrapper>
					<List>
						<Divider />
						{
							this.props.modules.length === 0 &&
							<>
								<ListItem>
									<ListItemText primary='No Modules Found for Product' />
								</ListItem>
							</>
						}
						{
							this.props.modules.map(row => (
								<>
									<ListItem>
										<ListItemText primary={row.module.name} secondary={row.module.discriminator} />
										<ListItemText primary={
											row.module.startDate.split('-')[2].split('T')[0] 
											+ '/' + row.module.startDate.split('-')[1]
											+ '/' + row.module.startDate.split('-')[0]
											+ ' - ' +
											row.module.endDate.split('-')[2].split('T')[0] 
											+ '/' + row.module.endDate.split('-')[1]
											+ '/' + row.module.endDate.split('-')[0]
										} secondary={
											row.bay 
											?
											'Located at: ' + row.bay.aisle.aisle + '-' + row.bay.bay
											:
											'Not Assigned to Bay'
										} />
									</ListItem>
									<Divider />
								</>
							))
						}						
					</List>
				</CardWrapper>
			</Drawer>
		);
	}
}

export default withStyles(useStyles)(ProductModules);