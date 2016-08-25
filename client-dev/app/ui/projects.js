import React from 'react';

export default React.createClass({
    
    render () {
        return (
            <div className="projects-page">
                <h3>Projects ({this.props.numberProjects})</h3>
                <ul>
                    {this.props.projects.map((proj, i) => {
                        return (
                            <li key={i}>
                            <i><strong>{'Company: ' + proj.company}</strong></i>
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
            <ul>
                {projects.map((proj, i) => {
                    return (
                        <li key={i}>
                        <div>Project: <span className="project-item project"> {proj.project} </span></div>
                        <div>URL: <span className="project-item link"> {proj.link} </span></div>
                        <div>Skills: <span className="project-item skills"> {proj.skills} </span></div>
                        <div>Description: <span className="project-item description"> {proj.description} </span></div>
                        <a href="#" data-id={id} data-project={proj.project} data-project-key={i} onClick={this.props.openEditInput}>edit</a>
                        </li>
                    );
                })}
            </ul>
        )
        
    }

});