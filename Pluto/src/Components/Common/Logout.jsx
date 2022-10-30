import React,{useState} from 'react';
import {Redirect,Link} from 'react-router-dom'
const Logout = () =>{
    const [loggedin,setloggedin] = useState(true)
    let isLogout =false
    const LogoutFromPage=(e)=>{
        e.preventDefault();
        localStorage.clear();
        //isLogout = true
        setloggedin(false)
    }
    
    
    return(
        <>
            {/* {loggedin === true ? <button onClick={()=>LogoutFromPage()}>Log Out</button>:<Redirect to="/"/>} */}
            {loggedin === true ? <Link onClick={(e)=>LogoutFromPage(e)} className="dropdown-item" to={"#"}><i className="mdi mdi-logout mr-2 text-primary"></i> Signout </Link>:<Redirect to="/"/>}
        </>
    );
}
export default Logout;