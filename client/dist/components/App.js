import React, {Component} from 'react'
import UserProfile from './UserProfile';
import SignupForm from './SignupForm';
import SigninForm from './SignInForm';
 import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
             currentUser: null,
             signUpForm: {
             name: '',
             email: '',
             password:'',
          },
        };
    }

    onNameUpdate(name){

    }

    onEmailUpdate(email) {
        const { signUpForm } = this.state;

        const updatedForm = Object.assign({}, signUpForm, { email });
        

       this.setState({
          signUpForm: updatedForm, 
       });
    }

    onPasswordUpdate(password) {
        const { signUpForm } = this.state;

        const updatedForm = Object.assign({}, signUpForm, { password });
        

       this.setState({
          signUpForm: updatedForm, 
       });
    }


    onSignUpSubmit() {
        const { signUpForm } = this.state;

        this.setState({
            currentUser: {
                name: signUpForm.name,
                email: signUpForm.email,
            },
            signupForm: {
                name: '',
                email: '',
                password:'',
             },
        });
    }


    render() {
        const { currentUser, signUpForm } = this.state;

        return(
            <Router>
             <div>
              <ul>
                 <li><Link to="/app/signin">Sign in</Link></li>
                 <li><Link to="/app/signup">Sign up</Link></li>
              </ul>
              
              <div>
                  <Route path="/app/signup" render={ () => (
                      <SignupForm
                      state2={ signUpForm }
                      onNameUpdate={ this.onNameUpdate.bind(this) }
                      onEmailUpdate={ this.onEmailUpdate.bind(this) }
                      onPasswordUpdate={ this.onPasswordUpdate.bind(this) }
                      onSubmit={ this.onSignUpSubmit.bind(this)}
                            />
                      )} />
                  <Route path="/app/signin" render={() => (<SigninForm/>)} /> 
                  <Route path="/app/user/profile" render={ () => (
                  <UserProfile User={ currentUser } />
                  )} />
              </div>
             </div>
            </Router>
        );
    }
}

export default App;