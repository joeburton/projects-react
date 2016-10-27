import axios from 'axios';
import store from 'store';

let axiosAjax = {
    getProjects() {
        
        let dataApi = document.querySelector('data-api-url');

        return axios.get(dataApi).then(function (response) {
            store.dispatch({
                type: 'GET_PROJECTS',
                projects: response.data.projects
            });
            store.dispatch({
                type: 'LOG_IN',
                authorised: response.data.authorised
            });
            return response;
        }).catch(function (err) {
            console.error(err);
        });

    },
    addProject(data, projects) {

        let postData,
            companyExists;

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
    updateProject(data) {

        axios.post('http://localhost:3000/updateproject', data)
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
    deleteProject(companyId, projectId, projectListItemsLength) {

        let postData = {
            companyId,
            projectId,
            projectListItemsLength
        };

        axios.post('http://localhost:3000/deleteproject', postData)
            .then(function (response) {
                store.dispatch({
                    type: 'GET_PROJECTS',
                    projects: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });

    }
};

export default axiosAjax;



