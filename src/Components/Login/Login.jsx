import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';
import CryptoJS from 'crypto-js';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import '../../Css/bootstrap.css';
import '../../Css/login-style.css';
import logo from '../../images/Logo(2).png';
import '../../Js/login-common';


const Login = (args) => {
    const [user, setuser] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [usernamevalidation, setusernamevalidation] = useState('');
    const [passwordvalidation, setpasswordvalidation] = useState('');
    const parent = args;
    const [msg, setmsg] = useState('')
    const [open, setOpen] = React.useState(false);
    const [login, setlogin] = useState(false)
    useEffect(() => {
        const loggedinuser = localStorage.getItem("UserName");
        //console.log(loggedinuser)
        if (loggedinuser) {
            setuser(loggedinuser)
        }
    }, [])

    const handleUsername = (e) => {
        setusername(e.target.value)
    }
    const handlePassword = (e) => {
        setpassword(e.target.value)
    }
    const encryptFun=(v)=> {
        var data = v;
        var key  = CryptoJS.enc.Latin1.parse('1234567812345678');
        var iv   = CryptoJS.enc.Latin1.parse('1234567812345678');  
        var encrypted = CryptoJS.AES.encrypt(
          data,
          key,
          {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7}
          );
        return encrypted;
      }
    const handleSubmit = (e) => {
        var pwd= encryptFun(password);


        const data = {
            username: `${username}`,
            password: `${pwd}`
        }
        
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": ""
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_LOGIN_URL, data, options
        )
            .then((response) => {

                if (response.data.success) {
                    let jwtdecode = jwt_decode(response.data.data);
                    localStorage.setItem("UserName", jwtdecode.sub)
                    localStorage.setItem("Token", response.data.data)
                    localStorage.setItem("photoURL", response.data.photoURL)
                    localStorage.setItem("UserFullName", response.data.name)
                    localStorage.setItem("UserShortName", response.data.firstName[0] + response.data.lastName[0])
                    
                    //console.log(response.data)
                    //console.log(localStorage.getItem("UserShortName"));
                   // console.log(jwtdecode.sub)
                    parent.UpdateFromLogin()
                    setlogin(true)
                }
                //console.log(response)
            })
            .catch((error) => {
                console.log(error)
                setOpen(true)
                setmsg("Invalid login credential")
            })
    }

    if (localStorage.getItem("UserName")) {

        return <Redirect to="/dashboard" />
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    return (
        <div className="bg">
        <>
            {login === false ?
                <>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            {msg}
                        </Alert>
                    </Snackbar>

                    <section className="top_panel transition2">
                        <div className="logo wow fadeInDown"><img src={logo} alt="" /></div>
                        {/* <nav id="navHolder">
                            <ul id="nav">
                                <li><NavLink to={"/registration"}>Sign Up</NavLink></li>
                                <li><a href="#">More</a></li>
                            </ul>
                        </nav> */}
                    </section>
                    <div className="content_panel">
                        <section className="bg loginSec1">
                            <div className="loginSec1_cont">
                                <aside className="loginBox wow fadeInRight">
                                    <div className="signIn transition3">
                                        <h5 className='wlcm'>Welcome!</h5>
                                        <h3>Sign in to Pluto</h3>
                                        <h5 className='  ntpsignupm'>New to Pluto? <NavLink to={"/registration"}><span className='ntpsignup'>Sign Up</span></NavLink></h5>
                                        <ul className="signinForm">
                                            <li className="styled-input ">
                                                <h4 className='eml'>E-mail</h4>
                                                <input type="text" value={username} placeholder="name@gmail.com" onChange={(e) => handleUsername(e)} required onKeyPress={event => {
                                                    if (event.key === 'Enter') {
                                                       // console.log(event)
                                                        handleSubmit(event)
                                                    }
                                                  }}/>
                                                {/* <label>E-mail</label> */}
                                                {usernamevalidation !== '' && <span className="errorMsg" >{usernamevalidation}</span>}
                                            </li>
                                            <li className="styled-input ">
                                                <h4 className='eml'>Password</h4>
                                                <input type="password" value={password} placeholder="6 Characters, 1 Capital letter" required onChange={(e) => handlePassword(e)} onKeyPress={event => {
                                                    if (event.key === 'Enter') {
                                                        //console.log(event)
                                                        handleSubmit(event)
                                                    }
                                                  }} />
                                                {/* <label>Password</label> */}
                                                {passwordvalidation !== '' && <span className="errorMsg" >{passwordvalidation}</span>}
                                            </li>
                                            

                                        </ul>
                                        <span className="forgot_pass">Forgot Password? <Link to={"/reset-password"}> <span className='fprs'>Reset here</span></Link></span>
                                        
                                        <label className="submitBtn">Sign In <input type="button" onClick={(e) => handleSubmit(e)} className="submit_btn" /></label>
                                        
                                    </div>




                                    
{/* 
                                    <div className="password_reset transition3">
                                <span className="fp_close">close</span><h3>Let's find your account</h3>
                                {Stage === 0 && <><ul className="signinForm">
                                    <li className="styled-input emailIcon">
                                        <TextField name="Username" value={FormState.Username} onChange={(e) => handleChange(e)} />
                                        <label>Username/Email</label>

                                        {client_usernamemsg !== '' && <p className="errorMsg" >{client_usernamemsg}</p>}


                                    </li>


                                </ul>
                                    <label className="submitBtn" id="next"><span>Next</span><Button onClick={(e) => sendOtp(e)} className="submit_btn" value="Submit" /></label></>}

                                {Stage === 1 && <><ul className="signinForm">
                                    <li className="styled-input emailIcon">
                                        <span>{otpmsg}</span>
                                        <TextField name="Otp" value={FormState.Otp} onChange={(e) => handleChange(e)} />
                                        <label>OTP</label>

                                        {client_otpmsg !== '' && <p className="errorMsg" >{client_otpmsg}</p>}


                                    </li>


                                </ul>
                                    <label className="submitBtn" id="next"><Button onClick={(e) => verifyOtp(e)} value={`${otpbuttontext}`} /></label></>}

                                {Stage === 2 && <><ul className="signinForm">
                                    <li className="styled-input emailIcon">

                                        <TextField name="Password" type="password" value={FormState.Password} onChange={(e) => handleChange(e)} />
                                        <label>Password</label>

                                        {client_passwordmsg !== '' && <p className="errorMsg" >{client_passwordmsg}</p>}
                                        <TextField name="ConfirmPassword" type="ConfirmPassword" value={FormState.ConfirmPassword} onChange={(e) => handleChange(e)} />
                                        <label>Confirm Password</label>

                                        {client_cnfpasswordmsg !== '' && <span className="errorMsg" >{client_cnfpasswordmsg}</span>}

                                    </li>


                                </ul>
                                    <label className="submitBtn" id="next"><Button onClick={(e) => resetPassword(e)} value="Reset Password" /></label></>}
                                    </div>







                                    <div className="password_reset_success transition3">
                                        <span className="fp_close goSignin">close</span><h3>Reset your password</h3>
                                        <div>
                                            We've send an email. Click the link in the email to reset your password<br /><br />
                                            <i>I don't have access to any of these?<br /> Contact <a href="" style={{ textDecoration: 'underline' }}></a></i>
                                        </div>
                                        <label className="submitBtn goSignin"><span>Sign In Now</span></label>
                                    </div> */}
                                </aside>
                            </div>
                        </section>
                    </div>

                </> :  <Redirect to="/dashtheme" />}
                {/* // <Redirect to="/dashboard" />} */}
        </>
        </div>
    )
};

export default Login;