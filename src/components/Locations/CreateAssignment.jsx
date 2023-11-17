import React from 'react';
import axios from '../../helpers/axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { showBanner } from '../../actions/bannerActions';
import Box from '@material-ui/core/Box';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

class CreateAssignment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ean: ''
		}
	}

	onChange = (e) => {
		this.setState({ ...this.state, ean: e.target.value });
	}

	onKeypress = (e) => {
		if (e.key === 'Enter') {
			this.onClick();
		}
	}

	onClick = () => {
		axios.post('/assignment/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle +  '/' + this.props.match.params.bay, {
            ean: this.state.ean,
            type: this.props.match.params.type
        }, { headers: { Authorization: this.props.apiToken } }).then((resp) => {
            this.props.update();
			this.props.showBanner('Product Successfully Assigned to Location', 'success');
		}, (error) => {
			switch(error.response.data.description) {
                case 'Invalid EAN Provided':
                    this.props.showBanner('Invalid EAN Provided', 'warning');
                    break;
                default:
                    this.props.showBanner('Something Went Wrong', 'error');
            }
		});
	}

	render() {
		return (
			<Box p={1}>
				<Paper>
					<Box pl={2}>
					  	<InputBase
					        placeholder="Enter EAN to Locate Product"
							style={{ width: 'calc(100% - 56px)' }}
							onChange={this.onChange}
							inputProps={{ onKeyDown: this.onKeypress }}
							value={this.state.location}
					    />
					    <IconButton 
							color="primary"
							onClick={this.onClick}
					    >
					        <CheckIcon />
					    </IconButton>
				    </Box>
			    </Paper>
			</Box>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withRouter(CreateAssignment));