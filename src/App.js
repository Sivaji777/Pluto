import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Index from './Components/Index/Index';
import Listing from './Components/Listing/Listing';
import Login from './Components/Login/Login';
import Registration from './Components/Registration/Registration';
import Resetpassword from './Components/Resetpassword/Resetpassword';
import Userdetails from './Components/UserDetails/Userdetails';


const App = () => {
  const location = useLocation();
  const [user,setuser] = useState('');
  const [pathename,setpathname] = useState('')
  useEffect(()=>{
    const loggedinuser = localStorage.getItem("UserName");
    if(loggedinuser){
      setuser(loggedinuser)
    }
  },[user,pathename])

  const UpdateFromLogin = ()=>{
    const loggedinuser = localStorage.getItem("UserName");
    //console.log(loggedinuser)
    if(loggedinuser){
      setuser(loggedinuser)
    }
  }
  if(localStorage.getItem("UserName") === null && location.pathname !== '/registration'  && location.pathname !== '/reset-password'){
    return  <Index />
    // <Login UpdateFromLogin={UpdateFromLogin}/>
  }
 

  return (
    <>
      <Switch>
        <Route  exact path="/">
          <Login />
        </Route>
        <Route exact path="/registration">
          <Registration />
        </Route>
        <Route exact path="/dashboard">
          <Index />
        </Route>
        <Route exact path="/listing/:id">
          <Listing />
        </Route>
        <Route exact path="/Userdetails/:id">
          <Userdetails />
        </Route>
        <Route exact path="/reset-password">
          <Resetpassword />
        </Route>
      </Switch>
    </>
  );
};

export default App;