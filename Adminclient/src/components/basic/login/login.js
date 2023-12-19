import React from "react";
import { Navigate } from "react-router-dom";
import './login.css';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/loginAction';




class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  usernameInputHandler = (event) => {
    this.setState({
      ...this.state,
      username: event.target.value
    });
  }

  passwordInputHandler = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser({ username: this.state.username, password: this.state.password });
  }

  render() {
    if (this.props.user.isLoggedIn) {
      return (<Navigate to='/home' />);
    }
    else {
      return (
        <div className="login-root">
          <div
            className="box-root flex-flex flex-direction--column"
            style={{ minHeight: "100vh", flexGrow: 1 }}
          >
            <div className="loginbackground box-background--white padding-top--64">
              <div className="loginbackground-gridContainer">
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "top / start / 8 / end" }}
                >
                  <div
                    className="box-root"
                    style={{
                      backgroundImage:
                        "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                      flexGrow: 1
                    }}
                  ></div>
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "4 / 2 / auto / 5" }}
                >
                  <div
                    className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                    style={{ flexGrow: 1 }}
                  />
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "6 / start / auto / 2" }}
                >
                  <div
                    className="box-root box-background--blue800"
                    style={{ flexGrow: 1 }}
                  />
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "7 / start / auto / 4" }}
                >
                  <div
                    className="box-root box-background--blue animationLeftRight"
                    style={{ flexGrow: 1 }}
                  />
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "8 / 4 / auto / 6" }}
                >
                  <div
                    className="box-root box-background--gray100 animationLeftRight tans3s"
                    style={{ flexGrow: 1 }}
                  />
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "2 / 15 / auto / end" }}
                >
                  <div
                    className="box-root box-background--cyan200 animationRightLeft tans4s"
                    style={{ flexGrow: 1 }}
                  />
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "3 / 14 / auto / end" }}
                >
                  <div
                    className="box-root box-background--blue animationRightLeft"
                    style={{ flexGrow: 1 }}
                  />
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "4 / 17 / auto / 20" }}
                >
                  <div
                    className="box-root box-background--gray100 animationRightLeft tans4s"
                    style={{ flexGrow: 1 }}
                  />
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "5 / 14 / auto / 17" }}
                >
                  <div
                    className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                    style={{ flexGrow: 1 }}
                  />
                </div>
              </div>
            </div>
            <div
              className="box-root padding-top--24 flex-flex flex-direction--column"
              style={{ flexGrow: 1, zIndex: 9 }}
            >
              <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                <h1>
                  <a>
                    Admin Login
                  </a>
                </h1>
              </div>
              <div className="formbg-outer">
                <div className="formbg">
                  <div className="formbg-inner padding-horizontal--48">
                    <span className="padding-bottom--15">Sign in to Admin account</span>
                    <form id="stripe-login" onSubmit={this.handleSubmit}>
                      <div className="field padding-bottom--24">
                        <label htmlFor="text">UserName</label>
                        <input type="text" name="text" value={this.state.username} onChange={this.usernameInputHandler} required />
                      </div>
                      <div className="field padding-bottom--24">
                        <div className="grid--50-50">
                          <label htmlFor="password">Password</label>
                          <div className="reset-pass"></div>
                        </div>
                        <input type="password" name="password" value={this.state.password} onChange={this.passwordInputHandler} required />
                      </div>
                      <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                        <label htmlFor="checkbox"></label>
                      </div>
                      <div className="field padding-bottom--24">
                        <input type="submit" name="submit" defaultValue="Continue" />
                      </div>
                      <div className="field"></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}


const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


 