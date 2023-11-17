import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = theme => ({
	loginInput: {
		minWidth: 400,
		marginBottom: 10
	},
});

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	onText = (e) => {
		this.setState({ ...this.state, [e.target.id]: e.target.value })
	}

	onKeypress = (e) => {
		if (e.key === 'Enter') {
			this.onSubmit();
		}
	}

	onSubmit = () => {
		const loginData = {
			username: this.state.username,
			password: this.state.password
		}

		this.props.login(loginData);
	}

	render() {
		const { classes } = this.props;
		if (this.props.apiToken) {
			return <Redirect to="/" />;
		}
		else {
			return (
				<Grid
				  container
				  spacing={0}
				  direction="column"
				  alignItems="center"
				  justify="center"
				  style={{ minHeight: '100vh' }}
				>
				  	<Grid item>
					  	<Collapse in={this.props.invalidCredentials}>
					  		<Alert severity="warning">Invalid Credentials Provided</Alert>
					  	</Collapse>
					  	<Collapse in={this.props.serverError}>
					  		<Alert severity="error">Something Went Wrong</Alert>
					  	</Collapse>
					    <Card>
							<CardContent>
								<Grid item>
									<Typography align="center" variant="h3" paragraph>Welcome</Typography>
									<Typography align="center" variant="body1" paragraph>Please enter your credentials.</Typography>
								</Grid>
								<Grid item>
									<TextField 
										id="username" 
										placeholder="Username" 
										variant="outlined" 
										type="text" 
										onChange={this.onText} 
										inputProps={{ onKeyDown: this.onKeypress }}
										className={classes.loginInput}
									/>
								</Grid>
								<Grid item>
									<TextField 
										id="password" 
										placeholder="Password" 
										variant="outlined" 
										type="password" 
										onChange={this.onText} 
										inputProps={{ onKeyDown: this.onKeypress }}
										className={classes.loginInput} 
									/>
								</Grid>
								<Grid item>
									<Button variant="contained" size="large" color="primary" onClick={this.onSubmit} className={classes.loginInput}>Login</Button>
								</Grid>
							</CardContent>
						</Card>
				  	</Grid>   
				</Grid>
			)
		}
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser,
	invalidCredentials: state.auth.invalidCredentials,
	serverError: state.auth.serverError
});

export default connect(mapStateToProps, { login })(withStyles(useStyles)(Login));
