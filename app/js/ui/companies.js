import React from 'react';
import NumberProjects from './number-projects.js'

export default React.createClass({
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
