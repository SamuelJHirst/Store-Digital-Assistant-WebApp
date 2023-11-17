import React from 'react';
import axios from '../../helpers/axios';
import { connect } from 'react-redux';
import CardWrapper from '../common/CardWrapper';
import ListItemLink from '../common/ListItemLink';
import Loading from '../common/Loading';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

class Collections extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            collections: [],
            loading: true
		};
	}

	componentDidMount() {
		axios.get('/collection/site/' + this.props.apiUser.site.code, { headers: { Authorization: this.props.apiToken } }).then((collections) => {
            collections = collections.data.data.filter(x => { return x.status === 'Not Started' || x.status === 'In Progress' });
            this.setState({ ...this.state, collections, loading: false });
		}, (error) => {
			this.setState({ ...this.state, loading: false });
			this.props.showBanner('Cannot Get Collections: Something Went Wrong', 'error');
		});
	}

	render() {
        if (this.state.loading) return <Loading />;
		return (
            <CardWrapper>
                <List>
                    {
                        this.state.collections.map(row => (
                            <>
                                <Divider />
                                <ListItemLink>
                                    <ListItemText primary={row.customer.title + ' ' + row.customer.firstName + ' ' + row.customer.lastName} secondary={row.products.length + ' Products'} />
                                    <ListItemText primary={row.status} secondary={
                                        'Collection Placed: '
                                        + row.placedAt.split('-')[2].split('T')[0] 
                                        + '/' + row.placedAt.split('-')[1]
                                        + '/' + row.placedAt.split('-')[0]
                                        + ' at ' + row.placedAt.split(':')[0].split('T')[1]
                                        + ':' + row.placedAt.split(':')[1]
                                    } />
                                </ListItemLink>
                                <Divider />
                            </>
                        ))
                    }
                </List>
            </CardWrapper>
		);
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser,
});

export default connect(mapStateToProps, null)(Collections);