import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Project (props) {
    return (
        <li className="project">
            <div>Project: <span className='project-item project'> {props.project.project} </span></div>
            <div>URL: <span className='project-item link'> <a href={props.project.link} target='_blank'>{props.project.link}</a> </span></div>
            <div>Skills: <span className='project-item skills'> {props.project.skills} </span></div>
            <div>Description: <span className='project-item description'> {props.project.description} </span></div>
            {props.loggedin &&
                <div className="admin-controls">

                    <a className="btn btn-default btn-primary btn-edit" href='#' 
                    data-company-id={props.id} 
                    data-project-id={props.project.id} 
                    data-project={props.project.project} 
                    onClick={props.editProject}>EDIT</a>

                    <a className="btn btn-default btn-danger" href='#' 
                    data-company-id={props.id} 
                    data-project-id={props.project.id} 
                    data-project={props.project.project} 
                    onClick={props.deleteProject}>DELETE</a>

                </div>
            }
        </li>
    )
};

Project.propTypes = {
    loggedin: PropTypes.bool,
    editProject: PropTypes.func,
    deleteProject: PropTypes.func
};

export default Project;
