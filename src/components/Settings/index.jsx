import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CardWrapper from '../common/CardWrapper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = theme => ({
    tableCell: {
		padding: 8
	},
});

class Settings extends React.Component {
    render() {
		return (
            <CardWrapper>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell><strong>App Name</strong></TableCell>
                            <TableCell>Store Digital Colleague</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>App Version</strong></TableCell>
                            <TableCell>V1.0.0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Supported API Version</strong></TableCell>
                            <TableCell>V1.6.0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>User Name</strong></TableCell>
                            <TableCell>{this.props.apiUser.firstName + ' ' + this.props.apiUser.lastName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>User Login</strong></TableCell>
                            <TableCell>{this.props.apiUser.username}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>User Site</strong></TableCell>
                            <TableCell>{this.props.apiUser.site.name} ({this.props.apiUser.site.code})</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardWrapper>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, null)(withStyles(useStyles)(Settings));