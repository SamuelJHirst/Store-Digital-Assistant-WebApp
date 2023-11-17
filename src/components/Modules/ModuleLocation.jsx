import React from 'react';
import axios from '../../helpers/axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { showBanner } from '../../actions/bannerActions';
import CardWrapper from '../common/CardWrapper';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

class ModuleLocation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: ''
		}
		if (this.props.bay) {
			this.state.location = this.props.bay.aisle.aisle + '-' + this.props.bay.bay;
		}
	}

	onChange = (e) => {
		const re = /^[0-9-]+$/;
		const value = e.target.value;
		if (value === '' || re.test(value)) this.setState({ ...this.state, location: e.target.value });
	}

	onKeypress = (e) => {
		if (e.key === 'Enter') {
			this.assign();
		}
	}

	assign = () => {
		if (!this.state.location) {
			this.props.showBanner('Invalid Location Provided', 'warning');
		} else {
			const aisle = this.state.location.split('-')[0];
			const bay = this.state.location.split('-')[1];
			axios.post('/module/site/' + this.props.apiUser.site.code + '/' + aisle + '/' + bay, {
				discriminator: this.props.discriminator
			}, { headers: { Authorization: this.props.apiToken } }).then((resp) => {
				this.props.showBanner('Module Successfully Assigned to Bay', 'success');
			}, (error) => {
				switch(error.response.data.description) {
					case 'Invalid Site Code, Aisle Number or Bay Number Provided':
						this.props.showBanner('Invalid Location Provided', 'warning');
						break;
					case 'Bay is Full':
						this.props.showBanner('Location is Full', 'warning');
						break;
					default:
						this.props.showBanner('Something Went Wrong', 'error');
				}
			});
		}
	}

	unassign = () => {
		axios.delete('/module/site/' + this.props.apiUser.site.code + '/' + this.props.bay.aisle.aisle + '/' + this.props.bay.bay + '/' + this.props.discriminator, { headers: { Authorization: this.props.apiToken } }).then((resp) => {
			this.setState({ ...this.state, location: '' });
			this.props.showBanner('Module Successfully Unassigned from Bay', 'success');
		}, (error) => {
			switch(error.response.data.description) {
                case 'Module Not Assigned to Bay':
                    this.props.showBanner('Module is Not Assigned to a Bay', 'warning');
					break;
                default:
                    this.props.showBanner('Something Went Wrong', 'error');
            }
		});
	}

	render() {
		return (
			<CardWrapper>
				<InputBase
					placeholder="Enter Location"
					style={{ width: 'calc(100% - 208px)' }}
					onChange={this.onChange}
					inputProps={{ onKeyDown: this.onKeypress }}
					value={this.state.location}
				/>
				<Button variant="contained" color="primary" style={{ marginRight: 10 }} onClick={this.assign}>Assign</Button>
				{
					this.props.bay
					?
					<Button variant="contained" color="secondary" onClick={this.unassign}>Unassign</Button>
					:
					<Button variant="contained" color="secondary" disabled>Unassign</Button>
				}	
			</CardWrapper>
		);
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser,
});

export default connect(mapStateToProps, { showBanner })(withRouter(ModuleLocation));