import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

class ProductSearch extends React.Component {
	render() {
		return (
			<Box p={1}>
				<Paper>
					<Box pl={2}>
					  	<InputBase
					        placeholder="Enter EAN"
					        style={{ width: 'calc(100% - 56px)' }}
					        onChange={this.props.onChange}
					        inputProps={{ onKeyDown: this.props.onKeypress }}
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
		)
	}
}

export default ProductSearch;