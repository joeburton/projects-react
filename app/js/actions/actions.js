export const getProjects = (projects) => ({
  type: "GET_PROJECTS",
  projects: projects,
});

export const logIn = (authorised) => ({
  type: "LOG_IN",
  authorised: authorised,
});

export const editProjectModal = (data) => ({
  type: "EDIT_PROJECT_MODAL",
  editProjectModal: data,
});

export const addProjectModal = (active) => ({
  type: "ADD_PROJECT_MODAL",
  addProjectModal: active,
});
