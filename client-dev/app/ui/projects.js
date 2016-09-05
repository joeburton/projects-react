import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({
    
    render () {
        return (
            <div className='projects-page'>
                <h3>Projects ({this.props.numberProjects})</h3>
                <ul ref='projectscontainer'>
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
            <ul ref={'proj'+id}>
                {projects.map((proj, i) => {
                    return (
                        <li key={i}>
                        <div>Project: <span className='project-item project'> {proj.project} </span></div>
                        <div>URL: <span className='project-item link'> {proj.link} </span></div>
                        <div>Skills: <span className='project-item skills'> {proj.skills} </span></div>
                        <div>Description: <span className='project-item description'> {proj.description} </span></div>
                        <a href='#' data-id={id} data-project={proj.project} data-project-key={i} onClick={this.props.openEditInput}>edit</a> | <a href='#' data-id={id} data-project={proj.project} data-project-key={i} onClick={this.deleteProject}>delete</a>
                        </li>
                    );
                })}
            </ul>
        )
    },

    deleteProject(e) {

        var refID = e.target.getAttribute('ref')
        
        console.log(this.refs.refID);
        this.props.deleteProject(e);

    }

});