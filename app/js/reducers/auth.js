var projectsInitialState = {
    authorised: false
};

export default function (state = projectsInitialState, action) {

    switch (action.type) {

        case 'LOG_IN':

            let newState = Object.assign({}, state, {
                authorised: action.authorised
            });

            console.log(newState, action);

            return newState;

        default: return state;

    }

}