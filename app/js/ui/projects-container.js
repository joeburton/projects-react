import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../store';
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
const dispatchToProps = function(state) {
    return {
        editProject (e) {
            e.preventDefault();

            let data = {
                companyId: e.target.getAttribute('data-company-id'),
                projectId: e.target.getAttribute('data-project-id'),
                open: true
            }

            store.dispatch(editProjectModal(data));
        },
        deleteProject (e) {
            e.preventDefault();

            let ele = e.target;
            let companyId = ele.getAttribute('data-company-id');
            let projectId = ele.getAttribute('data-project-id');
            let projectList = document.getElementById(companyId);
            let projectListItems = projectList.getElementsByTagName('li');
            let projectListItemsLength = projectListItems.length;

            api.deleteProject(companyId, projectId, projectListItemsLength);
        }
    }
}

ProjectContainer.propTypes = {
    projects: PropTypes.array,
    numberProjects: PropTypes.number,
    loggedin: PropTypes.bool
};

export default connect(stateToProps, dispatchToProps)(ProjectContainer)