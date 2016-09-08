import React from 'react';

export default React.createClass({
    componentDidMount () {
        window.onhashchange = function() { 
            console.log('url change');
        }
    },
    render () {
        return (
            <div className='project-banner'>
                <b>Directory of companies and projects</b>
                <img src='/images/projects.png' />
            </div>
        )
    }
});

