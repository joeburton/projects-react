import React from 'react';
import PropTypes from 'prop-types';
import Companies from './companies';
import { connect } from 'react-redux';

class CompaniesContainer extends React.Component {
    render () {
        return (
            <Companies {...this.props} />
        )
    }
};

// pass down data as props
const stateToProps = function(state) {
    return {
        companies: state.projectReducer.projects
    }
}

CompaniesContainer.propTypes = {
    companies: PropTypes.array
};

export default connect(stateToProps)(CompaniesContainer)