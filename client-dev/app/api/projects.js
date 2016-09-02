import axios from 'axios';
import store from 'store';

let axiosAjax = {
	getProjects () {
	    
	    return axios.get('http://localhost:3000/source').then(function(response) {
	        store.dispatch({
	            type: 'GET_PROJECTS',
	            projects: response.data
	        });
	        return response;
	    }).catch(function(err) {
	        console.error(err);
	    });

	},
	addProject (data, projects) {
		
		let postData,
			companyExists;

		// Logic to check if the company already exists. 
		// If it does add the project to the exisiting company projects array
		// If it does not set a flag to add a new company.
		for (var i in projects) {
		    if (projects[i]['company'] === data.company) {
				data.id = projects[i]['_id'];
				postData = data;
				companyExists = true;
				break;
		    } else {
		    	companyExists = false;
		    	postData = data;
		    }
		}
		
		let addType = (companyExists) ? 'addproject' : 'addcompany';

		axios.post('http://localhost:3000/' + addType, postData)
		.then(function (response) {
			store.dispatch({
	            type: 'GET_PROJECTS',
	            projects: response.data
	        });
		})
		.catch(function (error) {
			console.log(error);
		});

	},
	updateProject (data, projects) {
		console.log(data, projects);
	}

};

export default axiosAjax;



