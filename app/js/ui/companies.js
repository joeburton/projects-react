import React from 'react';
import PropTypes from 'prop-types';
import NumberProjects from './number-projects.js'

const Companies = React.createClass({
    render: function() {
        return (
            <div className="container list-inline nick">
                <h3>Companies (<NumberProjects/>)</h3>
                <ul className="companies-container">
                    {this.props.companies.map((proj, i) => {
                        return (
                            <li key={i}><i>{proj.company}</i></li>
                        );
                    })}
                </ul>
            </div>
        )
    }
});

Companies.propTypes = {
    companies: PropTypes.array
};

export default Companies;
