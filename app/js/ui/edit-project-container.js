import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { connect } from 'react-redux';

import api from '../api/api';
import EditProject from './edit-project';
import store from '../store';
import { editProjectModal } from '../actions/actions';

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
        },
        closeEditProjectModal () {
            store.dispatch(editProjectModal({
                companyId: '',
                projectId: '',
                open: false
            }));
        }
    }
};

const stateToProps = function (state) {
    return {
        open: state.modalsReducer.editProjectModal.open,
        companyId: state.modalsReducer.editProjectModal.companyId,
        projectId: state.modalsReducer.editProjectModal.projectId,
        company: _.find(state.projectReducer.projects, {'_id': state.modalsReducer.editProjectModal.companyId})
    }
};

EditProjectContainer.propTypes = {
    disptachProjectUpdate: PropTypes.func,
    closeEditProjectModal: PropTypes.func,
    open: PropTypes.bool,
    companyId: PropTypes.string,
    projectId: PropTypes.string,
    company: PropTypes.object
};

export default connect(stateToProps, dispatchToProps)(EditProjectContainer);

