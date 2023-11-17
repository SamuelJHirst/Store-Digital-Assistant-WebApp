import React from 'react';
import axios from '../../helpers/axios';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ModuleHeader from './ModuleHeader';
import ModuleLocation from './ModuleLocation';
import ModuleProducts from './ModuleProducts';
import Loading from '../common/Loading';
import CardWrapper from '../common/CardWrapper';
import Typography from '@material-ui/core/Typography';

class ModuleInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			module: {}
		}
	}

	componentDidMount() {
		axios.get('/module/site/' + this.props.apiUser.site.code + '/' + this.props.match.params.discriminator, { headers: { Authorization: this.props.apiToken } }).then((module) => {
			this.setState({ ...this.state, module: module.data.data })
		});
	}

	render() {
		if (!this.state.module.module) return ( <Loading /> );
		return (
			<>
				<ModuleHeader module={this.state.module.module} />
				<CardWrapper>
					<Link to='/modules'>
						<Typography color="textPrimary">Go Back</Typography>
					</Link>
				</CardWrapper>
				<ModuleLocation discriminator={this.state.module.module.discriminator} bay={this.state.module.bay} />
				<ModuleProducts products={this.state.module.module.products} />
			</>
		);
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser,
});

export default connect(mapStateToProps, null)(withRouter(ModuleInfo));