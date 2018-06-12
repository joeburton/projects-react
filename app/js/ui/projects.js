import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Project from './project';

class Projects extends React.Component {
    render() {

        let projects = this.props.projects.length ? this.props.projects : [];

        return (
            <div className='container'>
                <h3>Projects ({this.props.numberProjects})</h3>
                <ul className="projects-container" ref='projects-container'>
                    {projects.map((proj, i) => {
                        return (
                            <li className='company' key={i}>
                                <h4>{proj.company}</h4>
                                {this.renderProjects(proj.projects, proj._id, proj.projects.length)}
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }
    renderProjects(projects, companyId, numberProjects) {
        return (
            <ul>
                {projects.map((project, i) => {
                    return (
                        <Project key={i} project={project} numberProjects={numberProjects} deleteProject={this.props.deleteProject} editProject={this.props.editProject} companyId={companyId} loggedin={this.props.loggedin} />
                    );
                })}
            </ul>
        )
    }
};

Projects.propTypes = {
    numberProjects: PropTypes.number,
    projects: PropTypes.array,
    deleteProject: PropTypes.func,
    editProject: PropTypes.func,
    loggedin: PropTypes.bool
};

export default Projects;