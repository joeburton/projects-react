import React from 'react';

export default React.createClass({
	getInitialState () {
		return {username: '', password: ''};
	},
	handleUsernameChange (e) {
		this.setState({username: e.target.value});
		console.log(this.state);
	},
	handlePasswordChange (e) {
		this.setState({password: e.target.value});
		console.log(this.state);
	},
	render () {
	    return (
	        <form className='log-in' method="POST" action="auth">
        		<input
		          type='text'
		          ref="username"
		          value={this.state.username}
		          name="username"
		          onChange={this.handleUsernameChange}
		        />
        		<input
		          type='password'
		          ref="password"
		          name="password"
		          value={this.state.password}
		          onChange={this.handlePasswordChange}
		        />
	        	<button name='button'>LOGIN</button>
	        </form>
	    )
	}
});

