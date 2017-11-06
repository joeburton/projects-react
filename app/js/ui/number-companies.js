import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NumCompanies extends React.Component {
    render () {
        return (
            <span>
                {this.props.numberProjects}
            </span>
        )
    }
};

const stateToProps = function(state) {
    return {
        numberProjects: state.projectReducer.projects.length
    }
}

NumCompanies.propTypes = {
    numberProjects: PropTypes.number
}

export default connect(stateToProps)(NumCompanies);