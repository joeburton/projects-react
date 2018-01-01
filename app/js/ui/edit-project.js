import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class EditProject extends React.Component {
    constructor(props) {
        super(props);

        let project = _.find(this.props.company.projects, 'id', this.props.projectId);

        this.state = {
            companyId: this.props.company._id,
            projectId: project.id,
            formValues: {
                company: this.props.company.company,
                name: project.project,
                link: project.link,
                skills: project.skills,
                description: project.description
            }
        };

        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount () {

        let self = this;

        $("#edit").on("hidden.bs.modal", function () {
            self.props.closeEditProjectModal();
        });

        $('#edit').modal('show');
    }
    update(e) {

        this.props.disptachProjectUpdate(e, {
            companyId: this.state.companyId,
            projectId: this.state.projectId,
            company: this.state.formValues.company,
            name: this.state.formValues.name,
            link: this.state.formValues.link,
            skills: this.state.formValues.skills,
            description: this.state.formValues.description
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
    render(state) {
        return (
            <div className="modal fade" id="edit" role="dialog" aria-labelledby="edit">
                <div className='edit-project modal-dialog'>
                    <div className='modal-content'>
                        <div className="modal-header">
                            <h5 className="modal-title" id="edit">Edit Project</h5>
                            <button type="button" className="close" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
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
                            <button name='button' className="btn btn-default" data-dismiss="modal">CANCEL</button>
                            <button name='button' className="btn btn-primary" data-dismiss="modal" onClick={this.update}>UPDATE</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

EditProject.propTypes = {
    closeEditProjectModal: PropTypes.func,
    disptachProjectUpdate: PropTypes.func,
    company: PropTypes.object
};

export default EditProject;