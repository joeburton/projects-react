let projectsInitialState = {
    authorised: false
};

export default function (state = projectsInitialState, action) {

    switch (action.type) {

        case 'LOG_IN':

            let newState = { 
                ...state, 
                authorised: action.authorised 
            };

            return newState

        default: return state;

    }

}