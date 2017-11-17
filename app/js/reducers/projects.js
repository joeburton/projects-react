var projectsInitialState = {
    projects: []
};

export default function (state = projectsInitialState, action) {

    switch (action.type) {

        case 'GET_PROJECTS':

            let newState = Object.assign({}, state, {
                authorised: action.projects
            });

            console.log(newState, action);

            return newState;

        default: return state;

    }

}