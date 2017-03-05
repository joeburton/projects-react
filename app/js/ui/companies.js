import React from 'react';

export default React.createClass({
    render: function() {
        return (
            <div className="container">
                <h3>Companies</h3>
                <ul>
                    {this.props.companies.map((proj, i) => {
                        return (
                            <li key={i}>{proj.company}</li>
                        );
                    })}
                </ul>
            </div>
        )
    }
});
