import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Project from './project';

class Projects extends React.Component {
    render () {
        return (
            <div className='container'>
                <h3>Projects ({this.props.numberProjects})</h3>
                <ul className="projects-container" ref='projects-container'>
                    {this.props.projects.map((proj, i) => {
                        return (
                            <li className='company' key={i}>
                            <i className='company-name'><strong>{'Company: ' + proj.company}</strong></i>
                            {this.renderProjects(proj.projects, proj._id)}
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }
    renderProjects (projects, id) {
        return (
            <ul id={id}>
                {projects.map((project, i) => {
                    return (
                        <Project key={i} project={project} deleteProject={this.props.deleteProject} editProject={this.props.editProject} id={id} loggedin={this.props.loggedin} />
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