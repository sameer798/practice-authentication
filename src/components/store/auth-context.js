import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


const AuthContext = createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
})

 
export const AuthContextProvider = (props)=>{
    const history = useHistory()
    const initialToken = localStorage.getItem('token')
   const [token, setToken] = useState(initialToken)
    const userIsLoggedIn = !!token;

    useEffect(() => {
      let logoutTimer;
      if(token){
       logoutTimer = setTimeout(()=>{
        autoLogoutHandler();
        },5*60* 5000)
      }
    
      return () => {
        if(logoutTimer){
            clearTimeout(logoutTimer)
        }
      }
    }, [token])
    

    const autoLogoutHandler = () =>{
        localStorage.removeItem('token');
        setToken(null);
        history.push('/auth')
    }

    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('token', token);
    }
    const logoutHandler = () =>{
        setToken(null)
        localStorage.removeItem('token')
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }


    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;