import React from 'react';
import axios from '../../helpers/axios';
import { withRouter, Link } from 'react-router-dom';
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
			bay: {},
			modules: [],
			loading: true
		};
	}

	componentDidMount() {
		axios.get('/bay/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle +  '/' + this.props.match.params.bay, { headers: { Authorization: this.props.apiToken } }).then((bay) => {
			axios.get('/module/site/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle +  '/' + this.props.match.params.bay, { headers: { Authorization: this.props.apiToken } }).then((modules) => {
				this.setState({ ...this.state, bay: bay.data.data, modules: modules.data.data, loading: false });
			}, (error) => {
				this.setState({ ...this.state, loading: false });
				this.props.showBanner('Cannot Get Bay: Bay Not Found', 'error');
			});
		}, (error) => {
			this.setState({ ...this.state, loading: false });
			this.props.showBanner('Cannot Get Bay: Bay Not Found', 'error');
		});
	}
	
	render() {
		if (this.state.loading) return ( <Loading /> );
		return (
			this.state.bay.bay
			?
			<CardWrapper>
				<List component='nav'>
					<Divider />
					{
						this.state.modules.length > 0 &&
						<>
							<ListItemLink component={Link} to={'/locations/' + this.state.bay.aisle.aisle + '/' + this.state.bay.bay + '/Modules'}>
								<ListItemText primary={'Aisle ' + this.state.bay.aisle.aisle + ', Bay ' + this.state.bay.bay + ' - Modules'} />
							</ListItemLink>
							<Divider />
						</>
					}
					{
						this.state.bay.allowsMultiLocation && 
						<>
						<ListItemLink component={Link} to={'/locations/' + this.state.bay.aisle.aisle + '/' + this.state.bay.bay + '/Multi-Location'}>
							<ListItemText primary={'Aisle ' + this.state.bay.aisle.aisle + ', Bay ' + this.state.bay.bay + ' - Multi-Locations'} />
						</ListItemLink>
						<Divider />
						</>
					}
					{
						this.state.bay.allowsClearance && 
						<>
						<ListItemLink component={Link} to={'/locations/' + this.state.bay.aisle.aisle + '/' + this.state.bay.bay + '/Clearance'}>
							<ListItemText primary={'Aisle ' + this.state.bay.aisle.aisle + ', Bay ' + this.state.bay.bay + ' - Clearance'} />
						</ListItemLink>
						<Divider />
						</>
					}
					{
						this.state.bay.allowsDisplay && 
						<>
						<ListItemLink component={Link} to={'/locations/' + this.state.bay.aisle.aisle + '/' + this.state.bay.bay + '/Display'}>
							<ListItemText primary={'Aisle ' + this.state.bay.aisle.aisle + ', Bay ' + this.state.bay.bay + ' - Display'} />
						</ListItemLink>
						<Divider />
						</>
					}
					{
						this.state.bay.allowsOverstock && 
						<>
						<ListItemLink component={Link} to={'/locations/' + this.state.bay.aisle.aisle + '/' + this.state.bay.bay + '/Overstock'}>
							<ListItemText primary={'Aisle ' + this.state.bay.aisle.aisle + ', Bay ' + this.state.bay.bay + ' - Overstock'} />
						</ListItemLink>
						<Divider />
						</>
					}
					{
						this.state.bay.allowsTopstock && 
						<>
						<ListItemLink component={Link} to={'/locations/' + this.state.bay.aisle.aisle + '/' + this.state.bay.bay + '/Topstock'}>
							<ListItemText primary={'Aisle ' + this.state.bay.aisle.aisle + ', Bay ' + this.state.bay.bay + ' - Topstock'} />
						</ListItemLink>
						<Divider />
						</>
					}
					{
						this.state.bay.allowsStockroom && 
						<>
						<ListItemLink component={Link} to={'/locations/' + this.state.bay.aisle.aisle + '/' + this.state.bay.bay + '/Stockroom'}>
							<ListItemText primary={'Aisle ' + this.state.bay.aisle.aisle + ', Bay ' + this.state.bay.bay + ' - Stockroom'} />
						</ListItemLink>
						<Divider />
						</>
					}
				</List>	
			</CardWrapper>
			:
			<></>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withRouter(LocationBaysList));