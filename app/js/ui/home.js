import React from 'react';

export default React.createClass({
    componentDidMount () {
        window.onhashchange = function() { 
            console.log('url change');
        }
    },
    render () {
        return (
            <div className='container splash'>
                <h3>Directory of companies and projects</h3>
                <img src='/images/projects.png' />
            </div>
        )
    }
});

