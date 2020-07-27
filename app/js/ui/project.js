import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Project extends React.Component {
  constructor(props) {
    super(props);

    this.getCompanyProjectId = this.getCompanyProjectId.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }
  getCompanyProjectId(e) {
    this.props.editProject(e, {
      companyId: this.props.companyId,
      projectId: this.props.project.id,
    });
  }
  deleteProject(e) {
    this.props.deleteProject(e, {
      companyId: this.props.companyId,
      projectId: this.props.project.id,
      numberProjects: this.props.numberProjects,
    });
  }
  render() {
    return (
      <li className="project">
        <p className="name"> {this.props.project.project}</p>
        <p className="link">
          {" "}
          <a href={this.props.project.link} target="_blank">
            {this.props.project.link}
          </a>
        </p>
        <p className="skills"> {this.props.project.skills}</p>
        <p className="description"> {this.props.project.description}</p>
        {this.props.loggedin && (
          <div className="admin-controls">
            <a
              className="btn btn-outline-success my-2 my-sm-0 btn-edit"
              href="#"
              onClick={this.getCompanyProjectId}
            >
              EDIT
            </a>
            <a
              className="btn btn-outline-danger my-2 my-sm-0"
              href="#"
              onClick={this.deleteProject}
            >
              DELETE
            </a>
          </div>
        )}
      </li>
    );
  }
}

Project.propTypes = {
  loggedin: PropTypes.bool,
  editProject: PropTypes.func,
  deleteProject: PropTypes.func,
};

export default Project;
