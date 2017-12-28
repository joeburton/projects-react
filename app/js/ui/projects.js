import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

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
                        <li  key={i} className="project">
                        <div>Project: <span className='project-item project'> {project.project} </span></div>
                        <div>URL: <span className='project-item link'> <a href={project.link} target='_blank'>{project.link}</a> </span></div>
                        <div>Skills: <span className='project-item skills'> {project.skills} </span></div>
                        <div>Description: <span className='project-item description'> {project.description} </span></div>
                        {this.props.loggedin &&
                            <div className="admin-controls">

                                <a className="btn btn-default btn-primary btn-edit" href='#' 
                                data-company-id={id} 
                                data-project-id={project.id} 
                                data-project={project.project} 
                                onClick={this.props.editProject}>EDIT</a>
            
                                <a className="btn btn-default btn-danger" href='#' 
                                data-company-id={id} 
                                data-project-id={project.id} 
                                data-project={project.project} 
                                onClick={this.props.deleteProject}>DELETE</a>
            
                            </div>
                        }
                    </li>
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