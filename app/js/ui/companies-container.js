import React, {PropTypes} from 'react';
import Companies from './companies';
import { connect } from 'react-redux';

const CompaniesContainer = React.createClass({
    render() {
        return (
            <Companies {...this.props} />
        )
    }
});

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