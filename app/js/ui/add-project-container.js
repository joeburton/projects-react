import React from 'react';
import PropTypes from 'prop-types';
import AddProject from './add-project';
import { connect } from 'react-redux';
import axiosAjax from '../api/requests';
class AddProjectContainer extends React.Component {
    render () {
        return (
            <AddProject {...this.props} />
        )
    }
};

const stateToProps = function (state) {
    return {
        projects: state.projectReducer.projects
    }
}

const dispatchToProps = function (state) {
    return {
        disptachAddProject(e, data) {
            e.preventDefault();
            axiosAjax.addProject(data, this.projects);
        }
    }
}

AddProjectContainer.propTypes = {
    projects: PropTypes.array,
    disptachAddProject: PropTypes.func
};

export default connect(stateToProps, dispatchToProps)(AddProjectContainer)
