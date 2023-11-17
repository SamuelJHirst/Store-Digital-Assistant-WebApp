import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showBanner } from '../../actions/bannerActions';
import CardWrapper from '../common/CardWrapper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

class LocationNavigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			aisles: []
		};
	}
	
	render() {
		return (
            <CardWrapper>
                <Breadcrumbs>
                    <Link to='/locations'>
                        <Typography color="textPrimary">{this.props.apiUser.site.name}</Typography>
                    </Link>
                    {
                        this.props.match.params.aisle &&
                        <Link to={'/locations/' + this.props.match.params.aisle}>
                            <Typography color="textPrimary">{'Aisle ' + this.props.match.params.aisle}</Typography>
                        </Link>
                    }
                    {
                        this.props.match.params.bay &&
                        <Link to={'/locations/' + this.props.match.params.aisle + '/' + this.props.match.params.bay}>
                            <Typography color="textPrimary">{'Bay ' + this.props.match.params.bay}</Typography>
                        </Link>
                    }
                    {
                        this.props.match.params.type &&
                        <Link to={'#'}>
                            <Typography color="textPrimary">{this.props.match.params.type}</Typography>
                        </Link>
                    }
                </Breadcrumbs>
            </CardWrapper>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withRouter(LocationNavigation));