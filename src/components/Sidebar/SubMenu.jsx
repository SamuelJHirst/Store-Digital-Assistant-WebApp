import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

const drawerWidth = 240;

const useStyles = theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		marginLeft: 120,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: theme.palette.primary.main,
		marginLeft: 120,
	},
	list: {
		marginTop: 20,
		color: 'white',
		fontWeight: 'bold',
	},
	backdrop: {
		marginLeft: 120,
	},
});

class SubMenu extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Drawer
				className={classes.drawer}
				open={this.props.show}
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor="left"
				ModalProps={{
					onBackdropClick: this.props.close
				}}
				BackdropProps={{
					classes: {
						root: classes.backdrop
					}
				}}
			>
				<List component="nav" className={classes.list}>
					{this.props.children}
					</List>
			</Drawer>
		)
	}
}

export default withStyles(useStyles)(SubMenu);