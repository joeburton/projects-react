import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editProjectModal } from '../actions/actions';

import api from '../api/api';
import Projects from './projects';

class ProjectContainer extends React.Component {
    render() {
        return <Projects {...this.props} />
    }
};

// pass in state data as props data
const stateToProps = function(state) {
    return {
        projects: state.projectReducer.projects,
        numberProjects: state.projectReducer.projects.length,
        loggedin: state.authReducer.authorised
    }
}

// pass down events as props
const dispatchToProps = function(dispatch) {
    return {
        editProject (e, data) {
            e.preventDefault();

            data.open = true;
            dispatch(editProjectModal(data));
        },
        deleteProject (e, data) {
            e.preventDefault();

            let projectList = document.getElementById(data.companyId);
            let projectListItems = projectList.getElementsByTagName('li');
            let projectListItemsLength = projectListItems.length;

            api.deleteProject(data.companyId, data.projectId, projectListItemsLength);
        }
    }
}

ProjectContainer.propTypes = {
    projects: PropTypes.array,
    numberProjects: PropTypes.number,
    loggedin: PropTypes.bool,
    editProject: PropTypes.func,
    deleteProject: PropTypes.func
};

export default connect(stateToProps, dispatchToProps)(ProjectContainer)