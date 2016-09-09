import React from 'react';

export default React.createClass({
	render () {
	    return (
	        <a href="/logout">{(loggedin) ? 'LOGOUT' : 'LOGIN'}</a>
	    )
	}
});

