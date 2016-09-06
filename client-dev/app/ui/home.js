import React from 'react';

export default React.createClass({

	componentDidMount () {
		window.onhashchange = function() { 
			console.log('url change');
		}
	},

	render () {
		return (
			<b>Directory of passed companies and projects</b>
		)
	}

});
