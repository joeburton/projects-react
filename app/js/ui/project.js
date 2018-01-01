import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Project extends React.Component {
    constructor(props) {
        super(props);

        this.getCompanyProjectId = this.getCompanyProjectId.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }
    getCompanyProjectId(e) {
        this.props.editProject(e, {
            companyId: this.props.id,
            projectId: this.props.project.id
        });
    }
    deleteProject(e) {
        this.props.deleteProject(e, {
            companyId: this.props.id,
            projectId: this.props.project.id
        });
    }
    render() {
        return (
            <li className="project">
                <div>Project: <span className='project-item project'> {this.props.project.project} </span></div>
                <div>URL: <span className='project-item link'> <a href={this.props.project.link} target='_blank'>{this.props.project.link}</a> </span></div>
                <div>Skills: <span className='project-item skills'> {this.props.project.skills} </span></div>
                <div>Description: <span className='project-item description'> {this.props.project.description} </span></div>
                {this.props.loggedin &&
                    <div className="admin-controls">
                        <a className="btn btn-default btn-primary btn-edit" href='#' onClick={this.getCompanyProjectId}>EDIT</a>
                        <a className="btn btn-default btn-danger" href='#' onClick={this.deleteProject}>DELETE</a>
                    </div>
                }
            </li>
        )
    }
};

Project.propTypes = {
    loggedin: PropTypes.bool,
    editProject: PropTypes.func,
    deleteProject: PropTypes.func
};

export default Project;
