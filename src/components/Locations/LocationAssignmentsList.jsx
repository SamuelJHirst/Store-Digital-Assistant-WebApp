import React from 'react';
import axios from '../../helpers/axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { showBanner } from '../../actions/bannerActions';
import Loading from '../common/Loading';
import CardWrapper from '../common/CardWrapper';
import CreateAssignment from './CreateAssignment';
import DeleteAssignment from './DeleteAssignment';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class LocationAssignmentsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			assignments: [],
			loading: true
		};
	}

	componentDidMount() {
		this.populateList();
	}

	populateList = () => {
		axios.get('/assignment/location/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle +  '/' + this.props.match.params.bay +  '/' + this.props.match.params.type, { headers: { Authorization: this.props.apiToken } }).then((assignments) => {
			this.setState({ ...this.state, assignments: assignments.data.data, loading: false });
		}, (error) => {
			this.setState({ ...this.state, loading: false });
			this.props.showBanner('Cannot Get Assignments: Something Went Wrong', 'error');
		});
	}
	
	render() {
		if (this.state.loading) return ( <Loading /> );
		return (
			<>
				<CreateAssignment update={this.populateList} />
				<CardWrapper>
					<List component='nav'>
						{
							this.state.assignments.length === 0
							?
							<ListItemText primary='No Products Found' />
							:
							<Divider />
						}
						{
							this.state.assignments.map(assignment => (
								<React.Fragment key={assignment.product.ean + '-' + assignment.bay.aisle.aisle + '-' + assignment.bay.bay + '-' + assignment.type}>
									<ListItem>
										<ListItemText primary={assignment.product.name} secondary={assignment.product.ean} />
										<DeleteAssignment update={this.populateList} ean={assignment.product.ean} />
									</ListItem>
									<Divider />
								</React.Fragment>
							))
						}
					</List>	
				</CardWrapper>
			</>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withRouter(LocationAssignmentsList));