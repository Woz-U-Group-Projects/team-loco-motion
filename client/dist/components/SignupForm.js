import React, {Component} from 'react'

class SignupForm extends Component {
    render() {
        const {
            state2: {
                name,
                email,
                password,

            },
            onNameUpdate,
            onEmailUpdate,
            onPasswordUpdate,
            onSubmit,
            // history,
        } = this.props;



        return(
         <div>

              <h2> Im sign up form </h2>
 
          <div>
               <input type="text" 
               onChange= { e => onNameUpdate(e.target.value) }
               value={ name }
               placeholder="Your name" />
          </div>

          <div>
          <input type="email" 
               onChange= { e => onEmailUpdate(e.target.value) }
               value={ email }
               placeholder="Your email" />
          </div>

          <div>
          <input type="password" 
               onChange= { e => onPasswordUpdate(e.target.value) }
               value={ password }
               placeholder="Your password" />
          </div>

           <div>
               <button type="button" onClick={ () => {
                   onSubmit();
                   history.push('/app/user/profile');
                   }}>continue</button>
           </div>

         </div>

        );
    }
}   

export default SignupForm;