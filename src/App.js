import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./components/home.component";
import { clearAuthMessage, signout } from "./redux/actions/auth.action";
import { clearRequestMessage } from "./redux/actions/request.action";
import { history } from "./helpers/history.helper";
import { USER_TYPE } from "./constants/constant";
import Topics from "./pages/Topics/Topics";
import Submissions from "./pages/Submissions/Submissions";
import Chat from "./pages/Chat/Chat";
import ChatGroups from "./pages/CharGroups/ChatGroups";
import Users from "./pages/Users/Users";
import SubmissionTypes from "./pages/SubmissionTypes/SubmissionTypes";
import UploadDocuments from "./pages/UploadDocuments/UploadDocuments";
import AllocatePanelMembers from "./pages/AllocatePannelMembers/AllocatePanelMembers";
import MarkingScheme from "./pages/MarkingScheme/MarkingScheme";
import EditUser from "./pages/Users/EditUser";

class App extends Component {
  constructor(props) {
    super(props);
    this.signoutHandler = this.signoutHandler.bind(this);
    this.state = {
      isStudent: false,
      isSupervisor: false,
      isPanelMember: false,
      currentUser: undefined,
    };
    
    history.listen((location) => {
      props.dispatch(clearAuthMessage());
      props.dispatch(clearRequestMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        isAdmin: user.user_type == USER_TYPE.ADMIN,
        isStudent: user.user_type == USER_TYPE.STUDENT,
        isSupervisor: user.user_type == USER_TYPE.SUPERVISOR,
        isPanelMember: user.user_type == USER_TYPE.PANEL_MEMBER,
      });
    }
  }

  signoutHandler() {
    this.props.dispatch(signout());
  }

  render() {
    const { currentUser, isAdmin, isStudent, isSupervisor, isPanelMember } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark" style={{ paddingLeft: "30px" }}>
            <Link to={"/"} className="navbar-brand">
              Research Project Management
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              {isAdmin && (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/users"} className="nav-link">
                      Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/submission-types"} className="nav-link">
                      Submission Types
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/allocate-panel-members"} className="nav-link">
                      Allocate panel members
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/documents"} className="nav-link">
                      Documents
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/marking-schemes"} className="nav-link">
                      Marking Schemes
                    </Link>
                  </li>
                </div>
              )}
              {isStudent && (
                <li className="nav-item">
                  <Link to={"/student"} className="nav-link">
                    Student Dashboard
                  </Link>
                </li>
              )}
              {isSupervisor && (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/supervisor"} className="nav-link">
                      Supervisor Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/request"} className="nav-link">
                      Requests
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/submission"} className="nav-link">
                      Submissions
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/chat-group"} className="nav-link">
                      Chat Groups
                    </Link>
                  </li>
                </div>
              )}
              {isPanelMember && (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/panel"} className="nav-link">
                      Panel Member Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/request"} className="nav-link">
                      Requests
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/submission"} className="nav-link">
                      Submissions
                    </Link>
                  </li>
                </div>
              )}
            </div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="/signin" className="nav-link" onClick={this.signoutHandler}>
                    Sign out
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/signin"} className="nav-link">
                    Sign in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/signup"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home", "/admin", "/student", "/supervisor", "/panel"]} component={Home} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/request" component={Topics} />
              <Route exact path="/submission" component={Submissions} />
              <Route exact path="/chat-group" component={ChatGroups} />
              <Route exact path="/chat-group/:project" component={Chat} />

              <Route exact path="/users" component={Users} />
              <Route exact path="/users/edit" component={EditUser} />
              <Route exact path="/submission-types" component={SubmissionTypes}/>
              <Route exact path="/documents" component={UploadDocuments}/>
              <Route exact path='/allocate-panel-members' component={AllocatePanelMembers}/>
              <Route exact path='/marking-schemes' component={MarkingScheme}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);