import React from 'react';
import Companies from './companies';
import { connect } from 'react-redux';

const CompaniesContainer = React.createClass({

    render() {
        return (
            <Companies {...this.props} />
        )
    }

});

const stateToProps = function(state) {
    return {
        companies: state.projectReducer.projects
    }
}

export default connect(stateToProps)(CompaniesContainer)