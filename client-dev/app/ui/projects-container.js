import React from 'react';
import Projects from './projects';
import { connect } from 'react-redux';

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
        numberProjects: state.projectReducer.projects.length
    }
}

const dispatchToProps = function() {
    return {
        openEditInput: (e) => {
            
            // edit field elements
            let editProjectEle = document.querySelectorAll('.edit-project')[0],
                fieldsWrapper = editProjectEle.querySelectorAll('.edit-fields')[0],
                project = editProjectEle.querySelectorAll('.project-name')[0],
                company = editProjectEle.querySelectorAll('.company')[0],
                link = editProjectEle.querySelectorAll('.link')[0],
                skills = editProjectEle.querySelectorAll('.skills')[0],
                description = editProjectEle.querySelectorAll('.description')[0];

            // project values
            let projectContainerEl = e.target.parentElement,
                // currentValueCompany = projectContainerEl.getElementsByClassName('company')[0],
                currentValueProject = projectContainerEl.getElementsByClassName('project')[0].textContent,
                currentValueLink = projectContainerEl.getElementsByClassName('link')[0].textContent,
                currentValueSkills = projectContainerEl.getElementsByClassName('skills')[0].textContent,
                currentValueDescription = projectContainerEl.getElementsByClassName('description')[0].textContent;

            if (editProjectEle.classList.contains('hidden')) {
                editProjectEle.classList.remove("hidden");    
            }

            // set edit field values
            // @TODO get vales from html or pass them as props? Need to research futher.
            // @TODO extend futher as there are now nested projects
            fieldsWrapper.setAttribute('data-id', e.target.getAttribute('data-id'));
            fieldsWrapper.setAttribute('data-project-key', e.target.getAttribute('data-project-key'));
            
            
            company.value = 'company name';
            project.value = currentValueProject;
            link.value = currentValueLink;
            skills.value = currentValueSkills;
            description.value = currentValueDescription;

        }
    }
}

export default connect(stateToProps, dispatchToProps)(ProjectContainer)
