import React from 'react';
import axios from '../../helpers/axios';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { showBanner } from '../../actions/bannerActions';
import Loading from '../common/Loading';
import CardWrapper from '../common/CardWrapper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = theme => ({
    tableCell: {
		padding: 8
	},
});

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ean: '',
            assignments: [],
            counts: [],
            loading: false
        };
    }

    onChange = (e) => {
		this.setState({ ...this.state, ean: e.target.value });
	}

	onKeypress = (e) => {
		if (e.key === 'Enter') {
			this.search();
		}
    }
    
    search = () => {
        this.setState({ ...this.state, loading: true });
        axios.get('/assignment/product/' + this.props.apiUser.site.code + '/' + this.state.ean, { headers: { Authorization: this.props.apiToken } }).then((assignments) => {
            if (assignments.data.data.length > 0) {
                this.setState({ ...this.state, assignments: assignments.data.data, counts: new Array(assignments.data.data.length).fill(0), loading: false });
            } else {
                this.setState({ ...this.state, loading: false });
                this.props.showBanner('Product Not Located', 'warning');
            }
		}, (error) => {
			switch(error.response.data.description) {
                case 'Invalid EAN Provided':
                    this.setState({ ...this.state, loading: false });
                    this.props.showBanner('Invalid EAN Provided', 'warning');
					break;
                default:
                    this.setState({ ...this.state, loading: false });
                    this.props.showBanner('Something Went Wrong', 'error');
            }
		});
    }

    quantityUpdate = (e) => {
        const counts = this.state.counts;
        if (!isNaN(Number(e.target.value))) {
            counts[e.target.dataset.index] = Number(e.target.value);
            this.setState({ ...this.state, counts: counts });
        }
    }

    submit = () => {
        const count = this.state.counts.reduce((a, b) => { return a + b }, 0);
        axios.patch('/product/quantity/' + this.props.apiUser.site.code + '/' + this.state.ean, {
            method: 'set',
            quantity: count
        }, { headers: { Authorization: this.props.apiToken } }).then((resp) => {
            this.props.showBanner('Product Quantity Successfully Updated', 'success');
        }, (error) => {
            this.props.showBanner('Something Went Wrong', 'error');
        });
    }

	render() {
        const { classes } = this.props;
        if (this.state.loading) return ( <Loading /> );
		return (
            <>
                <Box p={1}>
                    <Paper>
                        <Box pl={2}>
                            <InputBase
                                placeholder="Enter EAN"
                                style={{ width: 'calc(100% - 56px)' }}
                                onChange={this.onChange}
                                inputProps={{ onKeyDown: this.onKeypress }}
                            />
                            <IconButton 
                                color="primary"
                                onClick={this.props.search}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Box>
                {
                    this.state.assignments.length > 0 &&
                    <CardWrapper>
                        <Divider />
                        <Table>
                            <TableBody>
                                {
                                    this.state.assignments.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell className={classes.tableCell}>{ row.bay.aisle.aisle + '-' + row.bay.bay }</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>
                                                <InputBase
                                                    inputProps={{ 'data-index': index }}
                                                    placeholder="Quantity"
                                                    style={{ width: '100%' }}
                                                    onChange={this.quantityUpdate}
                                                    value={this.state.counts[index]}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={this.submit}>Submit</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardWrapper>
                }
            </>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withStyles(useStyles)(Stock));