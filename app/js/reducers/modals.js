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

            return Object.assign({}, state, {
                editProjectModal: action.editProjectModal
            });

        case 'ADD_PROJECT_MODAL':

            return Object.assign({}, state, {
                addProjectModal: action.addProjectModal
            });

        default:

            return state;

    }

}