import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import api from '../api/api';
import EditProject from './edit-project';

class EditProjectContainer extends React.Component {
    render () {
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
            api.updateProject(data); 
        }
    }
}

EditProjectContainer.propTypes = {
    disptachProjectUpdate: PropTypes.func
};

export default connect(dispatchToProps)(EditProjectContainer);

