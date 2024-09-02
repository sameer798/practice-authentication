import { useState, useRef,useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";
import AuthContext from "../store/auth-context";

const AuthForm = () => {

 const authCtx = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoad((prevState) => !prevState);
    let url;
    if (isLogin) {
      url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAYWCRWOhOv8s1a7-ECHFaeykSUPgWveI";
      //..
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAYWCRWOhOv8s1a7-ECHFaeykSUPgWveI";
    }


    fetch(url,{
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        setIsLoad((prevState) => !prevState);
        return res.json();

        
      } else {
        setIsLoad((prevState) => !prevState);
        return res.json().then((data) => {
          let errorMessage = "Authentication failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage)
        });
      }
    }).then((data)=>{
   
      authCtx.login(data.idToken)
      history.replace('/')
    })
    .catch((err)=>{
      alert(err.message)
    })

  };



  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Acount"}</button>
          {isLoad && <p style={{ color: "red" }}>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
