import React from 'react';
import CardWrapper from '../common/CardWrapper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class ModuleHeader extends React.Component {
	render() {
		return (
			<CardWrapper>
				<Box p={2}>
					<Grid container spacing={3}>
						<Grid item xs={8}>
								<Typography variant="h4">{this.props.module.name}</Typography>
								<Typography variant="subtitle2">{this.props.module.discriminator}</Typography>
						</Grid>
						<Grid item xs={4}>
							<Grid container spacing={3} direction="column" alignItems="flex-end" justify="center" style={{ minHeight: 86 }}>
								<Grid item>
									<Typography variant="body1" align="right">{
										this.props.module.startDate.split('-')[2].split('T')[0] 
										+ '/' + this.props.module.startDate.split('-')[1]
										+ '/' + this.props.module.startDate.split('-')[0]
										+ ' - ' +
										this.props.module.endDate.split('-')[2].split('T')[0] 
										+ '/' + this.props.module.endDate.split('-')[1]
										+ '/' + this.props.module.endDate.split('-')[0]
									}</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</CardWrapper>
		);
	}
}

export default ModuleHeader;