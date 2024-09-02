import { useRef, useContext } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../store/auth-context';

const ProfileForm = () => {
 const authCtx = useContext(AuthContext)
const newPasswordRef = useRef();
  const submitHandler = (e)=>{
    const enteredNewPassword = newPasswordRef.current.value;
    e.preventDefault();
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDAYWCRWOhOv8s1a7-ECHFaeykSUPgWveI', {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      if(res.ok){
        alert("password successfully changed.")
      }
    })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
