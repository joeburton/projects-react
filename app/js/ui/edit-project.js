import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class EditProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                company: '',
                name: '',
                link: '',
                skills: '',
                description: ''
            }
        };

        this.setValue = this.setValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getValues = this.getValues.bind(this);
    }
    populateForm() {

        // // edit form fields elements
        // let editProjectEle = document.querySelector('.edit-project');
        // let fieldsWrapper = editProjectEle.querySelector('.edit-fields');
        // let company = editProjectEle.querySelector('.company');
        // let project = editProjectEle.querySelector('.project-name');
        // let link = editProjectEle.querySelector('.link');
        // let skills = editProjectEle.querySelector('.skills');
        // let description = editProjectEle.querySelector('.description');

        // // get selected parent DOM element
        // let projectContainerUL = e.target.parentElement.parentNode.parentNode;

        // // get selected project values
        // let currentValueCompany = projectContainerUL.parentNode.querySelector('.company-name').textContent.split(':')[1];
        // let currentValueProject = projectContainerUL.getElementsByClassName('project')[0].textContent;
        // let currentValueLink = projectContainerUL.getElementsByClassName('link')[0].textContent;
        // let currentValueSkills = projectContainerUL.getElementsByClassName('skills')[0].textContent;
        // let currentValueDescription = projectContainerUL.getElementsByClassName('description')[0].textContent;

        // // set edit field data attribute values
        // fieldsWrapper.setAttribute('data-company-id', e.target.getAttribute('data-company-id'));
        // fieldsWrapper.setAttribute('data-project-id', e.target.getAttribute('data-project-id'));

        // // set edit form field values
        // company.value = currentValueCompany.trim();
        // project.value = currentValueProject.trim();
        // link.value = currentValueLink.trim();
        // skills.value = currentValueSkills.trim();
        // description.value = currentValueDescription.trim();

        console.log('component did mount');
    }
    componentDidUpdate() {

        (this.props.open) ? $('#edit').modal('show') : $('#edit').modal('hide');

        console.log('company id', this.props.companyId);
        console.log('project id', this.props.projectId);
        console.log('company', this.props.company);

        let project = _.find(this.props.company.projects, 'id', this.props.projectId);

        console.log('project', project);
    }
    setValue(e) {

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

    }
    handleChange(e) {

        e.preventDefault();

        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = e.target.value;

        formValues[name] = value;

        this.setState({ formValues });
    }
    getValues() {

        // wrapping el
        let projectEl = document.querySelector('.edit-fields');

        // get elements
        let companyId = projectEl.getAttribute('data-company-id');
        let projectId = projectEl.getAttribute('data-project-id');
        // let company = projectEl.querySelector('.company');
        // let name = projectEl.querySelector('.project-name');
        // let link = projectEl.querySelector('.link');
        // let skills = projectEl.querySelector('.skills');
        // let description = projectEl.querySelector('.description');

        return {
            companyId: companyId,
            projectId: projectId,
            company: this.state.company,
            name: this.state.name,
            link: this.state.link,
            skills: this.state.skills,
            description: this.state.description
        };
    }
    render(state) {
        return (
            <div className="modal fade" id="edit" role="dialog" aria-labelledby="edit">
                <div className='edit-project modal-dialog'>
                    <div className='modal-content'>
                        <div className="modal-header">
                            <h5 className="modal-title" id="edit">Edit Project</h5>
                            <button type="button" className="close" aria-label="Close" onClick={this.props.closeEditProjectModal}><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className='modal-body test edit-fields'>
                            <div className="form-group">
                                <input type='text' className='company form-control' name='company' value={this.state.formValues['company']} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type='text' className='project-name form-control' name='name' value={this.state.formValues['name']} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type='text' className='link form-control' name='link' value={this.state.formValues['link']} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <textarea type='textarea' className='skills form-control' name='skills' value={this.state.formValues['skills']} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <textarea type='textarea' className='description form-control' name='description' value={this.state.formValues['description']} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button name='button' className="btn btn-default" onClick={this.props.closeEditProjectModal}>CANCEL</button>
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