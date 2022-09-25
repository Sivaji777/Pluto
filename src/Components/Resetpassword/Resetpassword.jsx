import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios'
import { useParams, useHistory, Link } from 'react-router-dom';
import '../../Css/login-style.css';
import '../../Css/bootstrap.css';
import '../../Js/login-common';

const Resetpassword = () => {
    const [Stage, setStage] = useState(0)
    const [snackbarstatus, setsnackbarstatus] = useState(false)
    const [snackbarmsg, setsnackbarmsg] = useState("")
    const [otpmsg, setotpmsg] = useState("")
    const [otpbuttontext, setotpbuttontext] = useState("Verify OTP")

    const [client_usernamemsg, setclient_usernamemsg] = useState('')
    const [client_otpmsg, setclient_otpmsg] = useState('')
    const [client_passwordmsg, setclient_passwordmsg] = useState('')
    const [client_cnfpasswordmsg, setclient_cnfpasswordmsg] = useState('')
    const [client_reusernamemsg,setclient_reusernamemsg] = useState('')

    const [FormState, setFormState] = useState({
        Username: '',
        Otp: '',
        Password: '',
        ConfirmPassword: '',
        reusername:''
    });
    const handleChange = e => {
        setFormState({ ...FormState, [e.target.name]: e.target.value })
    }

    const sendOtp = (e) => {
        let flagA = true
        setclient_usernamemsg('')
        if (FormState.Username.trim() === '') {
            setclient_usernamemsg('Username can\'t be blank')
            flagA = false
        }
        if (flagA) {


            const data = {
                username: `${FormState.Username}`

            }
            const options = {
                headers: {
                    "cache-control": "no-cache",
                    "Content-Type": "application/json;charset=utf-8",
                    "Access-Control-Allow-Origin": ""
                }
            }
            Axios.post(
                process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_POST_RESETPASSWORD_GET_OTP, data, options
            )
                .then((response) => {

                    if (response.data.success) {
                        setotpmsg("OTP has been sent to the registered email id")
                        setStage(1)
                    } else {
                        setsnackbarstatus(true)
                        setsnackbarmsg("Invalid user info")
                    }
                    //console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                    setsnackbarstatus(true)
                    setsnackbarmsg("Some error has been occurred")
                })
        }
    }

    const verifyOtp = (e) => {
        let flagA = true
        setclient_otpmsg('')
        if (FormState.Otp.trim() === '') {
            setclient_otpmsg('Otp can\'t be blank')
            flagA = false
        }
        if (flagA) {
            const data = {
                username: `${FormState.Username}`,
                otp: `${FormState.Otp}`
            }
            const options = {
                headers: {
                    "cache-control": "no-cache",
                    "Content-Type": "application/json;charset=utf-8",
                    "Access-Control-Allow-Origin": ""
                }
            }
            Axios.post(
                process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_POST_RESETPASSWORD_VERIFY_OTP, data, options
            )
                .then((response) => {

                    if (response.data.success) {

                        setStage(2)
                    } else {
                        setsnackbarstatus(true)
                        setotpbuttontext('Resend Otp')
                        setsnackbarmsg("Invalid otp")
                    }
                    //console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                   
                    setsnackbarstatus(true)
                    setsnackbarmsg("Some error has been occurred")
                })
        }
    }

    const resetPassword = (e) => {
        let flagA = true
        setclient_reusernamemsg('')
        setclient_passwordmsg('')
        setclient_cnfpasswordmsg('')
        //reusername
        if (FormState.reusername.trim() === '') {
            setclient_reusernamemsg('Username can\'t be blank')
            flagA = false
        }
        if (FormState.Password.trim() === '') {
            setclient_passwordmsg('Password can\'t be blank')
            flagA = false
        } else {
            if (FormState.Password.indexOf(' ') >= 0) {
                setclient_passwordmsg('Password can\'t contain white space')
                flagA = false
            }
        }

        if (FormState.ConfirmPassword.trim() === '') {
            setclient_cnfpasswordmsg('Confirm Password can\'t be blank')
            flagA = false
        }

        if (FormState.Password === FormState.ConfirmPassword) {
            setclient_cnfpasswordmsg('Password and Confirm Password not matching')
            flagA = false
        }
        if(flagA){

       
        const data = {
            username: `${FormState.reusername}`,
            password: `${FormState.Password}`,

        }
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": ""
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_POST_RESETPASSWORD_RESET_PASSWORD, data, options
        )
            .then((response) => {

                if (response.data.success) {
                    setFormState({
                        Username: '',
                        Otp: '',
                        Password: '',
                        ConfirmPassword: '',
                        reusername:''
                    })
                    setsnackbarstatus(true)
                    setsnackbarmsg("Password has been created successfully")
                } else {
                    setsnackbarstatus(true)

                    setsnackbarmsg("Some error has been occurred. Please contact with administrator")
                }
                //console.log(response)
            })
            .catch((error) => {
                console.log(error)
                setsnackbarstatus(true)
                setsnackbarmsg("Some error has been occurred")
            })
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setsnackbarstatus(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    return (
        <React.Fragment>
            <Snackbar open={snackbarstatus} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {snackbarmsg}
                </Alert>
            </Snackbar>



            <div className="reset-new content_panel">
                <section className="bg loginSec1">
                    <div className="loginSec1_cont">
                        <aside className="loginBox wow fadeInRight">



                            {/* <div className="signIn transition3">
                                        <h3>Sign in</h3>
                                        <ul className="signinForm">
                                            <li className="styled-input unIcon">
                                                <input type="text" value={username} onChange={(e) => handleUsername(e)} required />
                                                <label>User Name</label>
                                                {usernamevalidation !== '' && <span className="errorMsg" >{usernamevalidation}</span>}
                                            </li>
                                            <li className="styled-input passIcon">
                                                <input type="password" value={password} required onChange={(e) => handlePassword(e)} />
                                                <label>Password</label>
                                                {passwordvalidation !== '' && <span className="errorMsg" >{passwordvalidation}</span>}
                                            </li>

                                        </ul>
                                        <label className="submitBtn"><span>Sign in</span><input type="button" onClick={(e) => handleSubmit(e)} className="submit_btn" /></label>
                                        <span className="forgot_pass">Forgot Password</span>
                            </div> */}




                            <div className="password_reset transition3">
                                {/* <span className="fp_close">close</span> */}
                                <h3>Let's find your account</h3>
                                {Stage === 0 && <><ul className="signinForm">
                                    <li className="styled-input emailIcon">
                                        <TextField name="Username" value={FormState.Username} placeholder="UserName/Email" onChange={(e) => handleChange(e)} />
                                        {client_usernamemsg !== '' && <p className="errorMsg" >{client_usernamemsg}</p>}
                                    </li>


                                </ul>
                                    <label className="yty submitBtn" id="next"><span>Next</span><Button onClick={(e) => sendOtp(e)} className="submit_btn" value="Submit" /></label></>}
                                    
                                    <Link to={"/"} className="back-login"><span className="fp_close">close</span></Link>
                                {Stage === 1 && <>
                               
                                <ul className="new-otp signinForm">
                                    <li className="styled-input emailIcon">
                                        
                                        <TextField name="Otp" value={FormState.Otp} placeholder="OTP" onChange={(e) => handleChange(e)} />
                                
                                        <div className="clr"></div>
                                        <span className="otp">{otpmsg}</span>
                                        {client_otpmsg !== '' && <p className="errorMsg" >{client_otpmsg}</p>}
                                        

                                    </li>


                                </ul>
                                    <label className="submitBtn" id="next"><Button onClick={(e) => verifyOtp(e)} value={`${otpbuttontext}`} >{`${otpbuttontext}`}</Button></label></>}

                                {Stage === 2 && <><ul className="new-password signinForm">


                                    <li className="ttu styled-input">

                                    <TextField name="reusername" type="text" placeholder="User name" value={FormState.reusername} onChange={(e) => handleChange(e)} />

                                    {client_reusernamemsg !== '' && <p className="errorMsg" >{client_reusernamemsg}</p>}
                                    </li>


                                    <li className="styled-input emailIcon">

                                        <TextField name="Password" type="password" placeholder="Password" value={FormState.Password} onChange={(e) => handleChange(e)} />
                                       
                                        {client_passwordmsg !== '' && <p className="errorMsg" >{client_passwordmsg}</p>}
                                    </li>

                                    <li className="styled-input emailIcon">

                                       
                                        <TextField name="ConfirmPassword" type="Password" placeholder="Confirm Password" value={FormState.ConfirmPassword} onChange={(e) => handleChange(e)} />

                                        {client_cnfpasswordmsg !== '' && <span className="errorMsg" >{client_cnfpasswordmsg}</span>}

                                    </li>


                                </ul>
                                    <label className="wwe submitBtn" id="next"><Button onClick={(e) => resetPassword(e)} value="Reset Password">Reset Password</Button></label></>}
                            </div>
                            {/* <div className="password_reset_success transition3">
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


        </React.Fragment>
    );
}

export default Resetpassword