import * as React from "react";
import { Form, Input, Button, Divider, message } from "antd";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook, SiGithub } from "react-icons/si";
import { AuthLayout } from "../components/layout/AuthLayout";
import { callApiServer } from "../helper/ApiHelper";
import "../styles/login.scss";
import { FormInstance } from "antd/lib/form";
import { connect } from "react-redux";
import { saveAuthUser } from "../redux/actions/userActionCreator";
import { config } from "../config/appconfig";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { NextRouter, withRouter } from 'next/router'

interface LoginInfo {
  username: string;
  password: string;
  remember_password: boolean;
}

interface Prop {
  username: string,
  password: string,
  reduxSaveAuthUser: any,
  router: NextRouter
}

interface State {
  rememberPassword: boolean,
  username: string,
  password: string
}

declare global {
  interface Window {
    FB: fb.FacebookStatic;
    fbAsyncInit: () => void;
  }
}

class LoginPage extends React.Component<Prop, State> {
  formRef: React.RefObject<FormInstance<any>>;
  
  constructor(props) {
    super(props);
  
    const rememberPassword = localStorage.getItem("remember_me") === "true";
    this.state = {
      rememberPassword: rememberPassword,
      username: rememberPassword ? localStorage.getItem("usernameUnauthorized") : "",
      password: rememberPassword ? localStorage.getItem("passwordUnauthorized") : ""
    };
    
    this.formRef = React.createRef<FormInstance>();
    this.getApiAccessToken = this.getApiAccessToken.bind(this);
    this.handleFBLogin = this.handleFBLogin.bind(this);
  }

  componentDidMount() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: config.facebookApp.appId,
        cookie: true,
        xfbml: true,
        version: "v2.5",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  async getApiAccessToken(loginResponse: fb.StatusResponse) {
    let res = await callApiServer("POST", "Auth/facebook-login", {
      userAccessToken: loginResponse.authResponse.accessToken,
    });

    if (res.data.isAuthenticated) {
      message.success(res.message);
    } else {
      message.error("Login fail");
    }
  }

  handleFBLogin() {
    let status = "";

    FB.getLoginStatus((response: fb.StatusResponse) => {
      status = response.status;
    });

    if (status != "connected") {
      FB.login(this.getApiAccessToken);
    } else {
      message.success("Login successfully");
      this.props.router.push("/dashboard");
    }
  }

  async Login() {
    const authInfo: LoginInfo = await this.formRef.current.getFieldsValue();
    localStorage.setItem("remember_me", this.state.rememberPassword.toString());

    if (this.state.rememberPassword) {
      localStorage.setItem("usernameUnauthorized", authInfo.username);
      localStorage.setItem("passwordUnauthorized", authInfo.password);
    }
    else {
      localStorage.removeItem("usernameUnauthorized");
      localStorage.removeItem("passwordUnauthorized");
    }

    let response = await callApiServer("POST", "Auth/login", authInfo);

    if (response == undefined) return;
    if (!response.ok) {
      message.error(response.message);
    } 
    else if (response.data.isAuthenticated) {
      localStorage.setItem("token", response.data.token);

      this.props.reduxSaveAuthUser({
        userName: response.data.userName,
        email: response.data.email,
      });

      message.success("Login successfully");
      this.props.router.push("/dashboard");
    }
  }

  render() {
    return (
      <AuthLayout pageName="login">
        <div className={"login-screen"}>
          <div className={"content-wrapper"}>
            <Form
              ref={this.formRef}
              onFinish={() => {
                this.Login();
              }}
              key={"login-form"}
            >
              <Form.Item
                name="username"
                initialValue={this.state.username}
                hasFeedback
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="Email or Username" type="text" style={{height: "37px"}} allowClear/>
              </Form.Item>
              <Form.Item
                name="password"
                initialValue={this.state.password}
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(
                      "^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
                    ),
                    message: "Password must contain at least 6 characters and include number, digit, speacial character"
                  }
                ]}
                hasFeedback
              >
                <Input placeholder={"Password"} type="password" style={{height: "37px"}} allowClear />
              </Form.Item>
              <Form.Item>
                <div className="remember-password-wrapper">
                  <span>
                    <Checkbox
                      defaultChecked={this.state.rememberPassword}
                      onChange={(e) => {
                        this.setState({ rememberPassword: e.target.checked });
                      }}
                    >
                      Remember me
                    </Checkbox>
                  </span>
                  <span>
                    <a href="#" style={{ color: "#0073b1" }}>
                      Forgot password?
                    </a>
                  </span>
                </div>
              </Form.Item>
              <Form.Item>
                <span className={"button-accept-props"}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      backgroundColor: "#14b1e7",
                    }}
                  >
                    Sign in
                  </Button>
                </span>
              </Form.Item>
            </Form>
            <span className={"space-between-item"}>
              <Divider>
                <span>or</span>
              </Divider>
            </span>
            <span className={"button-back-props"}>
              <Button>
                <FcGoogle size={20} />
                <span className={"google-text"}>Sign in with Google</span>
              </Button>
              <Button
                style={{ marginTop: "12px" }}
                onClick={this.handleFBLogin}
              >
                <SiFacebook size={20} color={"#3b5998"} />
                <span className={"facebook-text"}>Sign in with Facebook</span>
              </Button>
              <Button style={{ marginTop: "12px" }}>
                <SiGithub size={20} />
                <span className={"github-text"}>Sign in with Github</span>
              </Button>
            </span>
            <div className="sign-up-link">
              <span>
                First time using Tasks?
                <a
                  style={{
                    color: "#0073b1",
                    marginLeft: "5px",
                  }}
                  href="#"
                >
                  <b>Join now</b>
                </a>
              </span>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.userName,
})

const mapDispatchToProps = (dispatch) => ({
  reduxSaveAuthUser: (payload: any) => dispatch(saveAuthUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
