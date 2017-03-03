import React from 'react';
import EditProject from './edit-project';
import { connect } from 'react-redux';
import axiosAjax from '../api/requests';

class EditProjectContainer extends React.Component {
    render() {
        return (
            <EditProject {...this.props} />
        )
    }
};

// pass down events as props
const dispatchToProps = function(state) {
    return {
        disptachProjectUpdate (e, data) {
            e.preventDefault();
            axiosAjax.updateProject(data); 
        }
    }
}

export default connect(dispatchToProps)(EditProjectContainer);

