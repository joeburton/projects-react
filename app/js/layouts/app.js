import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import EditProjectContainer from '../ui/edit-project-container';
import AddProjectContainer from '../ui/add-project-container';
import NumberCompanies from '../ui/number-companies';
import NumberProjects from '../ui/number-projects';
import Login from '../ui/login';
import api from '../api/api';


// pass in state data as props data
const stateToProps = function(state) {
    return {
        loggedin: state.authReducer.authorised
    }
}

class App extends React.Component {
    componentWillMount() {
        api.getProjects();
    }
    openModalAddProject(e) {
        e.preventDefault();
        $('#add').modal('show');
    }
    setTab(e) {
        $('.nav-tabs li').removeClass('active');
        $(e.currentTarget).addClass('active');
    }
    render() {
        return (
            <div className='app'>
                <Login />
                <div className="jumbotron">
                    <div className="container">
                    <p className="intro-skills">React/ Redux, NodeJS and MongoDB CRUD Application.</p>
                    <ul className='nav nav-tabs'>
                        <li role="presentation" onClick={this.setTab} className="nav-item"><Link to='/companies' className="nav-link">Companies (<NumberCompanies />) </Link></li>
                        <li role="presentation" onClick={this.setTab} className="nav-item"><Link to='/projects' className="nav-link">Projects (<NumberProjects />)</Link></li>
                        {this.props.loggedin ? <li role="presentation" onClick={this.setTab} className="nav-item"><a href='#' onClick={this.openModalAddProject} className="nav-link">Add New Project Company</a></li> : '' }
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
};

App.propTypes = {
    loggedin: PropTypes.bool,
    children: PropTypes.node.isRequired
};

export default connect(stateToProps)(App)