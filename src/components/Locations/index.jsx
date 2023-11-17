import React from 'react';
import LocationSearch from './LocationSearch';
import LocationNavigation from './LocationNavigation';
import LocationAislesList from './LocationAislesList';
import LocationBaysList from './LocationBaysList';
import LocationTypesList from './LocationTypesList';
import LocationAssignmentsList from './LocationAssignmentsList';
import LocationModulesList from './LocationModulesList';

class Locations extends React.Component {
	render() {
		return (
			<>
				<LocationSearch />
				<LocationNavigation />
				{
					this.props.show === "aisles" && <LocationAislesList />
				}
				{
					this.props.show === "bays" && <LocationBaysList />
				}
				{
					this.props.show === "types" && <LocationTypesList />
				}
				{
					this.props.show === "assignments" && <LocationAssignmentsList />
				}
				{
					this.props.show === "modules" && <LocationModulesList />
				}
			</>
		)
	}
}

export default Locations;