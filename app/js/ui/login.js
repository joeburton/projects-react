import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }
    componentDidMount() {
        console.log(this.state);
    }
    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">Project Directory</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        {this.props.loggedin ? (
                            <div className="navbar-form navbar-right clearfix">
                                <a className="btn btn-outline-success my-2 my-sm-0" href="/logout">LOG OUT</a>
                            </div>
                        ) : (
                                <form className="form-inline my-2 my-lg-0" method="POST" action="auth">
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className="form-control mr-sm-2"
                                            placeholder="Username"
                                            ref="username"
                                            value={this.state.username}
                                            name="username"
                                            onChange={this.handleUsernameChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='password'
                                            className="form-control mr-sm-2"
                                            placeholder="Password"
                                            ref="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handlePasswordChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-outline-success my-2 my-sm-0">Sign in</button>
                                </form>
                            )}
                    </div>
                </div>
            </nav>
        )
    }
};

const stateToProps = function (state) {
    return {
        loggedin: state.authReducer.authorised
    }
}

Login.propTypes = {
    loggedin: PropTypes.bool
};

export default connect(stateToProps)(Login);