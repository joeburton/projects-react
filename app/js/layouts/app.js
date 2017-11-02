import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import EditProjectContainer from '../ui/edit-project-container';
import AddProjectContainer from '../ui/add-project-container';
import NumberCompanies from '../ui/number-companies';
import NumberProjects from '../ui/number-projects';
import Login from '../ui/login';
import axiosAjax from '../api/requests';
import { connect } from 'react-redux';

// pass in state data as props data
const stateToProps = function(state) {
    return {
        loggedin: state.authReducer.authorised
    }
}

const App = React.createClass({
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
});

App.propTypes = {
    loggedin: PropTypes.bool,
    children: PropTypes.node.isRequired
};

export default connect(stateToProps)(App)