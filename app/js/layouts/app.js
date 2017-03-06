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
    openModalAddProject(e) {
        e.preventDefault();
        $('#add').modal('show');
    },
    setTab(e) {
        $('.nav-tabs li').removeClass('active');
        $(e.currentTarget).addClass('active');
    },
    render() {
        return (
            <div className='app'>
                <Login />
                <div className="jumbotron">
                    <div className="container">
                    <p className="intro-skills">React/ Redux, NodeJS and MongoDB CRUD Application.</p>
                    <ul className='nav nav-tabs'>
                        <li role="presentation" onClick={this.setTab}><Link to='/companies'>Companies (<NumberCompanies />) </Link></li>
                        <li role="presentation" onClick={this.setTab}><Link to='/projects'>Projects (<NumberProjects />)</Link></li>
                        <li role="presentation" onClick={this.setTab}><a href='#' onClick={this.openModalAddProject}>Add New Project / Company</a></li>
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