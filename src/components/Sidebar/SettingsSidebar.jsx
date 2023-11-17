import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import SubMenu from './SubMenu';
import ListItemLink from '../common/ListItemLink';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = theme => ({
	listLink: {
		color: 'white',
	},
});

class SettingsSidebar extends React.Component {
	render() {
		return (
			<SubMenu {...this.props}>
				<ListItemLink component={Link} to="/settings" href="#" onClick={this.props.close}>
					<ListItemText primary="General Information" />
				</ListItemLink>
			</SubMenu>
		)
	}
}

export default withStyles(useStyles)(SettingsSidebar);