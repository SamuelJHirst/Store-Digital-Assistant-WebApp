import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = theme => ({
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
});

class DeliveryProducts extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Backdrop className={classes.backdrop} open>
                <CircularProgress color='inherit' />
            </Backdrop>
        );
	}
}

export default withStyles(useStyles)(DeliveryProducts);