import React, { PropTypes } from 'react';

const AddProject = React.createClass({
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
                                <input type='text' className='company form-control' placeholder='Company name' />
                            </div>
                            <div className="form-group">
                                <input type='text' className='project-name form-control' placeholder='Project name' />
                            </div>
                            <div className="form-group">
                                <input type='text' className='link form-control' placeholder='Link' />
                            </div>
                            <div className="form-group">
                                <textarea type='textarea' className='skills form-control' placeholder='Skills used' />
                            </div>
                            <div className="form-group">
                                <textarea type='textarea' className='description form-control' placeholder='Description' />
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
        $('#add').modal('hide');
    }
});

AddProject.propTypes = {
    disptachAddProject: PropTypes.func
};

export default AddProject;