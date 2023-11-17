import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Products from './components/Products';
import Locations from './components/Locations';
import Modules from './components/Modules';
import ModuleInfo from './components/Modules/ModuleInfo';
import Deliveries from './components/Deliveries';
import DeliveryProducts from './components/Deliveries/DeliveryProducts';
import Collections from './components/Collections';
import Stock from './components/Stock';
import Movements from './components/Stock/Movements';
import Settings from './components/Settings';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

import './App.css';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Router>
					{
						this.props.apiUser && this.props.apiUser.username
						?
							<>
								<Sidebar token={this.props.apiToken} />
				                <Collapse in={this.props.banner.text} style={{ right: 0, position: 'absolute', width: 'calc(100% - 120px)' }}>
							  		<Alert severity={this.props.banner.severity}>{this.props.banner.text}</Alert>
							  	</Collapse>
				                <main className="withSidebar">
			                		<Switch>
			                			<Route exact path="/">
			                				<Products />
			                			</Route>
			                			<Route exact path="/locations">
			                				<Locations show="aisles" />
			                			</Route>
										<Route exact path="/locations/:aisle">
			                				<Locations show="bays" />
			                			</Route>
										<Route exact path="/locations/:aisle/:bay">
			                				<Locations show="types" />
			                			</Route>
										<Route exact path="/locations/:aisle/:bay/Modules">
			                				<Locations show="modules" />
			                			</Route>
										<Route exact path="/locations/:aisle/:bay/:type">
			                				<Locations show="assignments" />
			                			</Route>
										<Route exact path="/modules/">
											<Modules />
										</Route>
										<Route exact path="/modules/:discriminator">
											<ModuleInfo />
										</Route>
										<Route exact path="/deliveries/:type">
											<Deliveries />
										</Route>
										<Route exact path="/deliveries/:type/:delivery">
											<DeliveryProducts />
										</Route>
										<Route exact path="/collections">
											<Collections />
										</Route>
										<Route exact path="/stock/correct">
											<Stock />
										</Route>
										<Route exact path="/stock/movements">
											<Movements />
										</Route>
										<Route exact path="/settings">
											<Settings />
										</Route>
			                		</Switch>
				                </main>
							</>
						:
						<main>
							<Login />
						</main>
					}
				</Router>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser,
	banner: state.banner.banner
});

export default connect(mapStateToProps, null)(App);
