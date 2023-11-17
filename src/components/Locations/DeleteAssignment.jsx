import React from 'react';
import axios from '../../helpers/axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { showBanner } from '../../actions/bannerActions';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import IconButton from '@material-ui/core/IconButton';

class DeleteAssignment extends React.Component {
	onClick = () => {
		axios.delete('/assignment/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle +  '/' + this.props.match.params.bay +  '/' + this.props.match.params.type + '/' + this.props.ean, { headers: { Authorization: this.props.apiToken } }).then((resp) => {
            this.props.update();
            this.props.showBanner('Product Successfully Unassigned from Location', 'success');
		}, (error) => {
			this.props.showBanner('Something Went Wrong', 'error');
		});
	}

	render() {
		return (
			<IconButton 
				color="primary"
				onClick={this.onClick}
			>
				<DeleteForeverIcon />
			</IconButton>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withRouter(DeleteAssignment));