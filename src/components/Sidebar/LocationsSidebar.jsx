import React from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import SubMenu from './SubMenu';
import ListItemLink from '../common/ListItemLink';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = theme => ({
	listLink: {
		color: 'white',
	},
});

class LocationsSidebar extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<SubMenu {...this.props}>
				<ListItemLink component={Link} to="/locations" onClick={this.props.close}>
					<ListItemText primary="Location Management" className={classes.listLink} />
				</ListItemLink>
				<ListItemLink component={Link} to="/modules" onClick={this.props.close}>
					<ListItemText primary="Product Modules" className={classes.listLink} />
				</ListItemLink>
			</SubMenu>
		)
	}
}

export default withStyles(useStyles)(LocationsSidebar);