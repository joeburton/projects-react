import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

const Projects = React.createClass({
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
    },
    renderProjects (projects, id) {
        return (
            <ul id={id}>
                {projects.map((proj, i) => {
                    return (
                        <li key={i} className="project">
                            <div>Project: <span className='project-item project'> {proj.project} </span></div>
                            <div>URL: <span className='project-item link'> <a href={proj.link} target='_blank'>{proj.link}</a> </span></div>
                            <div>Skills: <span className='project-item skills'> {proj.skills} </span></div>
                            <div>Description: <span className='project-item description'> {proj.description} </span></div>
                            { this.props.loggedin &&
                                <div className="admin-controls">
                                    <a className="btn btn-default btn-primary btn-edit" href='#' data-company-id={id} data-project-id={proj.id} data-project={proj.project} data-project-key={i} onClick={this.props.openEditInput}>EDIT</a>
                                    <a className="btn btn-default btn-danger" href='#' data-company-id={id}  data-project-id={proj.id} data-project={proj.project} data-project-key={i} onClick={this.deleteProject}>DELETE</a>
                                </div>
                              }
                        </li>
                    );
                })}
            </ul>
        )
    },
    deleteProject(e) {
        this.props.deleteProject(e);
    }
});

Projects.propTypes = {
    numberProjects: PropTypes.number,
    projects: PropTypes.array,
    deleteProject: PropTypes.func,
    loggedin: PropTypes.bool,
    openEditInput: PropTypes.func
};

export default Projects;