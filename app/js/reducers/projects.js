let projectsInitialState = {
    projects: []
};

export default function (state = projectsInitialState, action) {

    switch (action.type) {
        
        case 'GET_PROJECTS':

            let newState = {
                projects: action.projects
            }

            return newState;

        default: return state;

    }

}