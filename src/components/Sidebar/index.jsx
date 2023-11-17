import React from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import LocationsSidebar from './LocationsSidebar';
import StockSidebar from './StockSidebar';
import CollectionsSidebar from './CollectionsSidebar';
import SettingsSidebar from './SettingsSidebar';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import GradeIcon from '@material-ui/icons/Grade';
import Grid from '@material-ui/core/Grid';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';

const drawerWidth = 120;

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
		backgroundColor: theme.palette.primary.dark,
	},
	sidebarButton: {
		color: 'white',
		margin: '3px 0',
	},
	sidebarIcon: {
		width: '100%',
	},
	sidebarTop: {
		position: 'absolute',
		top: 20,
	},
	sidebarBottom: {
		position: 'absolute',
		bottom: 20,
	},
});

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subMenu: null
		};
	}

	openSubMenu = (subMenu) => {
		this.setState({ ...this.state, subMenu: subMenu });
	}

	closeSubMenu = () => {
		this.setState({ ...this.state, subMenu: null });
	}

	render() {
		const { classes } = this.props;
		return (
			<nav className="Sidebar">
				<Drawer
					className={classes.drawer}
					variant="permanent"
					classes={{
						paper: classes.drawerPaper,
					}}
					anchor="left"
				>
					<Box className={classes.sidebarTop}>
						<Button component={Link} to="/" className={classes.sidebarButton} onClick={() => this.closeSubMenu()}>
							<Grid container justify="center">
							    <GradeIcon fontSize="large" className={classes.sidebarIcon} /> Products
							</Grid>
						</Button>
						<Button className={classes.sidebarButton} onClick={() => this.openSubMenu('locations')}>
							<Grid container justify="center">
							    <LocationOnIcon fontSize="large" className={classes.sidebarIcon} /> Locations
							</Grid>
						</Button>
						<Button className={classes.sidebarButton} onClick={() => this.openSubMenu('stock')}>
							<Grid container justify="center">
							    <AirportShuttleIcon fontSize="large" className={classes.sidebarIcon} /> Stock
							</Grid>
						</Button>
						<Button className={classes.sidebarButton} onClick={() => this.openSubMenu('collections')}>
							<Grid container justify="center">
							    <AssignmentIcon fontSize="large" className={classes.sidebarIcon} /> Collections
							</Grid>
						</Button>
					</Box>
					<Box className={classes.sidebarBottom}>
						<Button className={classes.sidebarButton} onClick={() => this.openSubMenu('settings')}>
							<Grid container justify="center">
							    <SettingsIcon fontSize="large" className={classes.sidebarIcon} /> Settings
							</Grid>
						</Button>
						{
							this.props.token
							?
							<Button className={classes.sidebarButton} onClick={() => { this.closeSubMenu(); this.props.logout()}}>
								<Grid container justify="center">
								    <PersonIcon fontSize="large" className={classes.sidebarIcon} /> Logout   
								</Grid>
							</Button>
							:
							<Link to="/login">
								<Button className={classes.sidebarButton} onClick={() => this.closeSubMenu()}>
									<Grid container justify="center">
									    <PersonIcon fontSize="large" className={classes.sidebarIcon} /> Login   
									</Grid>
								</Button>
							</Link>
						}
						
					</Box>
				</Drawer>
				<LocationsSidebar show={this.state.subMenu === 'locations'} close={this.closeSubMenu} />
				<StockSidebar show={this.state.subMenu === 'stock'} close={this.closeSubMenu} />
				<CollectionsSidebar show={this.state.subMenu === 'collections'} close={this.closeSubMenu} />
				<SettingsSidebar show={this.state.subMenu === 'settings'} close={this.closeSubMenu} />
			</nav>
		)
	}
}

export default connect(null, { logout })(withStyles(useStyles)(Sidebar));