import React from 'react';
import EditProject from './edit-project';
import { connect } from 'react-redux';
import store from 'store';
import axiosAjax from 'api/projects';

const EditProjectContainer = React.createClass({
    render: function() {
        return (
            <EditProject {...this.props} />
        )
    }
});

const stateToProps = function(state) {
    return {
        projects: state.projectReducer.projects
    }
}

const dispatchToProps = function(state) {
    return {
        disptachProjectUpdate (e, data) {
            e.preventDefault();
            axiosAjax.updateProject(data); 
            // store.dispatch({
            //     type: 'UPDATE_PROJECT',
            //     project: {
            //         '_id': data.id,
            //         'company': data.company,
            //         'project': data.name,
            //         'link': data.link,
            //         'skills': data.skills,
            //         'description': data.description
            //     }
            // });
        }
    }
}


export default connect(stateToProps, dispatchToProps)(EditProjectContainer);

