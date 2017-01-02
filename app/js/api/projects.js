import axios from 'axios';
import store from '../store';

let axiosAjax = {

    getProjects() {

        let apiUrl = document.querySelector('.main').getAttribute('data-api-url');

        return axios.get(apiUrl + '/source').then(function(response) {
            store.dispatch({
                type: 'GET_PROJECTS',
                projects: response.data.projects
            });
            store.dispatch({
                type: 'LOG_IN',
                authorised: response.data.authorised
            });
        }).catch(function(err) {
            
            console.error(err);
        });

    },

    addProject(data, projects) {

        let postData,
            companyExists,
            dataApi;

        let apiUrl = document.querySelector('.main').getAttribute('data-api-url');

        // logic to check if the company already exists. 
        // if it does add the project to the exisiting company projects array
        // if it does not set a flag to add a new company.
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

        axios.post(apiUrl + '/' + addType, postData)
            .then(function(response) {
                store.dispatch({
                    type: 'GET_PROJECTS',
                    projects: response.data
                });
            })
            .catch(function(error) {
                console.log(error);
            });

    },

    updateProject(data) {

        let apiUrl = document.querySelector('.main').getAttribute('data-api-url');

        axios.post(apiUrl + '/updateproject', data)
            .then(function(response) {
                store.dispatch({
                    type: 'GET_PROJECTS',
                    projects: response.data
                });
            })
            .catch(function(error) {
                console.log(error);
            });

    },

    deleteProject(companyId, projectId, projectListItemsLength) {

        let postData = {
            companyId,
            projectId,
            projectListItemsLength
        };
        console.log(postData);

        let apiUrl = document.querySelector('.main').getAttribute('data-api-url');

        axios.post(apiUrl + '/deleteproject', postData)
            .then(function(response) {
                store.dispatch({
                    type: 'GET_PROJECTS',
                    projects: response.data
                });
            })
            .catch(function(error) {
                console.log(error);
            });

    }

};

export default axiosAjax;



