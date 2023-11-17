import React from 'react';
import axios from '../../helpers/axios';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Loading from '../common/Loading';
import CardWrapper from '../common/CardWrapper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
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

class ProductCheckStock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sites: [],
			loading: true,
			quantity: null
		};
	}

	componentDidMount() {
		axios.get('/site', { headers: { Authorization: this.props.apiToken } }).then((sites) => {
			sites = sites.data.data.filter((x) => { return x.type === 'Store'; });
			this.setState({ ...this.state, sites, loading: false })
		});
	}

	onChange = (e) => {
		this.setState({ ...this.state, loading: true });
		axios.get('/product/quantity/' + this.state.sites[e.target.value].code + '/' + this.props.ean, { headers: { Authorization: this.props.apiToken } }).then((quantity) => {
			this.setState({ ...this.state, quantity: { quantity: quantity.data.data.quantity, site: this.state.sites[e.target.value] }, loading: false });
		});
	}

	render() {
		const { classes } = this.props;
		if (this.state.loading) return <Loading />;
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
					<Autocomplete
						options={this.state.sites}
						getOptionLabel={(site) => site.name}
						renderInput={(params) => <TextField {...params} label="Enter Store Name" variant="outlined" />}
						onChange={this.onChange}
					/>
				</CardWrapper>
				{
					this.state.quantity &&
					<CardWrapper>
						<Typography color="textPrimary">There are {this.state.quantity.quantity} units available at {this.state.quantity.site.name}.</Typography>
					</CardWrapper>
				}
			</Drawer>
		);
	}
}

export default withStyles(useStyles)(ProductCheckStock);