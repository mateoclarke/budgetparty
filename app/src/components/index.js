import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom'
import Home from './Home'
import Intro from './Intro'
import User from './User'
import LearnMore from './Department/LearnMore'
import DashboardContainer from '../containers/Dashboard'
import SubmitContainer from '../containers/Submit'
import ServiceContainer from '../containers/Service'
import DepartmentContainer from '../containers/Department'
import ExplainContainer from '../containers/Explain'
import { firebaseAuth } from '../config/constants'
import { logout } from '../helpers/auth'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'

import store from '../store';

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }

  updateAuthState(user) {
    console.log(user);
    if (user) {
      this.setState({
        authed: true,
        loading: false,
      })
    } else {
      this.setState({
        loading: false
      })
    }
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => this.updateAuthState(user))
  }

  componentWillUnmount () {
    this.removeListener()
  }

  handleLogout() {
    console.log("LOGGED OUT")
    logout()
    this.setState({authed: false})
  }

  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <IntlProvider locale="en">
      <Provider store={store}>
        <Router>
          <div className="container">
            <div className="row">
              <Switch className="row">
                <Route path='/' exact render={() => {
                  return this.state.authed
                  ? <Redirect to="/dashboard" />
                  : <Redirect to="/login" />
                }} />
                <Route path='/login' isAuthed={this.state.authed} render={() => {
                  return this.state.authed
                  ? <Redirect to="/intro/1" />
                  : <Home />
                  }}
                />
                <Route path='/intro/:id' render={props => <Intro {...props} />} />
                <Route path='/dashboard' render={props => <DashboardContainer {...props}/>} />
                <Route path='/service/:id' exact
                  render={props => <ServiceContainer {...props} />}
                />
                <Route path='/service/:service_id/department/:id' exact
                  render={props => <DepartmentContainer {...props}/>}
                />
                <Route path='/service/:service_id/department/:id/learn-more'
                  render={props => <LearnMore {...props}/>}
                />
                <Route path='/service/:service_id/department/:id/explain'
                  render={props => <ExplainContainer {...props}/>}
                />
                <Route path='/submit' render={props => <SubmitContainer {...props}/>} />
                <Route path='/user' render={props => {
                  return <User isAuthed={this.state.authed}
                    handleLogout={this.handleLogout.bind(this)}
                  />
                }} />
                <Route render={() => <h3>404, you ain't supposed to be here</h3>} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
      </IntlProvider>
    );
  }
}
