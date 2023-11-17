import React from 'react';
import axios from '../../helpers/axios';
import { connect } from 'react-redux';
import TabPanel from '../common/TabPanel';
import ModuleList from './ModuleList';
import AppBar from "@material-ui/core/AppBar";
import Box from '@material-ui/core/Box';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

class Modules extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 0,
			liveModules: [],
			upcomingModules: [],
			overdueModules: []
		};
	}

	componentDidMount() {
		axios.get('/module/site/' + this.props.apiUser.site.code, { headers: { Authorization: this.props.apiToken } }).then((modules) => {
			const liveModules = [];
			const upcomingModules = [];
			const overdueModules = [];
			for (const module of modules.data.data) {
				const d = Date.parse(module.module.startDate);
				if (module.bay) liveModules.push(module)
				else if (d > Date.now()) upcomingModules.push(module);
				else overdueModules.push(module);
				this.setState({ ...this.state, liveModules, upcomingModules, overdueModules });
			}
		});
	}

	onChange = (e, newValue) => {
		this.setState({ ...this.state, tab: newValue });
	}

	render() {
		return (
			<>
				<Box p={1}>
					<AppBar position="static" color="default">
						<Tabs
							value={this.state.tab}
							onChange={this.onChange}
							indicatorColor="primary"
							textColor="primary"
							variant="fullWidth"
						>
							<Tab label="Live" />
							<Tab label="Upcoming" />
							<Tab label="Overdue" />
						</Tabs>
					</AppBar>
				</Box>
				<TabPanel value={this.state.tab} index={0}>
					<ModuleList modules={this.state.liveModules} />
				</TabPanel>
				<TabPanel value={this.state.tab} index={1}>
					<ModuleList modules={this.state.upcomingModules} />
				</TabPanel>
				<TabPanel value={this.state.tab} index={2}>
					<ModuleList modules={this.state.overdueModules} />
				</TabPanel>
			</>
		);
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser,
});

export default connect(mapStateToProps, null)(Modules);