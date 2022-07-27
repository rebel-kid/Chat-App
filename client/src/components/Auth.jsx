import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import signinImage from "../assets/signup.jpg";

//initial state
const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
}

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true); //initial state of signup will be false, as we want to go to sign in first
  //handleChange fxn to handle any changes in the input field -> useState for it

  const[form,setForm] = useState(initialState); //we need to have some initial state, obj defined above

  const handleChange = (event) => {
    // we get event as text of i/p we are changing
    //we are changing only one i/p at a time, we want other inputs to be there as it is, so spread them
    // event.target.name ->the attribute we are changing, .value is what is the current value
    //that will update the state field with all old values + new changing value
    setForm({...form, [event.target.name]: event.target.value})
    // console.log(form);
  }; //blank call back fxn

  const handleSubmit = (event) => {
    //submission of form -> prevent default behaviour
    event.preventDefault();

    console.log(form);
    //this is like we have received in console
//     {fullName: 'Shashank Singh', username: 'fear_death', password: 'qwertyuiop', confirmPassword: 'qwertyuio', phoneNumber: '9929758760', …}
// avatarURL: "data:image/jpeg;base64,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"
// confirmPassword: "qwertyuio"
// fullName: "Shashank Singh"
// password: "qwertyuiop"
// phoneNumber: "9929758760"
// username: "fear_death"
// [[Prototype]]: Object
  }
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    // toggle state between previous signup or not
    //equivalent of => setIsSignup(!isSignUp) -> we are doing this but correct way using call back functions
  }
  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          {/* we need to have a variabe to show whther it is signup or sign in form -> use state */}
          {/* default sign in -> as signup is false by default, if change then signup */}
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          {/* now form dalo */}
          {/* we cant have empty on submit-> so callback empty */}
          <form onSubmit={handleSubmit}>
            {isSignup && ( //when we need to show one thing based on condn, short form of ternary
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required //this will make it required
                />
              </div>
            )}

            {/* the username is down from signup as we need it both in signup and sign in, that's common */}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required //this will make it required
              />
            </div>

            {/*Next element will be inside signup block -> blocks will render if signup or not   */}

            {isSignup && ( //when we need to show one thing based on condn, short form of ternary
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required //this will make it required
                />
              </div>
            )}

            {/*Avatar URL -> isSignup once all shown during signup page  */}
            {isSignup && ( //when we need to show one thing based on condn, short form of ternary
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  type="text"
                  name="avatarURL"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required //this will make it required
                />
              </div>
            )}
            {/*Next element required is the password element - we will be needing that on both signUp and signIn pages */}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required //this will make it required
              />
            </div>
            {/*Confirm pwd  */}
            {isSignup && ( //when we need to show one thing based on condn, short form of ternary
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required //this will make it required
                />
              </div>
            )}
            {/* submit button */}
            <div className="auth__form-container_fields-content_button">
              <button>
                {isSignup? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </form>
          {/* form completed */}
          <div className="auth__form-container_fields-account">
            <p>
                {isSignup
                ? 'Already have an account?'
                : "Don't have an account?"}
                <span onClick={switchMode}>
                    {isSignup ? 'Sign In' : 'Sign Up'}
                </span>
            </p>
          </div>
        </div>
      </div>
      {/* for display of img make div */}
      <div className="auth__form-container_image">
        <img src={signinImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;
