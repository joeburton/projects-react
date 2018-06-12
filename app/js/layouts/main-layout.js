import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { addProjectModal } from '../actions/actions';

import store from '../store';

import EditProjectContainer from '../ui/edit-project-container';
import AddProjectContainer from '../ui/add-project-container';
import NumberCompanies from '../ui/number-companies';
import NumberProjects from '../ui/number-projects';
import Login from '../ui/login';
import api from '../api/api';

// pass in state data as props data
const stateToProps = function (state) {
    return {
        loggedin: state.authReducer.authorised,
        editProjectModal: state.modalsReducer.editProjectModal.open,
        addProjectModal: state.modalsReducer.addProjectModal
    }
}

class MainLayout extends React.Component {

    constructor(props) {

        super(props);
        
        api.getProjects();
        
        this.state = {
            activeTab: 'homepage'
        };

        this.setTab = this.setTab.bind(this);
    }
    setTab(type) {

        this.setState({
            activeTab: type
        });

        if (type === 'add') {
            store.dispatch(addProjectModal(true));
        }
    }
    componentDidMount() {

        let route = this.props.location.pathname;

        if (this.props.location.pathname === '/projects') {
            this.setTab('projects');
        } else if (route === '/companies') {
            this.setTab('companies')
        } else {
            this.setTab('homepage');
        }
    }
    render() {
        return (
            <div className='app'>
                <Login />
                <div className="nav-container">
                    <div className="container">
                        <p className="intro-skills">React/ Redux, NodeJS and MongoDB Directory.</p>
                        <ul className='nav nav-tabs'>
                            <li role="presentation" onClick={() => this.setTab('companies')} className={this.state.activeTab === 'companies' ? 'nav-item active' : 'nav-item'}>
                                <Link to='/companies' className="nav-link">Companies (<NumberCompanies />)</Link></li>

                            <li role="presentation" onClick={() => this.setTab('projects')} className={this.state.activeTab === 'projects' ? 'nav-item active' : 'nav-item'}>
                                <Link to='/projects' className="nav-link">Projects (<NumberProjects />)</Link></li>

                            {this.props.loggedin ? <li role="presentation" onClick={() => this.setTab('add')} className={this.state.activeTab === 'add' ? 'nav-item active' : 'nav-item'}>
                                <a href='#' className="nav-link">Add</a></li> : ''}
                        </ul>
                    </div>
                </div>
                
                {this.props.children}

                {this.props.editProjectModal &&
                    <EditProjectContainer />
                }
                {this.props.addProjectModal &&
                    <AddProjectContainer setProjectTab={this.setTab} />
                }
            </div>
        )
    }
};

MainLayout.propTypes = {
    loggedin: PropTypes.bool,
    children: PropTypes.node.isRequired,
    editProjectModal: PropTypes.bool,
    addProjectModal: PropTypes.bool
};

export default connect(stateToProps)(MainLayout);
