import React from 'react';
import { Link } from 'react-router';
import EditProjectContainer from '../ui/edit-project-container';
import AddProjectContainer from '../ui/add-project-container';
import NumberCompanies from '../ui/number-companies';
import NumberProjects from '../ui/number-projects';
import Login from '../ui/login';
import axiosAjax from '../api/requests';

export default React.createClass({
    componentWillMount() {
        axiosAjax.getProjects();
    },
    addProject(e) {
        e.preventDefault();
        let addProjectEle = document.querySelectorAll('.add-project')[0]

        if (addProjectEle.classList.contains('hidden')) {
            addProjectEle.classList.remove('hidden');
        } else {
            addProjectEle.classList.add('hidden');
        }
    },
    render() {
        return (
            <div className='app'>
                <Login />
                <div className="jumbotron">
                    <div className="container">
                    <p className="intro-skills">React/ Redux, NodeJS and MongoDB CRUD Application.</p>
                    <ul className='nav nav-tabs'>
                        <li role="presentation"><Link to='/companies'>Companies (<NumberCompanies />) </Link></li>
                        <li role="presentation"><Link to='/projects'>Projects (<NumberProjects />)</Link></li>
                        <li role="presentation"><a href='#' onClick={this.addProject}>Add New Project / Company</a></li>
                    </ul>
                </div>
                </div>
                <main>
                    {this.props.children}
                </main>
                <EditProjectContainer />
                <AddProjectContainer />
            </div>
        )
    }
});