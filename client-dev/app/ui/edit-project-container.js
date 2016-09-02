import React from 'react';
import EditProject from './edit-project';
import { connect } from 'react-redux';
import store from 'store';

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

const dispatchToProps = function(dispatch) {
    return {
        disptachProjectUpdate: (e, data) => {
            e.preventDefault();
            store.dispatch({
                type: 'UPDATE_PROJECT',
                project: {
                    '_id': data.id,
                    'key': data.key,
                    'company': data.company,
                    'project': data.name,
                    'link': data.link,
                    'skills': data.skills,
                    'description': data.description
                }
            });
        }
    }
}

export default connect(stateToProps, dispatchToProps)(EditProjectContainer);


