import React from 'react';
import { Link } from 'react-router-dom';
import CardWrapper from '../common/CardWrapper';
import ListItemLink from '../common/ListItemLink';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

class Modules extends React.Component {
	render() {
		return (
			<CardWrapper style={{ padding: 0 }}>
				<List>
					<Divider />
					{
						this.props.modules.map(module => (
							<React.Fragment key={module.module.discriminator}>
								<ListItemLink component={Link} to={'/modules/' + module.module.discriminator}>
									<ListItemText primary={module.module.name} secondary={module.module.discriminator} />
									<ListItemText primary={
										module.module.startDate.split('-')[2].split('T')[0] 
										+ '/' + module.module.startDate.split('-')[1]
										+ '/' + module.module.startDate.split('-')[0]
										+ ' - ' +
										module.module.endDate.split('-')[2].split('T')[0] 
										+ '/' + module.module.endDate.split('-')[1]
										+ '/' + module.module.endDate.split('-')[0]
									} secondary={
										module.module.products.length + ' Products'
									} />
								</ListItemLink>
								<Divider />
							</React.Fragment>
						))
					}
				</List>
			</CardWrapper>
		);
	}
}

export default Modules;