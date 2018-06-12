import React from 'react';

const directoryImage = require('../../images/projects.png');

class Home extends React.Component {
    componentDidMount () {
        console.log('Home: ', 'url change');
        window.onhashchange = function() { 
            console.log('url change');
        }
    }
    render () {
        return (
            <div className='container splash'>
                <h2>Project and Company Directory</h2>
                <img src={directoryImage} alt="Directory" />
            </div>
        )
    }
};

export default Home;

