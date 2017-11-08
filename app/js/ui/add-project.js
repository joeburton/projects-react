import React from 'react';
import PropTypes from 'prop-types';

class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.addProject = this.addProject.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
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
                                <input type='text' ref="company" className='company form-control' placeholder='Company name' />
                            </div>
                            <div className="form-group">
                                <input type='text' ref="name" className='project-name form-control' placeholder='Project name' />
                            </div>
                            <div className="form-group">
                                <input type='text' ref="link" className='link form-control' placeholder='Link' />
                            </div>
                            <div className="form-group">
                                <textarea type='textarea' ref="skills" className='skills form-control' placeholder='Skills used' />
                            </div>
                            <div className="form-group">
                                <textarea type='textarea' ref="description" className='description form-control' placeholder='Description' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button name='button' className="btn btn-default" data-dismiss="modal">CANCEL</button>
                            <button name='button' className="btn btn-primary" onClick={this.addProject}>SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    addProject (e) {

        this.props.disptachAddProject(e, {
            company: this.refs.company.value,
            projects: [{
                project: this.refs.name.value,
                link: this.refs.link.value,
                skills: this.refs.skills.value,
                description: this.refs.description.value
            }]
        });

        this.closeOverlay();
    }
    closeOverlay () {
        $('#add').modal('hide');
    }
};

AddProject.propTypes = {
    disptachAddProject: PropTypes.func
};

export default AddProject;