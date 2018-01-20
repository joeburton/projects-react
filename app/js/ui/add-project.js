import React from 'react';
import PropTypes from 'prop-types';

class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.addProject = this.addProject.bind(this);
    }
    componentDidMount () {

        let self = this;

        $("#add").on("hidden.bs.modal", function () {
            self.props.closeAddProjectModal();
        });

        $('#add').modal('show');
    }
    addProject (e) {

        this.props.disptachAddProject(e, {
            company: this.company.value,
            projects: [{
                project: this.name.value,
                link: this.link.value,
                skills: this.skills.value,
                description: this.description.value
            }]
        });

    }
    render () {
        return (
            <div className="modal fade" id="add" role="dialog" aria-labelledby="add">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className="modal-header">
                            <h5 className="modal-title" id="add">Add a new Project or Company</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className='modal-body add-fields'>
                            <div className="form-group">
                                <input type='text' ref={ (el) => this.company = el } className='company form-control' placeholder='Company name' />
                            </div>
                            <div className="form-group">
                                <input type='text' ref={ (el) => this.name = el } className='project-name form-control' placeholder='Project name' />
                            </div>
                            <div className="form-group">
                                <input type='text' ref={ (el) => this.link = el } className='link form-control' placeholder='Link' />
                            </div>
                            <div className="form-group">
                                <textarea type='textarea' ref={ (el) => this.skills = el } className='skills form-control' placeholder='Skills used' />
                            </div>
                            <div className="form-group">
                                <textarea type='textarea' ref={ (el) => this.description = el } className='description form-control' placeholder='Description' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button name='button' className="btn btn-default" data-dismiss="modal">CANCEL</button>
                            <button name='button' className="btn btn-primary" data-dismiss="modal" onClick={this.addProject}>SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

AddProject.propTypes = {
    disptachAddProject: PropTypes.func
};

export default AddProject;
