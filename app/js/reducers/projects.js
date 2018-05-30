let projectsInitialState = {
    projects: []
};

export default function (state = projectsInitialState, action) {

    switch (action.type) {
        
        case 'GET_PROJECTS':

            return Object.assign({}, state, {
                projects: action.projects
            });

        default: 

            return state;

    }

}