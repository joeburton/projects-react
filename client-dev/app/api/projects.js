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
			console.log(response);
			// store.dispatch({
	  //           type: 'ADD_PROJECT',
	  //           project: data
	  //       });
		})
		.catch(function (error) {
			console.log(error);
		});

		/*
		store.dispatch({
            type: 'ADD_PROJECT',
            project: data
        });
        */

	}
}; 

export default axiosAjax;



