import React from 'react';
import { connect } from 'react-redux';

const Login = React.createClass({
	getInitialState() {
		return {
			username: '',
			password: ''
		};
	},
	componentDidMount () {
		console.log(this.state);
    },
	handleUsernameChange(e) {
		this.setState({ username: e.target.value });
	},
	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	},
	render() {
		return (
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="/">Project Directory</a>
					</div>
					<div id="navbar" className="navbar-collapse collapse">
						{this.props.loggedin ? (
						<div className="navbar-form navbar-right clearfix">
							<a className="btn btn-default log-out pull-right" href="/logout">LOG OUT</a>
						</div>
						) : (
						<form className="navbar-form navbar-right" method="POST" action="auth">
							<div className="form-group">
								<input
									type='text'
									className="form-control"
									placeholder="Username"
									ref="username"
									value={this.state.username}
									name="username"
									onChange={this.handleUsernameChange}
									/> 
							</div>
							<div className="form-group">
								<input
									type='password'
									className="form-control"
									placeholder="Password"
									ref="password"
									name="password"
									value={this.state.password}
									onChange={this.handlePasswordChange}
									/> 
							</div>
							<button type="submit" className="btn btn-success">Sign in</button>
						</form>
						)}
					</div>
				</div>
			</nav>
		)
	}
});

const stateToProps = function(state) {
    return {
        loggedin: state.authReducer.authorised
    }
}

export default connect(stateToProps)(Login);