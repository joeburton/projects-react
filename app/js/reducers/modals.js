let modalsInitialState = {
    editProjectModal: {
        companyId: '',
        projectId: '',
        open: false
    },
    addProjectModal: false
};

export default function (state = modalsInitialState, action) {

    switch (action.type) {

        case 'EDIT_PROJECT_MODAL':

            var newState = Object.assign({}, state)
            newState.editProjectModal = action.editProjectModal;

            return newState;

        case 'ADD_PROJECT_MODAL':

            var newState = Object.assign({}, state)
            newState.addProjectModal = action.addProjectModal;

            return newState;

        default:

            return state;

    }

}