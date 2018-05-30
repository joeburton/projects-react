let projectsInitialState = {
    projects: []
};

export default function (state = projectsInitialState, action) {

    switch (action.type) {

        case 'GET_PROJECTS':

            return {
                ...state,
                projects: action.projects
            };

        default: 

            return state;

    }

}