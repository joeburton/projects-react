import React from 'react';
import Projects from './projects';
import { connect } from 'react-redux';
import axiosAjax from '../api/projects';

const ProjectContainer = React.createClass({
    render: function() {
        return (
            <Projects {...this.props} />
        )
    }
});

const stateToProps = function(state) {
    return {
        projects: state.projectReducer.projects,
        numberProjects: state.projectReducer.projects.length,
        loggedin: state.authReducer.authorised
    }
}

const dispatchToProps = function(state) {
    return {
        openEditInput (e, data) {
            e.preventDefault();

            // edit field elements
            let editProjectEle = document.querySelectorAll('.edit-project')[0],
                fieldsWrapper = editProjectEle.querySelectorAll('.edit-fields')[0],
                project = editProjectEle.querySelectorAll('.project-name')[0],
                company = editProjectEle.querySelectorAll('.company')[0],
                link = editProjectEle.querySelectorAll('.link')[0],
                skills = editProjectEle.querySelectorAll('.skills')[0],
                description = editProjectEle.querySelectorAll('.description')[0];

            // project values
            let projectContainerEl = e.target.parentElement.parentNode,
                projectContainerUl = projectContainerEl.parentNode,
                currentValueCompany = projectContainerUl.parentNode.querySelector('.company-name').textContent.split(':')[1],
                currentValueProject = projectContainerEl.getElementsByClassName('project')[0].textContent,
                currentValueLink = projectContainerEl.getElementsByClassName('link')[0].textContent,
                currentValueSkills = projectContainerEl.getElementsByClassName('skills')[0].textContent,
                currentValueDescription = projectContainerEl.getElementsByClassName('description')[0].textContent;

            // open edit project form overlay
            if (editProjectEle.classList.contains('hidden')) {
                editProjectEle.classList.remove('hidden');    
            }

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
        deleteProject(e) {
            e.preventDefault();

            let ele = e.target,
                companyId = ele.getAttribute('data-company-id'),
                projectId = ele.getAttribute('data-project-id'),
                projectList = document.getElementById(companyId),
                projectListItems = projectList.getElementsByTagName('li'),
                projectListItemsLength = projectListItems.length;

            axiosAjax.deleteProject(companyId, projectId, projectListItemsLength);
            
        }
    }
}

export default connect(stateToProps, dispatchToProps)(ProjectContainer)
