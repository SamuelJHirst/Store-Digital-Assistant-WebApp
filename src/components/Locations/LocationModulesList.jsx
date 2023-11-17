import React from 'react';
import axios from '../../helpers/axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { showBanner } from '../../actions/bannerActions';
import Loading from '../common/Loading';
import ModuleList from '../Modules/ModuleList';

class LocationAssignmentsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modules: [],
			loading: true
		};
	}

	componentDidMount() {
		axios.get('/module/site/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle +  '/' + this.props.match.params.bay, { headers: { Authorization: this.props.apiToken } }).then((modules) => {
			this.setState({ ...this.state, modules: modules.data.data, loading: false });
		}, (error) => {
			this.setState({ ...this.state, loading: false });
			this.props.showBanner('Cannot Get Assignments: Something Went Wrong', 'error');
		});
	}
	
	render() {
		if (this.state.loading) return ( <Loading /> );
		return (
			<ModuleList modules={this.state.modules} />
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withRouter(LocationAssignmentsList));