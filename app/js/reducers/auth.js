var projectsInitialState = {
    authorised: false
};

export default function (state = projectsInitialState, action) {

    switch (action.type) {

        case 'LOG_IN':

            var newState = { 
                ...state, 
                authorised: action.authorised 
            };

            console.log(newState);

            return newState

        default: return state;

    }

}