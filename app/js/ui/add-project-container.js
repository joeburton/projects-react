import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addProjectModal } from "../actions/actions";
import AddProject from "./add-project";
import api from "../api/api";

class AddProjectContainer extends React.Component {
  render() {
    return <AddProject {...this.props} />;
  }
}

const stateToProps = function (state) {
  return {
    projects: state.projectReducer.projects,
  };
};

const dispatchToProps = function (dispatch) {
  return {
    disptachAddProject(e, data) {
      e.preventDefault();
      api.addProject(data, this.projects);
    },
    closeAddProjectModal() {
      dispatch(addProjectModal(false));
    },
  };
};

AddProjectContainer.propTypes = {
  projects: PropTypes.array,
  disptachAddProject: PropTypes.func,
};

export default connect(stateToProps, dispatchToProps)(AddProjectContainer);
