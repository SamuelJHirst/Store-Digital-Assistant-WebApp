import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = theme => ({
    cardContent: {
        "&:last-child": {
            paddingTop: 8,
            paddingBottom: 8
        }
    },
});

class DeliveryProducts extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Box p={1} style={this.props.style}>
                <Card>
                    <CardContent className={classes.cardContent}>
                        {this.props.children}
                    </CardContent>
                </Card>
            </Box>
        );
	}
}

export default withStyles(useStyles)(DeliveryProducts);