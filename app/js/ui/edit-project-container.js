import React, {PropTypes} from 'react';
// import PropTypes from 'prop-types';
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

EditProjectContainer.propTypes = {
    disptachProjectUpdate: PropTypes.func
};

export default connect(dispatchToProps)(EditProjectContainer);

