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
		console.log(data, projects);
		var postData;

		for (var i in projects) {
		    if (projects[i]['company'] === data.company) {
  				projects[i].projects.push(data.projects[0]);
				console.log('company already exists: ', projects);
				postData = projects;
		    } else {
		    	postData = data;
		    }
		}

		return axios({
		  method: 'POST',
		  url: 'http://localhost:3000',
		  data: postData
		}).then(function (response) {
			console.log(response);
			// store.dispatch({
   //              type: 'ADD_PROJECT',
   //              project: data
   //          });
		})
		.catch(function (error) {
			console.log(error);
		});

		// return axios.post('http://localhost:3000', postData)
		// .then(function (response) {
		// 	console.log(response);
		// 	// store.dispatch({
  //  //              type: 'ADD_PROJECT',
  //  //              project: data
  //  //          });
		// })
		// .catch(function (error) {
		// 	console.log(error);
		// });
	}
}; 

export default axiosAjax;



