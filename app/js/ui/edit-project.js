import React from 'react';
import PropTypes from 'prop-types';

class EditProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            name: '',
            link: '',
            skills: '',
            description: ''
        };
        this.setValue = this.setValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getValues = this.getValues.bind(this);
        this.closeEditProjectOverlay = this.closeEditProjectOverlay.bind(this);
    }
    setValue(e) {

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
    }
    handleChange(e) {

        let fieldValues = this.getValues();

        this.setState({
            company: fieldValues.company,
            name: fieldValues.name,
            link: fieldValues.link,
            skills: fieldValues.skills,
            description: fieldValues.description
        });
    }
    getValues() {

        // wrapping el
        let projectEl = document.querySelector('.edit-fields');

        // get elements
        let companyId = projectEl.getAttribute('data-company-id');
        let projectId = projectEl.getAttribute('data-project-id');
        let company = projectEl.querySelector('.company');
        let name = projectEl.querySelector('.project-name');
        let link = projectEl.querySelector('.link');
        let skills = projectEl.querySelector('.skills');
        let description = projectEl.querySelector('.description');

        return {
            companyId: companyId,
            projectId: projectId,
            company: company.value,
            name: name.value,
            link: link.value,
            skills: skills.value,
            description: description.value
        };
    }
    closeEditProjectOverlay() {
        $('#edit').modal('hide');
    }
    render(state) {
        return (
            <div className="modal fade" id="edit" role="dialog" aria-labelledby="edit">
                <div className='edit-project modal-dialog'>
                    <div className='modal-content'>
                        <div className="modal-header">
                            <h5 className="modal-title" id="edit">Edit Project</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className='modal-body test edit-fields'>
                            <div className="form-group">
                                <input type='text' className='company form-control' value={this.state.company} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type='text' className='project-name form-control' value={this.state.name} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type='text' className='link form-control' value={this.state.link} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <textarea type='textarea' className='skills form-control' value={this.state.skills} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <textarea type='textarea' className='description form-control' value={this.state.description} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button name='button' className="btn btn-default" data-dismiss="modal">CANCEL</button>
                            <button name='button' className="btn btn-primary" onClick={this.setValue}>UPDATE</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

EditProject.propTypes = {
    disptachProjectUpdate: PropTypes.func
};

export default EditProject;