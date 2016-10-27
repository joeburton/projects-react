import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from 'store';

// Layouts
import App from 'layouts/app';

// Components
import Home from 'ui/home';
import LoginIn from 'ui/login';
import CompaniesContainer from 'ui/companies-container';
import ProjectsContainer from 'ui/projects-container';

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={Home} />
                <Route path="/projects" component={ProjectsContainer} />
                <Route path="/companies" component={CompaniesContainer} />
            </Route>
            <Route>
                <Route path="/contact"  />
                <Route path="/login" component={LoginIn} />
                <Route path="/logout" />
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));