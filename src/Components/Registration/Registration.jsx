import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';
import CryptoJS from 'crypto-js';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../Css/bootstrap.css';
import '../../Css/login-style.css';
import logo from '../../images/Logo(2).png';
import '../../Js/login-common';



function Registration(props) {
    const [username, setusername] = useState('');
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [password, setpassword] = useState('');
    const [open, setOpen] = React.useState(false);
    const [visible,setvisible] = useState(true)

    const [msg, setmsg] = useState('')

    const [usernamemsg, setusernamemsg] = useState('');
    const [Firstnamemsg, setFirstnamemsg] = useState('');
    const [Lastnamemsg, setLastnamemsg] = useState('');
    const [Emailmsg, setEmailmsg] = useState('');
    const [Phonemsg, setPhonemsg] = useState('');
    const [passwordmsg, setpasswordmsg] = useState('');

    const handleChangeUsername = (e) => {
        setusername(e.target.value)
    }
    const handleChangeFirstname = (e) => {
        setFirstname(e.target.value)
    }
    const handleChangeLastname = (e) => {
        setLastname(e.target.value)
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const handleChangePassword = (e) => {
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

    const handleSubmit = () => {
        let flag = true
        if (username.trim() === '') {
            setusernamemsg('Please enter user name')
            flag = false
        }
        else {
            setusernamemsg('')
        }
        if (Firstname.trim() === '') {
            setFirstnamemsg('Please enter first name')
            flag = false
        }
        else {
            setFirstnamemsg('')
        }

        if (Lastname.trim() === '') {
            setLastnamemsg('Please enter last name')
            flag = false
        }
        else {
            setLastnamemsg('')
        }

        if (Email.trim() === '') {
            setEmailmsg('Please enter email')
            flag = false
        }
        else {
            setEmailmsg('')
        }

        if (Phone.trim() === '') {
            setPhonemsg('Please enter phone no')
            flag = false
        }
        else {
            setPhonemsg('')
        }

        if (password.trim() === '') {
            setpasswordmsg('Please enter password')
            flag = false
        }
        else {
            setpasswordmsg('')
        }
        if (flag) {
            setvisible(false)
            var pwd= encryptFun(password);
            
            const data = {
                "userId": username,
                "firstName": Firstname,
                "lastName": Lastname,
                "email": Email,
                "password": `${pwd}`,
                "phone": Phone
            }
            
            const options = {
                headers: {
                    "cache-control": "no-cache",
                    "Content-Type": "application/json;charset=utf-8",
                    "Access-Control-Allow-Origin": ""
                }
            }
            Axios.post(
                process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_INSERT_USER_URL, data, options
            )
                .then((response) => {
                    if (response.data.success) {
                        setmsg(response.data.message)
                        setOpen(true)
                    }

                   // console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {msg}
                </Alert>
            </Snackbar>

            <section className="top_panel transition2">
                        <div className="logo wow fadeInDown"><img src={logo} alt="" /></div>
                        <nav id="navHolder">
                            {/* <ul id="nav">
                                <li><NavLink to={"/"}>Login</NavLink></li>
                                <li><a href="#">More</a></li>
                            </ul> */}
                        </nav>
                    </section>

            <div class="content_panel">
                <section class="loginSec1">
                    
                    <div class="loginSec1_cont">
                        <aside class="nnr loginBox wow fadeInRight">
                            <div class="signIn transition3">
                                <h3>Registration form</h3>
                                
                                <ul class="signinForm2">
                                    <li class="styled-input unIcon">
                                        <h4 className='eml'>User Name</h4>
                                        <input type="text" onChange={(e) => handleChangeUsername(e)} />
                                        {/* <label>User Name</label> */}
                                        {usernamemsg !== '' && <span class="errorMsg">{usernamemsg}</span>}
                                    </li>

                                    <li class="styled-input unIcon">
                                        <h4 className='eml'>First Name</h4>
                                        <input type="text" onChange={(e) => handleChangeFirstname(e)} />
                                        {/* <label>First Name</label> * /}
                                        {Firstnamemsg !== '' && <span class="errorMsg" >{Firstnamemsg}</span>}
                                    </li>

                                    <li class="styled-input unIcon">
                                        <h4 className='eml'>Last Name</h4>
                                        <input type="text" onChange={(e) => handleChangeLastname(e)} />
                                        {/* <label>Last Name</label> */}
                                        {Lastnamemsg !== '' && <span class="errorMsg" >{Lastnamemsg}</span>}
                                    </li>

                                    <li class="styled-input unIcon">
                                        <h4 className='eml'>E-mail</h4>
                                        <input type="text" onChange={(e) => handleChangeEmail(e)} />
                                        {/* <label>Email</label> */}
                                        {Emailmsg !== '' && <span class="errorMsg" >{Emailmsg}</span>}
                                    </li>
                                    <li class="styled-input unIcon">
                                        <h4 className='eml'>Phone</h4>
                                        <input type="text" onChange={(e) => handleChangePhone(e)} />
                                        {/* <label>Phone</label> */}
                                        {Phonemsg !== '' && <span class="errorMsg" >{Phonemsg}</span>}
                                    </li>

                                    <li class="styled-input passIcon">
                                        <h4 className='eml'>Password</h4>
                                        <input type="password" onChange={(e) => handleChangePassword(e)} />
                                        {/* <label>Password</label> */}
                                        {passwordmsg !== '' && <span class="errorMsg" >{passwordmsg}</span>}
                                    </li>
                                </ul>
                                {visible && <label class="submitBtn"><span>Register Now</span><input type="button" class="submit_btn" onClick={() => handleSubmit()} /></label>}
                            </div>

                        </aside>

                    </div>
                </section>
            </div>
        </div>
    );
}

export default Registration;