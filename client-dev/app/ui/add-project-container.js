import React from 'react';
import AddProject from './add-project';
import { connect } from 'react-redux';
import store from 'store';
import axiosAjax from 'api/projects';

const AddProjectContainer = React.createClass({
    render: function() {
        return (
            <AddProject {...this.props} />
        )
    }
});

const stateToProps = function(state) {
    return {
        state: state.projectReducer.projects
    }
}


const dispatchToProps = function(state) {
    return {
        disptachAddProject (e, data) {
            e.preventDefault();
            axiosAjax.addProject(data, this.state); 
            // store.dispatch({
            //     type: 'ADD_PROJECT',
            //     project: data
            // });
        }
    }
}

export default connect(stateToProps, dispatchToProps)(AddProjectContainer)
