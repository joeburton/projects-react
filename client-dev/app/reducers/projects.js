var projectsInitialState = {
    projects: []
};

export default function(state = projectsInitialState, action) {
	
	switch (action.type) {

		case 'GET_PROJECTS' :

		var newState = Object.assign({}, state)
		newState.projects = action.projects;
		
		return newState;

		case 'ADD_PROJECT':

		for (var i in state.projects) {
			if (state.projects[i]['company'] == action.project.company)
			console.log('company already exists: ', action.project.company);
			break;
		}

		var newState = Object.assign({}, state);
		newState.projects.push(action.project);
		
		return newState;

		case 'UPDATE_PROJECT':

		return Object.assign({}, state, { projects: state.projects.map((project, index) => {
			if (project._id === action.project._id) {
				// update company name
				project.company = action.project.company;
				// update project values
				project.projects[action.project.key] = {
					description: action.project.description,
					link: action.project.link,
					project: action.project.project,
					skills: action.project.skills
				};
			}
			return project;
			})
		});

		default: return state;

	}

}