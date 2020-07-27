import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class NumberProjects extends React.Component {
  render() {
    return <span className="number-projects">{this.props.numberProjects}</span>;
  }
}

const stateToProps = function (state) {
  return {
    numberProjects: state.projectReducer.projects.length,
    projects: state.projectReducer.projects,
  };
};

NumberProjects.propTypes = {
  numberProjects: PropTypes.number,
  projects: PropTypes.array,
};

export default connect(stateToProps)(NumberProjects);
