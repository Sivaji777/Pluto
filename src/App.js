import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Dashtheme from './Components/dashtheme/Dashtheme';
import Dashtheme1 from './Components/Dashtheme1/Dashtheme1';
import Dashtheme2 from './Components/Dashtheme2/Dashtheme2';
import Dashtheme3 from './Components/Dashtheme3/Dashtheme3';
import Dashtheme4 from './Components/Dashtheme4/Dashtheme4';
import Dashtheme5 from './Components/Dashtheme5/Dashtheme5';
import Dashtheme6 from './Components/Dashtheme6/Dashtheme6';
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
    return <Login UpdateFromLogin={UpdateFromLogin}/>
    //  <Index />
    // 
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
        <Route exact path="/dashtheme">
          <Dashtheme />
        </Route>
        <Route exact path="/dashtheme1">
          <Dashtheme1/>
        </Route>
        <Route exact path="/dashtheme2">
          <Dashtheme2/>
        </Route>
        <Route exact path="/dashtheme3">
          <Dashtheme3/>
        </Route>
         <Route exact path="/dashtheme4">
          <Dashtheme4/>
        </Route>
         <Route exact path="/dashtheme5">
          <Dashtheme5/>
        </Route>
        <Route exact path="/dashtheme6">
          <Dashtheme6/>
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