import React from 'react';

export default React.createClass({
    render () {
        return (
            <div className="add-project hidden">
                <div className="add-project-overlay"></div>
                <div className="add-fields-wrapper">
                    <div className="add-fields">
                        <a href="#" className="close-icon" onClick={this.closeOverlay}>x</a>                        

                        <input type="text" 
                        className="company"
                        placeholder="Company name" />

                        <input type="text"
                        className="project-name"
                        placeholder="Project name" />

                        <input type="text" 
                        className="link"
                        placeholder="Link" />

                        <textarea type="textarea" 
                        className="skills"
                        placeholder="Skills used" />

                        <textarea type="textarea" 
                        className="description"
                        placeholder="Description" />

                        <button name="button" onClick={this.addProject}>GO</button>
                    </div>
                </div>
            </div>
        )
    },

    addProject (e) {
        // wrapping el
        let projectEl = document.getElementsByClassName('add-fields')[0];
        
        // get elements
        let company = projectEl.querySelectorAll('.company')[0],
            name = projectEl.querySelectorAll('.project-name')[0],
            link = projectEl.querySelectorAll('.link')[0],
            skills = projectEl.querySelectorAll('.skills')[0],
            description = projectEl.querySelectorAll('.description')[0];

        this.props.disptachAddProject(e, {
            company: company.value,
            projects: [{
                project: name.value,
                link: link.value,
                skills: skills.value,
                description: description.value                
            }]
        });

        this.closeOverlay();
    },

    closeOverlay () {
        let addProjectEle = document.querySelectorAll('.add-project')[0];

        if (!addProjectEle.classList.contains('hidden')) {
            addProjectEle.classList.add("hidden");    
        }
    }

});