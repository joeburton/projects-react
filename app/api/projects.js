import axios from 'axios';
import store from 'store';

let axiosAjax = {
    getProjects() {

        let main = document.querySelector('.main');
        let apiUrl = main.dataset.apiUrl;

        return axios.get(apiUrl + '/source').then(function (response) {
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
            companyExists,
            dataApi;

        let main = document.querySelector('.main');
        let apiUrl = main.dataset.apiUrl;

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

        axios.post(dataApi + '/' + addType, postData)
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

        let main = document.querySelector('.main');
        let apiUrl = main.dataset.apiUrl;

        axios.post(dataApi + '/updateproject', data)
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

        let main = document.querySelector('.main');
        let apiUrl = main.dataset.apiUrl;

        axios.post(dataApi + '/deleteproject', postData)
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



