import React from 'react';
import PropTypes from 'prop-types';
import Projects from './projects';
import { connect } from 'react-redux';
import axiosAjax from '../api/requests';

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
        openEditInput (e, data) {
            e.preventDefault();

            $('#edit').modal('show');
            
            // edit form fields elements
            let editProjectEle = document.querySelector('.edit-project');
            let fieldsWrapper = editProjectEle.querySelector('.edit-fields');
            let project = editProjectEle.querySelector('.project-name');
            let company = editProjectEle.querySelector('.company');
            let link = editProjectEle.querySelector('.link');
            let skills = editProjectEle.querySelector('.skills');
            let description = editProjectEle.querySelector('.description');

            // get edit form field values
            let projectContainerEl = e.target.parentElement.parentNode;
            let projectContainerUl = projectContainerEl.parentNode;
            let currentValueCompany = projectContainerUl.parentNode.querySelector('.company-name').textContent.split(':')[1];
            let currentValueProject = projectContainerEl.getElementsByClassName('project')[0].textContent;
            let currentValueLink = projectContainerEl.getElementsByClassName('link')[0].textContent;
            let currentValueSkills = projectContainerEl.getElementsByClassName('skills')[0].textContent;
            let currentValueDescription = projectContainerEl.getElementsByClassName('description')[0].textContent;

            // open edit project form overlay
            // if (editProjectEle.classList.contains('hidden')) {
            //     editProjectEle.classList.remove('hidden');    
            // }

            // set edit field values
            fieldsWrapper.setAttribute('data-company-id', e.target.getAttribute('data-company-id'));
            fieldsWrapper.setAttribute('data-project-id', e.target.getAttribute('data-project-id'));

            // set edit field values
            company.value = currentValueCompany.trim();
            project.value = currentValueProject.trim();
            link.value = currentValueLink.trim();
            skills.value = currentValueSkills.trim();
            description.value = currentValueDescription.trim();
        },
        deleteProject (e) {
            e.preventDefault();

            let ele = e.target;
            let companyId = ele.getAttribute('data-company-id');
            let projectId = ele.getAttribute('data-project-id');
            let projectList = document.getElementById(companyId);
            let projectListItems = projectList.getElementsByTagName('li');
            let projectListItemsLength = projectListItems.length;

            axiosAjax.deleteProject(companyId, projectId, projectListItemsLength);
        }
    }
}

ProjectContainer.propTypes = {
    projects: PropTypes.array,
    numberProjects: PropTypes.number,
    loggedin: PropTypes.bool,
    openEditInput: PropTypes.func,
    deleteProject: PropTypes.func
};

export default connect(stateToProps, dispatchToProps)(ProjectContainer)
