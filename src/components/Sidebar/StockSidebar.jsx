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

class StockSidebar extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<SubMenu {...this.props}>
				<ListItemLink component={Link} to="/deliveries/inbound" href="#" onClick={this.props.close}>
					<ListItemText primary="Inbound Stock" className={classes.listLink} />
				</ListItemLink>
				<ListItemLink component={Link} to="/deliveries/outbound" href="#" onClick={this.props.close}>
					<ListItemText primary="Outbound Stock" className={classes.listLink} />
				</ListItemLink>
				<ListItemLink component={Link} to="/stock/correct" href="#" onClick={this.props.close}>
					<ListItemText primary="Correct Stock Count" className={classes.listLink} />
				</ListItemLink>
				<ListItemLink component={Link} to="/stock/movements" href="#" onClick={this.props.close}>
					<ListItemText primary="Stock Movements" className={classes.listLink} />
				</ListItemLink>
			</SubMenu>
		)
	}
}

export default withStyles(useStyles)(StockSidebar);