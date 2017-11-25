let projectsInitialState = {
    authorised: false
};

export default function (state = projectsInitialState, action) {

    switch (action.type) {

        case 'LOG_IN':

            var newState = Object.assign({}, state)
            newState.authorised = action.authorised;

            return newState;

        default: 

            return state;

    }

}