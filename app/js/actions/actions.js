export const getProjects = (projects) => ({
    type: 'GET_PROJECTS',
    projects: projects
});

export const logIn = (authorised) => ({
    type: 'LOG_IN',
    authorised: authorised
});
