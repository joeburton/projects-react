import React from 'react';

export default React.createClass({
    getInitialState () {
        return {
            company: '',
            name: '',
            link: '',
            skills: '',
            description: ''
        };
    },
    render (state) {
        return (
            <div className='edit-project hidden'>
                <div className='edit-project-overlay'></div>
                <div className='edit-fields-wrapper'>
                    <div className='edit-fields' data-id={this.props.id}>
                        
                        <a href='#' className='close-icon' onClick={this.closeEditProjectOverlay}>x</a>                        

                        <input type='text' 
                        className='company'
                        value={this.state.company}
                        onChange={this.handleChange} />

                        <input type='text'
                        className='project-name'
                        value={this.state.name}
                        onChange={this.handleChange} />

                        <input type='text' 
                        className='link'
                        value={this.state.link}
                        onChange={this.handleChange} />

                        <textarea type='textarea' 
                        className='skills'
                        value={this.state.skills}
                        onChange={this.handleChange} />

                        <textarea type='textarea' 
                        className='description'
                        value={this.state.description}
                        onChange={this.handleChange} />

                        <button name='button' onClick={this.setValue}>GO</button>
                    </div>
                </div>
            </div>
        )
    },
    setValue (e) {
        let fieldValues = this.getValues();

    	this.setState({
            company: fieldValues.company,
            name: fieldValues.name,
            link: fieldValues.link,
            skills: fieldValues.skills,
            description: fieldValues.description
        });

        // send object to dispatch in container component.
        this.props.disptachProjectUpdate(e, {
            companyId: fieldValues.companyId,
            projectId: fieldValues.projectId,
            company: fieldValues.company,
            name: fieldValues.name,
            link: fieldValues.link,
            skills: fieldValues.skills,
            description: fieldValues.description
        });

        // close overlay
        this.closeEditProjectOverlay();
    },
    handleChange (e) {
        let fieldValues = this.getValues();
        
        this.setState({
            company: fieldValues.company,
            name: fieldValues.name,
            link: fieldValues.link,
            skills: fieldValues.skills,
            description: fieldValues.description
        });
    },
    getValues () {
        // wrapping el
        let projectEl = document.getElementsByClassName('edit-fields')[0],

            // get elements
            companyId = projectEl.getAttribute('data-company-id'),
            projectId = projectEl.getAttribute('data-project-id'),
            company = projectEl.querySelectorAll('.company')[0],
            name = projectEl.querySelectorAll('.project-name')[0],
            link = projectEl.querySelectorAll('.link')[0],
            skills = projectEl.querySelectorAll('.skills')[0],
            description = projectEl.querySelectorAll('.description')[0];

        return {
            companyId: companyId,
            projectId: projectId,
            company: company.value,
            name: name.value,
            link: link.value,
            skills: skills.value,
            description: description.value
        };      
    },
    closeEditProjectOverlay () {
        let editProjectEle = document.querySelectorAll('.edit-project')[0];

        if (!editProjectEle.classList.contains('hidden')) {
            editProjectEle.classList.add('hidden');    
        }
    }
});