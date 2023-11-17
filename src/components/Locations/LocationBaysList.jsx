import React from 'react';
import axios from '../../helpers/axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { showBanner } from '../../actions/bannerActions';
import Loading from '../common/Loading';
import CardWrapper from '../common/CardWrapper';
import ListItemLink from '../common/ListItemLink';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

class LocationBaysList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bays: [],
			loading: true
		};
	}

	componentDidMount() {
		axios.get('/bay/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle, { headers: { Authorization: this.props.apiToken } }).then((bays) => {
			this.setState({ ...this.state, bays: bays.data.data, loading: false });
		}, (error) => {
			this.setState({ ...this.state, loading: false });
			this.props.showBanner('Cannot Get Bays: Something Went Wrong', 'error');
		});
	}
	
	render() {
		if (this.state.loading) return ( <Loading /> );
		return (
			<CardWrapper>
				<List component="nav">
					{
						this.state.bays.length === 0
						?
						<ListItemText primary='No Bays Found' />
						:
						<Divider />
					}
					{
						this.state.bays.map(bay => (
							<React.Fragment key={bay.bay}>
								<ListItemLink component={Link} to={'/locations/' + bay.aisle.aisle + '/' + bay.bay}>
									<ListItemText primary={"Bay " + bay.bay} />
								</ListItemLink>
								<Divider />
							</React.Fragment>
						))
					}
				</List>	
			</CardWrapper>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withRouter(LocationBaysList));