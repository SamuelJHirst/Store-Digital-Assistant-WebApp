import React from 'react';
import axios from '../../helpers/axios';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { showBanner } from '../../actions/bannerActions';
import Loading from '../common/Loading';
import CardWrapper from '../common/CardWrapper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';

const useStyles = theme => ({
	tableCell: {
		padding: 8
	},
});

class Movements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ean: '',
            product: {},
            movements: [],
            quantity: 1,
            type: '',
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
        axios.get('/product/' + this.state.ean, { headers: { Authorization: this.props.apiToken } }).then((product) => {
            this.setState({ ...this.state, product: product.data.data, loading: false });
		}, (error) => {
			switch(error.response.data.description) {
                case 'Product Not Found':
                    this.setState({ ...this.state, loading: false });
                    this.props.showBanner('Invalid EAN Provided', 'warning');
					break;
                default:
                    this.setState({ ...this.state, loading: false });
                    this.props.showBanner('Something Went Wrong', 'error');
            }
		});
    }

    quantityChange = (e) => {
        if (!isNaN(Number(e.target.value)) && Number(e.target.value) > 0) {
            this.setState({ ...this.state, quantity: Number(e.target.value) });
        }
    }

    typeChange = (e) => {
        this.setState({ ...this.state, type: e.target.value });
    }
    
    add = (action) => {
        const movements = this.state.movements;
        movements.push({
            product: this.state.product,
            quantity: this.state.quantity,
            type: this.state.type,
            action: action
        });
        this.setState({ ...this.state, product: {}, movements: movements, quantity: 1, type: '' });
    }

    delete = (index) => {
        const movements = this.state.movements;
        movements.splice(index, 1);
        this.setState({ ...this.state, movements: movements });
    }

    submit = async () => {
        for (const movement of this.state.movements) {
            await axios.patch('/product/quantity/' + this.props.apiUser.site.code + '/' + movement.product.ean, {
                method: movement.action,
                quantity: movement.quantity
            }, { headers: { Authorization: this.props.apiToken } });
        }
        this.setState({ ...this.state, movements: [] });
        this.props.showBanner('Stock Movements Recorded', 'success');
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
                                onClick={this.search}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Box>
                {
                    this.state.product.ean && 
                    <CardWrapper>
                        <InputBase
                            placeholder="Quantity"
                            style={{ width: 'calc(50% - 96px)' }}
                            onChange={this.quantityChange}
                            value={this.state.quantity}
                        />
                        <Select
                            style={{ width: 'calc(50% - 96px)' }}
                            onChange={this.typeChange}
                            value={this.state.type}
                        >
                            <MenuItem value="Known Theft">Known Theft</MenuItem>
                            <MenuItem value="Store Own Use">Store Own Use</MenuItem>
                            <MenuItem value="Sample">Sample</MenuItem>
                            <MenuItem value="Damage">Damage</MenuItem>
                            <MenuItem value="Expired">Expired</MenuItem>
                        </Select>
                        <Button variant="contained" color="primary" onClick={() => { this.add('decrement') }} style={{ marginLeft: 20 }}>Add</Button>
                        <Button variant="contained" color="secondary" onClick={() => { this.add('increment') }} style={{ marginLeft: 5 }}>Reverse</Button>
                    </CardWrapper>
                }
                {
                    this.state.movements.length > 0 &&
                    <CardWrapper>
                        <Divider />
                        <Table>
                            <TableBody>
                                {
                                    this.state.movements.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell className={classes.tableCell}>
                                                <ListItemText primary={row.product.name} secondary={row.product.ean} />
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>{row.quantity}</TableCell>
                                            <TableCell className={classes.tableCell}>{row.type}{row.action === 'increment' && ' (Reversal)'}</TableCell>
                                            <TableCell className={classes.tableCell}>
                                                <IconButton 
                                                    color="primary"
                                                    onClick={() => { this.delete(index) }}

                                                >
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                                <TableRow>
                                    <TableCell></TableCell>
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

export default connect(mapStateToProps, { showBanner })(withStyles(useStyles)(Movements));