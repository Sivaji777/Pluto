import { FormHelperText } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import Userdetailsscript from '../Common/test';
import Axios from 'axios';
import parse from 'html-react-parser';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import '../../Css/font-awesome.min.css';
import '../../Css/materialdesignicons.min.css';
import '../../Css/new-style.css';
import '../../Css/style.css';
import attachment from '../../images/attachment.png';
import back from '../../images/back.png';
import close from '../../images/close.png';
import logos from '../../images/logos.png';
import smile from '../../images/smile.png';
import Footer from '../Common/footer';
import Left from '../Common/Left';
import Logout from '../Common/Logout';
function Userdetails(props) {

    const [Overview, setOverview] = useState([]);
    const [tabs, settabs] = useState();
    const [Timeline, setTimeline] = useState([]);
    const [Maillist, setMaillist] = useState([]);
    const [Gid, setGid] = useState();
    const [MailSubject, setMailSubject] = useState();
    const [MailTo, setMailTo] = useState();
    const [MailBody, setMailBody] = useState();
    const [MailSentDate, setMailSentDate] = useState();
    const [Logs, setLogs] = useState();
    const [Chats, setChats] = useState();
    const [CurrentChats, setCurrentChats] = useState();
    const [ChatText, setChatText] = useState('');
    const [ChatMsg, setChatMsg] = useState('');

    const [open, setOpen] = React.useState(false);
    const [msg, setmsg] = useState('')
    const [Projectname, setProjectname] = useState('');
    const [Documentlist, setDocumentlist] = useState([]);
    const [Menupos, setMenupos] = useState(false);
    const [Mailcontent, setMailcontent] = useState('');
    const [Mailsendsubject, setMailsendsubject] = useState('');

    const [MailcontentMsg, setMailcontentMsg] = useState('');
    const [MailsendsubjectMsg, setMailsendsubjectMsg] = useState('');
    const [MailFromName, setMailFromName] = useState('');

    const [ButtonList, setButtonList] = useState([]);
    const [IsSendMailAllowed, setIsSendMailAllowed] = useState(false);

    const [CommentOpen, setCommentOpen] = useState(false)
    const [ButtonStatus, setButtonStatus] = useState('')
    const [Comments, setComments] = useState('')
    const [CommentMsg, setCommentMsg] = useState('')
    
    const [Menupos1, setMenupos1] = useState(false);
    const ShowMenu1 = () => {
        if (Menupos1) {
            setMenupos1(false)
        } else {
            setMenupos1(true)
        }

    }
    const { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        getUserDetailsData()
        getUserTimeLineData()
        settabs(1)
        getMailBody()
        getLogs()
        getChats()
        getDocuments()
        getProjectRole()
    }, [])

    const getUserDetailsData = () => {
        const data = {
            "gid": id
        }
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_USERDETAILS_URL, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        )

            .then(res => {
                setOverview(res.data);
                setProjectname(res.data[0].projectName)
            })
            .catch(err => {
                console.log(err);
            })




    }

    const getUserTimeLineData = () => {
        const data = {
            "gid": id
        }
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_PROJECT_TIMILINE_URL, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        )

            .then(res => {
                setTimeline(res.data);
            })
            .catch(err => {
                console.log(err);
            })



    }

    const handleClick = (e) => {
        //console.log(e.target.getAttribute('data-val'))
        settabs(parseInt(e.target.getAttribute('data-val')))
    }

    const GenerateTimeLine = (props) => {

        const records = props.timelines;
        const Items = records !== undefined && records.length > 0 ? records.map((timeline, index) =>

            <li className="list-inline-item event-list" key={index}>

                <div className={`box${index + 1}a`}>
                    <div className="event-date bg-soft-warning text-warning">
                        <span className="icon1"></span>
                    </div>
                    <h5 className="font-size-16">{timeline.name}</h5>
                    <p className="text-muted">{moment(timeline.date).format("Do MMMM YYYY")}</p>
                </div>
            </li>
        ) : <li >No records found</li>;
        return (
            <ul className="list-inline events">{Items}</ul>
        );
    }

    const getMailBody = () => {
        //console.log(id)
        const data = {
            "gid": id
        }
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + localStorage.getItem('Token')
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_MAILBODY_URL, data, options
        )
            .then((response) => {
                let maillist = response.data;
                if (maillist.length > 0) {
                    setMaillist(maillist);
                    setGid(maillist[0].gid)
                    setMailSubject(maillist[0].subject)
                    setMailTo(maillist[0].to)
                    setMailBody(maillist[0].content)
                    setMailSentDate(maillist[0].sendDate)
                    setMailFromName(maillist[0].fromName)
                }

                //console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })


    }

    const Changeemail = (val) => {
        //console.log(val)
        setGid(val)
        const result = Maillist.filter(item => item.gid === val)[0];
        //console.log(result)
        setMailSubject(result.subject)
        setMailTo(result.to)
        setMailBody(result.content)
        setMailSentDate(result.sendDate)
        setMailFromName(result.fromName)
    }

    const getLogs = () => {
        const data = {
            "gid": id
        }
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + localStorage.getItem('Token')
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_LOG_URL, data, options
        )
            .then((response) => {
                let loglist = response.data;
                setLogs(loglist)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getChats = () => {
        const data = {
            "gid": id
        }
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + localStorage.getItem('Token')
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_CHAT_URL, data, options
        )
            .then((response) => {
                let chatlist = response.data;
                setChats(chatlist.filter((item) => moment(item.createdOn).format('YYYYMMDD') < moment().format('YYYYMMDD')))
                setCurrentChats(chatlist.filter((item) => moment(item.createdOn).format('YYYYMMDD') === moment().format('YYYYMMDD')))
                setChatText('');
                setChatMsg('')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const ChangeChatText = (e) => {
        setChatText(e.target.value)
    }

    const SubmitChat = () => {

        if (ChatText.trim() === '') {
            setChatMsg('Please enter message')
        } else {
            const data = {
                "createdBy": localStorage.getItem("UserName"),
                "chatDetails": ChatText,
                "taskId": id,
                "name": "chat",
                "createdOn": moment()
            }
            const options = {
                headers: {
                    "cache-control": "no-cache",
                    "Content-Type": "application/json;charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + localStorage.getItem('Token')
                }
            }
            Axios.post(
                process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_UPDATECHAT_URL, data, options
            )
                .then((response) => {

                    //console.log(response)
                    getChats();
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

   

    const UpdateStatus = (status) => {
        let flagA = true;
        if (Comments.trim() === '') {
            setCommentMsg('Please enter notes')
            flagA = false;
        } else {
            setCommentMsg('')
        }
        if (flagA) {
            const data = {
                "gid": id,
                "decision": status,
                "notes":  `${Comments}`,
                "decisionDate": moment()
            }
            const options = {
                headers: {
                    "cache-control": "no-cache",
                    "Content-Type": "application/json;charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + localStorage.getItem('Token')
                }
            }
            Axios.post(
                process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_UPDATEDECISION_URL, data, options
            )
                .then((response) => {

                    //console.log(response)
                    setmsg("Status updated successfully")
                    setCommentOpen(false)
                    setOpen(true)

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

    const getDocuments = () => {
        const data = {
            "gid": id
        }
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + localStorage.getItem('Token')
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_GET_DOCUMENTS_URL, data, options
        )
            .then((response) => {
                let documentlist = response.data[0].fieldDetails;
                //console.log(documentlist)
                setDocumentlist(documentlist)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const ShowMenu = () => {
        if (Menupos) {
            setMenupos(false)
        } else {
            setMenupos(true)
        }

    }

    const GetInitial = (props) => {
        let [first, ...second] = props.val.split(" ")
        second = second.join(" ")
        //console.log(first[0])
        //console.log(second[0])
        let t = first[0] + (second !== undefined && second !== null ? second[0] : '');
        return t;
    }

    const ChangeMailbody = (e) => {
        setMailcontent(e.target.value)
    }
    const ChangeSubject = (e) => {
        setMailsendsubject(e.target.value)
    }

    const SubmitMail = () => {
        let FlagA = true;
        if (Mailcontent.trim() === '') {
            setMailcontentMsg('Please enter mail subject')
            FlagA = false
        }
        else {
            setMailcontentMsg('')
        }
        if (Mailsendsubject.trim() === '') {
            setMailsendsubjectMsg('Please enter mail subject')
            FlagA = false
        } else {
            setMailsendsubjectMsg('')
        }
        if (FlagA) {
            const data = {
                "content": Mailcontent,
                "subject": Mailsendsubject,
                "taskId": id,
                "name": "chat",
                "sendDate": moment()
            }
            const options = {
                headers: {
                    "cache-control": "no-cache",
                    "Content-Type": "application/json;charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + localStorage.getItem('Token')
                }
            }
            Axios.post(
                process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_POST_EMAIL_URL, data, options
            )
                .then((response) => {

                    //console.log(response)
                    getMailBody();
                    setmsg("Record updated successfully")
                    setOpen(true)
                    setMailcontent('')
                    setMailsendsubject('')
                    //getChats();
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const getProjectRole = () => {
        const data = {
            "taskId": id
        }

        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_POST_ACTIVITY_ROLE_DETAILS_URL, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        )

            .then(res => {
                //console.log(res.data.name)
                //setIsAssignAllowed
                //setButtonList
                //setRole(res.data)

                let rolelist = res.data.filter(m => m.type === 'Button' && m.name !== 'Send Email')
                let sendmail = res.data.filter(m => m.type === 'Button' && m.name === 'Send Email')
                if (sendmail.length > 0) {
                    setIsSendMailAllowed(true)
                }
                setButtonList(rolelist)
                //console.log(assign)
                //console.log(rolelist)
            })
            .catch(err => {
                console.log(err.response.status);
                console.log(err.response.data);
            })
    }

    const OpenComment = (status) => {
        setCommentOpen(true)
        setButtonStatus(status)
    }

    const ChangeComments = (e) => {
        setComments(e.target.value)
    }

    const CloseBox = ()=>{
        setCommentOpen(false)
        setCommentMsg('')
       
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {msg}
                </Alert>
            </Snackbar>
            <div className="detetails2 tty container-scroller">

                <Left isShow={(Menupos1)?"sidebar-icon-only":""}/>
                <div className="container-fluid page-body-wrapper">
                    <div id="theme-settings" className="settings-panel">
                        <i className="settings-close mdi mdi-close"></i>
                        <p className="settings-heading">SIDEBAR SKINS</p>
                        <div className="sidebar-bg-options selected" id="sidebar-default-theme">
                            <div className="img-ss rounded-circle bg-light border mr-3"></div> Default
                        </div>
                        <div className="sidebar-bg-options" id="sidebar-dark-theme">
                            <div className="img-ss rounded-circle bg-dark border mr-3"></div> Dark
                        </div>
                        <p className="settings-heading mt-2">HEADER SKINS</p>
                        <div className="color-tiles mx-0 px-4">
                            <div className="tiles light"></div>
                            <div className="tiles dark"></div>
                        </div>
                    </div>
                    <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
                        <div className="navbar-menu-wrapper d-flex align-items-stretch justify-content-between">
                            <Link to={"/"} className="navbar-brand brand-logo-mini align-self-center d-lg-none">
                                <img src={logos} alt="" /></Link>
                            <button className="navbar-toggler navbar-toggler align-self-center mr-2" type="button" onClick={() => ShowMenu1()}>
                                <i className="mdi mdi-menu"></i>
                            </button>
                            <ul className="navbar-nav">

                                <li className="nav-item nav-search border-0 ml-1 ml-md-3 ml-lg-5 d-none d-md-flex">
                                    <form className="nav-link form-inline mt-2 mt-md-0">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <i className="mdi mdi-magnify"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                            <ul className="navbar-nav navbar-nav-right ml-lg-auto">
                                  {/* <li className="nav-item dropdown">
                                    <Link to={"#"} className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" data-toggle="dropdown">
                                        <i className="mdi mdi-bell-outline"></i>
                                    </Link> 
                                  <div className="dropdown-menu navbar-dropdown navbar-dropdown-large preview-list" aria-labelledby="notificationDropdown">
                                        <h6 className="p-3 mb-0">Notifications</h6>
                                        {/* <Link to={"#"} className="dropdown-item preview-item">
                                            <div className="preview-thumbnail">
                                                <img src="images/faces/face4.jpg" alt="" className="profile-pic" />
                                            </div>
                                            <div className="preview-item-content">
                                                <p className="mb-0"> Dany Miles <span className="text-small text-muted">commented on your photo</span>
                                                </p>
                                            </div>
                                        </Link>
                                        <Link to={"#"} className="dropdown-item preview-item">
                                            <div className="preview-thumbnail">
                                                <img src="images/faces/face3.jpg" alt="" className="profile-pic" />
                                            </div>
                                            <div className="preview-item-content">
                                                <p className="mb-0"> James <span className="text-small text-muted">posted a photo on your wall</span>
                                                </p>
                                            </div>
                                        </Link>
                                        <Link to={"#"} className="dropdown-item preview-item">
                                            <div className="preview-thumbnail">
                                                <img src="images/faces/face2.jpg" alt="" className="profile-pic" />
                                            </div>
                                            <div className="preview-item-content">
                                                <p className="mb-0"> Alex <span className="text-small text-muted">just mentioned you in his post</span>
                                                </p>
                                            </div>
                                        </Link> 
                                        <div className="dropdown-divider"></div>
                                        <p className="p-3 mb-0">View all activities</p>
                                    </div>
                                </li>*/}
                                {/* <li className="nav-item dropdown d-none d-sm-flex">
                                    <Link to={"#"} className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-toggle="dropdown">
                                         <i className="mdi mdi-email-outline"></i>
                                    </Link>
                                    <div className="dropdown-menu navbar-dropdown navbar-dropdown-large preview-list" aria-labelledby="messageDropdown">
                                        <h6 className="p-3 mb-0">Messages</h6>
                                        <Link to={"#"} className="dropdown-item preview-item">
                                            <div className="preview-item-content flex-grow">
                                                <span className="badge badge-pill badge-success">Request</span>
                                                <p className="text-small text-muted ellipsis mb-0"> Suport needed for user123 </p>
                                            </div>
                                            <p className="text-small text-muted align-self-start"> 4:10 PM </p>
                                        </Link>
                                        <Link to={"#"} className="dropdown-item preview-item">
                                            <div className="preview-item-content flex-grow">
                                                <span className="badge badge-pill badge-warning">Invoices</span>
                                                <p className="text-small text-muted ellipsis mb-0"> Invoice for order is mailed </p>
                                            </div>
                                            <p className="text-small text-muted align-self-start"> 4:10 PM </p>
                                        </Link>
                                        <Link to={"#"} className="dropdown-item preview-item">
                                            <div className="preview-item-content flex-grow">
                                                <span className="badge badge-pill badge-danger">Projects</span>
                                                <p className="text-small text-muted ellipsis mb-0"> New project will start tomorrow </p>
                                            </div>
                                            <p className="text-small text-muted align-self-start"> 4:10 PM </p>
                                        </Link>
                                        <h6 className="p-3 mb-0">See all activity</h6>
                                    </div>
                                </li> */}

                                <li className="nav-item nav-profile dropdown border-0">
                                    <Link to={"#"} onClick={() => ShowMenu()} className="nav-link dropdown-toggle" id="profileDropdown" data-toggle="dropdown">
                                    {
                                        localStorage.getItem("photoURL") !=undefined && localStorage.getItem("photoURL").length>0?
                                        <>
                                        {
                                            <img className="nav-profile-img mr-2" alt="" src={localStorage.getItem("photoURL")} />
                                        }
                                        </>
                                        :
                                        <>
                                        <div className='user-name'>{localStorage.getItem("UserShortName")}</div>
                                        </>
                                    }
                                        <span className="profile-name">{localStorage.getItem("UserFullName")}</span>
                                    </Link>
                                    {Menupos === true && <div className="navbar-dropdown w-100" aria-labelledby="profileDropdown">

                                        <Logout />
                                    </div>}
                                </li>
                            </ul>
                            <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                                <span className="mdi mdi-menu"></span>
                            </button>
                        </div>
                    </nav>

                    <div className="main-panel">
                        <div className="content-wrapper pb-0">
                            <div className="page-header flex-wrap">
                                <h3 className="mb-0">{Projectname}</h3>


                                <div className="bbr d-flex">
                                    <div className="submite5">

                                        {
                                            ButtonList !== undefined && ButtonList.length > 0 ? ButtonList.map((item, index) => <Link className={item.css} key={index} onClick={() => OpenComment(`${item.name}`)} to={"#"}>{`${item.name}`}</Link>) : <></>

                                        }
                                    </div>
                                    {CommentOpen && <div className="CommentMsg">

                                        {CommentMsg !== '' && <label>{CommentMsg}</label>}
                                        <div className="name">Notes</div>
                                        <input type="text" value={Comments} maxLength="150" onChange={(e) => ChangeComments(e)} />
                                        <input type="button" value="Submit" onClick={() => UpdateStatus(`${ButtonStatus}`)} />
                                        <div className="close-img"><Link to={"#"} onClick={()=>CloseBox()}><img src={close} alt="" /></Link></div>
                                    </div>}
                                    <Link to={"/"} onClick={() => history.goBack()}><img src={back} alt="" /></Link>
                                </div>


                            </div>
                            <div className="row">
                                <div className="col-xl-3 col-sm-9 grid-margin stretch-card">
                                    <div className="left-part" >
                                        {Overview[3] !== undefined && <article>
                                            <h3>{Overview[3].fieldDetails[0] !== undefined ? Overview[3].fieldDetails[0].value : ''} {Overview[3].fieldDetails[1] !== undefined ? Overview[3].fieldDetails[1].value : ''}</h3>
                                            <ul>
                                                
                                                {Overview[3].fieldDetails[5] !== undefined ? <li className="icon3"><i class="mdi mdi-map-marker-radius menu-icon"></i>  {Overview[3].fieldDetails[5].value} </li>: ''}
                                                
                                                 {Overview[3].fieldDetails[6] !== undefined ? <li className="icon2"><i class="mdi mdi-home menu-icon"></i> {Overview[3].fieldDetails[6].value}</li> : ''}

                                                
                                                {Overview[3].fieldDetails[3] !== undefined ? <li className="icon1"><i class="mdi mdi-at menu-icon"></i> {Overview[3].fieldDetails[3].value}</li> : ''}

                                                {Overview[0].fieldDetails[0] !== undefined ?<li className="icon4"><i class="mdi mdi-account menu-icon"></i>  {Overview[0].fieldDetails[0].value}</li> : ''}


                                                
                                                {Overview[0].fieldDetails[3] !== undefined ? <li className="icon5"><i class="mdi mdi-chart-areaspline menu-icon"></i> {Overview[0].fieldDetails[3].value} </li> : ''}

                                                
                                                {Overview[3].fieldDetails[2] !== undefined ? <li className="icon6"><i class="mdi mdi-bullhorn menu-icon"></i> {Overview[3].fieldDetails[2].value}</li> : ''}
                                                
                                                
                                                {Overview[3].fieldDetails[4] !== undefined ? <li className="icon7"><i class="mdi mdi-calculator menu-icon"></i> {Overview[3].fieldDetails[4].value}</li> : ''}
                                            </ul>
                                        </article>}
                                        <hr />

                                        {Overview[0] !== undefined && <div className="education">
                                            <p><u>Education</u></p>
                                            <p>{Overview[0].fieldDetails[0].value}<br />{Overview[0].fieldDetails[1].value}<br />{Overview[0].fieldDetails[2].value}</p>
                                        </div>}
                                    </div>
                                </div>
                                <div className="det-pages col-xl-9 col-sm-9 grid-margin stretch-card">
                                    <div className="w-100">
                                        <div className="scroller scroller-left float-left mt-2"><i className="fa fa-chevron-left"></i></div>
                                        <div className="scroller scroller-right float-right mt-2"><i className="fa fa-chevron-right"></i></div>
                                        <div className="wrapper">
                                            <nav className="nav nav-tabs list mt-2" id="myTab" role="tablist">
                                                {tabs === 1 ? <Link to={"#"} className="nav-item nav-link active" data-toggle="tab" role="tab" data-val="1" aria-controls="public" aria-expanded="true" onClick={(e) => handleClick(e)}><i class="mdi mdi-atom"></i> Overview</Link> : <Link to={"#"} className="nav-item nav-link " data-toggle="tab" role="tab" data-val="1" aria-controls="public" aria-expanded="true" onClick={(e) => handleClick(e)}><i class="mdi mdi-atom"></i> Overview</Link>}
                                                {tabs === 2 ? <Link to={"#"} className="nav-item nav-link active" role="tab" data-toggle="tab" data-val="2" onClick={(e) => handleClick(e)}><i class="mdi mdi-comment-multiple-outline"></i> Chat</Link> : <Link to={"#"} className="nav-item nav-link" role="tab" data-toggle="tab" data-val="2" onClick={(e) => handleClick(e)}><i class="mdi mdi-comment-multiple-outline"></i> Chat</Link>}
                                                {/* {tabs === 3? <Link to={"#"} className="nav-item nav-link active"  role="tab" data-toggle="tab" data-val="3" onClick={(e)=>handleClick(e)}>Messages</Link>:<Link className="nav-item nav-link "  role="tab" data-toggle="tab" data-val="3" onClick={(e)=>handleClick(e)}>Messages</Link>} */}
                                                {tabs === 4 ? <Link to={"#"} className="nav-item nav-link active" role="tab" data-toggle="tab" data-val="4" onClick={(e) => handleClick(e)}><i class="mdi mdi-at menu-icon"></i> Emails</Link> : <Link to={"#"} className="nav-item nav-link " role="tab" data-toggle="tab" data-val="4" onClick={(e) => handleClick(e)}><i class="mdi mdi-at menu-icon"></i> Emails</Link>}
                                                {tabs === 5 ? <Link to={"#"} className="nav-item nav-link active" role="tab" data-toggle="tab" data-val="5" onClick={(e) => handleClick(e)}><i class="mdi mdi-lightbulb-on-outline"></i> Logs</Link> : <Link to={"#"} className="nav-item nav-link " role="tab" data-toggle="tab" data-val="5" onClick={(e) => handleClick(e)}><i class="mdi mdi-lightbulb-on-outline"></i> Logs</Link>}
                                                {tabs === 6 ? <Link to={"#"} className="nav-item nav-link active" role="tab" data-toggle="tab" data-val="6" onClick={(e) => handleClick(e)}><i class="mdi mdi-timer-sand-empty"></i> Timeline</Link> : <Link to={"#"} className="nav-item nav-link " role="tab" data-toggle="tab" data-val="6" onClick={(e) => handleClick(e)}><i class="mdi mdi-timer-sand-empty"></i> Timeline</Link>}
                                                {tabs === 7 ? <Link to={"#"} className="nav-item nav-link active" role="tab" data-toggle="tab" data-val="7" onClick={(e) => handleClick(e)}><i class="mdi mdi-laptop-chromebook"></i> Education</Link> : <Link to={"#"} className="nav-item nav-link " role="tab" data-toggle="tab" data-val="7" onClick={(e) => handleClick(e)}><i class="mdi mdi-laptop-chromebook"></i> Education</Link>}
                                                {tabs === 8 ? <Link to={"#"} className="nav-item nav-link active" role="tab" data-toggle="tab" data-val="8" onClick={(e) => handleClick(e)}><i class="mdi mdi-replay"></i> References </Link> : <Link to={"#"} className="nav-item nav-link" role="tab" data-toggle="tab" data-val="8" onClick={(e) => handleClick(e)}><i class="mdi mdi-replay"></i> References </Link>}

                                            </nav>
                                        </div>
                                        <div className="tab-content p-3" id="myTabContent">
                                            {tabs === 1 && <div className="tab-pane active" id="tab1">
                                                <div className="overview">
                                                    {<article>
                                                        <h2>Employment Details</h2>
                                                        <div className="min-hight">
                                                            {
                                                                Overview[2] !== undefined ? Overview[2].fieldDetails.map((item) => <p key={item.name}>{item.name}<br />{item.value}</p>) : <p>No records found</p>
                                                            }
                                                        </div>
                                                    </article>}
                                                    {<article>
                                                        <h2>References </h2>
                                                        <div className="min-hight">
                                                            {
                                                                Overview[1] !== undefined ? Overview[1].fieldDetails.map((item) => <p key={item.name}>{item.name}<br />{item.value}</p>) : <p>No records found</p>
                                                            }
                                                        </div>
                                                    </article>}
                                                    <article>
                                                        <h2>Education </h2>
                                                        <div className="min-hight">
                                                            {Overview[0] !== undefined ? <p>{Overview[0].fieldDetails[0].value}<br />{Overview[0].fieldDetails[1].value}<br />{Overview[0].fieldDetails[2].value}</p> : <p>No records found</p>}
                                                        </div>
                                                    </article>
                                                    <article>
                                                        <h2>Emails</h2>
                                                        <div className="min-hight">
                                                            {Maillist !== undefined && Maillist.length > 0 ?
                                                                <>
                                                                    {
                                                                        Maillist.map((item, index) => <p key={index}>{item.subject}</p>)
                                                                    }
                                                                </> : <p>No records found</p>}
                                                        </div>
                                                    </article>
                                                    <article>
                                                        <h2>Documents</h2>
                                                        <div className="min-hight">
                                                            {Documentlist !== undefined && Documentlist.length > 0 ?
                                                                <ul>
                                                                    {
                                                                        Documentlist.map((item, index) => <li key={index}><Link to={{ pathname: item.value }} target="_blank">{item.name}</Link></li>)
                                                                    }
                                                                </ul> : <p>No records found</p>}
                                                        </div>
                                                    </article>
                                                </div>
                                            </div>
                                            }
                                            {tabs === 2 && <div className="tab-pane" id="tab2">
                                                <div class="page-content page-container" id="page-content">
                                                    <div class="padding">
                                                        <div class="row container d-flex justify-content-center">
                                                            <div class="col-md-12">
                                                                <div class="container">
                                                                    <div class="ks-page-content">
                                                                        <div class="ks-page-content-body">
                                                                            <div class="ks-messenger">

                                                                                <div class="ks-messages ks-messenger__messages">

                                                                                    {Chats !== undefined && CurrentChats !== undefined && <div class="ks-body ks-scrollable jspScrollable" data-auto-height="" data-reduce-height=".ks-footer" data-fix-height="32" style={{ height: '480px', overflowY: 'scroll', padding: '0px', width: '100%' }} tabindex="0">
                                                                                        <div class="jspContainer" s>
                                                                                            <div class="jspPane">
                                                                                                {Chats !== undefined && CurrentChats !== undefined && <ul class="ks-items">
                                                                                                    {
                                                                                                        Chats.map((item, index) => <li key={`${item.gid}${index}`} className="ks-item ks-self">
                                                                                                            <span class="ks-avatar ks-offline">

                                                                                                                {item.photoURL !== null ? <img src={item.photoURL} width="36" height="36" class="rounded-circle" /> : <p><GetInitial val={item.createdBy} /></p>}
                                                                                                            </span>
                                                                                                            <div class="ks-body">
                                                                                                                <div class="ks-header">
                                                                                                                    <span class="ks-name">{item.createdBy}</span>
                                                                                                                    <span class="ks-datetime">{moment(item.createdOn).format("Do MMMM YYYY")} {moment(item.createdOn).format("h:mm a")}</span>
                                                                                                                </div>
                                                                                                                <div class="ks-message">{item.chatDetails}</div>
                                                                                                            </div>
                                                                                                        </li>)
                                                                                                    }

                                                                                                    {CurrentChats !== undefined && CurrentChats.length > 0 && <li class="ks-separator">Today</li>}
                                                                                                    {
                                                                                                        CurrentChats.map((item, index) => <li key={`${item.gid}${index}`} className="ks-item ks-self">
                                                                                                            <span class="ks-avatar ks-offline">

                                                                                                                {item.photoURL !== null ? <img src={item.photoURL} width="36" height="36" class="rounded-circle" /> : <p><GetInitial val={item.createdBy} /></p>}
                                                                                                            </span>
                                                                                                            <div class="ks-body">
                                                                                                                <div class="ks-header">
                                                                                                                    <span class="ks-name">{item.createdBy}</span>
                                                                                                                    <span class="ks-datetime">{moment(item.createdOn).format("Do MMMM YYYY")} {moment(item.createdOn).format("h:mm a")}</span>
                                                                                                                </div>
                                                                                                                <div class="ks-message">{item.chatDetails}</div>
                                                                                                            </div>
                                                                                                        </li>)
                                                                                                    }

                                                                                                </ul>}
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>}
                                                                                    <div className='chat-enter'>
                                                                                    <div class="ks-footer">
                                                                                        <div class="like">
                                                                                            <ul class="send-icon">

                                                                                                <li><button onClick={() => SubmitChat()}><i class="mdi mdi-send"></i></button></li>
                                                                                            </ul>

                                                                                        </div><div class="clr"></div>
                                                                                    </div>
                                                                                    
                                                                                    <div class="com">
                                                                                    <div className='chat_share'>
                                                                                        <ul>
                                                                                           <li><i class="mdi mdi-thumb-up-outline"></i> Like</li>
                                                                                           <li><i class="mdi mdi-comment-text-outline"></i> Comment</li>
                                                                                           <li><i class="mdi mdi-redo-variant"></i> Share</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                    <div className='chat_icon'>
                                                                                        <ul>
                                                                                            <li className='zoom'><img src={attachment} alt="" /></li>
                                                                                            <li className='zoom'><img src={smile} alt="" /></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                    
                                                                                    
                                                                                    <textarea class="form-control" value={ChatText} placeholder="Type something..." onChange={(e) => ChangeChatText(e)}></textarea>{ChatMsg !== '' && <label>{ChatMsg}</label>}</div>
                                                                                    </div>                                                 

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>








                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                            {tabs === 3 && <div className="tab-pane" id="tab3">
                                                gggg
                                            </div>
                                            }
                                            {tabs === 4 && <div className="tab-pane" id="tab4">
                                                <div className="container1">
                                                    <div className="yyt content-wrapper">
                                                        {Maillist !== undefined && Maillist.length > 0 ? <div className="email-wrapper wrapper">
                                                            <div className="row align-items-stretch">
                                                                {Maillist !== undefined && Maillist.length > 0 && <div className="mail-list-container col-md-3 border-right bg-white">

                                                                    {Maillist.map((item) =>

                                                                        item.gid === Gid ? <div className="mail-list new_mail">
                                                                            <div className="content">

                                                                                <p className="message_text"><Link to={"#"} onClick={() => Changeemail(item.gid)}>{item.subject}</Link><span><i class="mdi mdi-account"></i> {MailTo}</span><b>{moment(MailSentDate).format("Do MMMM YYYY")}</b></p>
                                                                            </div>
                                                                            <div className="details">
                                                                           
                                                                                <i className="mdi mdi-star-outline"></i>
                                                                            </div>
                                                                        </div> : <div className="mail-list">
                                                                            <div className="content">

                                                                                <p className="message_text"><Link to={"#"} onClick={() => Changeemail(item.gid)}>{item.subject}</Link></p>
                                                                            </div>
                                                                            <div className="details">
                                                                                <i className="mdi mdi-star-outline"></i>
                                                                            </div>
                                                                        </div>)}

                                                                </div>}
                                                                <div className="mail-view d-none d-md-block col-md-9 col-lg-9 bg-white">
                                                                    <div className="message-body">
                                                                        <div className="sender-details">
                                                                            {/* <img className="img-sm rounded-circle mr-3" src="http://www.urbanui.com/dashflat/template/images/faces/face11.jpg" alt="" /> */}
                                                                            <div className="details">
                                                                                <p className="msg-subject">
                                                                                    {MailSubject} ({moment(MailSentDate).format("Do MMMM YYYY")})
                                                                                </p>
                                                                                <p className="sender-email">
                                                                                    {MailFromName}{" "}
                                                                                    <Link to={"#"}>{MailTo}</Link>
                                                                                    &nbsp;<i className="mdi mdi-account-multiple-plus"></i>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="message-content">
                                                                            {parse(MailBody)}
                                                                        </div>
                                                                        {IsSendMailAllowed && <div class="attachments-sections">
                                                                            <aside>
                                                                                <input type="text" maxLength="150" value={Mailsendsubject} onChange={(e) => ChangeSubject(e)} />
                                                                                {MailsendsubjectMsg !== '' && <FormHelperText>{MailsendsubjectMsg}</FormHelperText>}
                                                                                <textarea id="w3review" name="w3review" rows="4" cols="50" value={Mailcontent} onChange={(e) => ChangeMailbody(e)}></textarea>
                                                                                {MailcontentMsg !== '' && <FormHelperText>{MailcontentMsg}</FormHelperText>}
                                                                                <input type="button" value="Send" onClick={() => SubmitMail()} />
                                                                            </aside>
                                                                        </div>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> :
                                                            <div class="attachments-sections">
                                                                {IsSendMailAllowed && <aside>
                                                                    <input type="text" maxLength="150" value={Mailsendsubject} onChange={(e) => ChangeSubject(e)} />
                                                                    {MailsendsubjectMsg !== '' && <FormHelperText>{MailsendsubjectMsg}</FormHelperText>}
                                                                    <textarea id="w3review" name="w3review" rows="4" cols="50" value={Mailcontent} onChange={(e) => ChangeMailbody(e)}></textarea>
                                                                    {MailcontentMsg !== '' && <FormHelperText>{MailcontentMsg}</FormHelperText>}
                                                                    <input type="button" value="Send" onClick={() => SubmitMail()} />
                                                                </aside>}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                            {tabs === 5 && <div className="tab-pane" id="tab5">

                                                {<ul>
                                                    {
                                                        Logs !== undefined && Logs.length > 0 ? Logs.map((item) => <li key={item.taskId}><aside>{moment(item.date).format("Do MMMM YYYY")}</aside> <span>{item.text} by {item.userName}</span></li>) : <li>No records found</li>
                                                    }

                                                </ul>}
                                            </div>
                                            }
                                            {tabs === 6 && <div className="tab-pane" id="tab6">

                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="hori-timeline" dir="ltr">
                                                            <GenerateTimeLine timelines={Timeline} />
                                                        </div>
                                                    </div>
                                                </div>




                                            </div>
                                            }
                                            {tabs === 7 && <div className="tab-pane" id="tab7">
                                                {Overview[0] !== undefined && Overview[0].fieldDetails !== undefined ? <ul>
                                                    {
                                                        // Overview[0].fieldDetails.map((item,index) => <li key={index}>{item.name}: {item.value}</li>)
                                                        Overview[0].fieldDetails.map((item, index) => <li key={index}>{item.type === 'url' ? <>{item.name}:<Link to={{ pathname: item.value }} target="_blank">{item.value}</Link></> : <>{item.name}: {item.value}</>} </li>)
                                                    }

                                                </ul> : <ul><li>No records found</li></ul>}
                                            </div>
                                            }
                                            {tabs === 8 && <div className="tab-pane" id="tab8">
                                                {Overview[1] !== undefined && Overview[1].fieldDetails !== undefined ? <>
                                                    {
                                                        Overview[1].fieldDetails.map((item) => <article key={item.name}><h4>{item.name}</h4><p>Value: {item.value}</p></article>)

                                                    }

                                                </> : <>No records found</>}
                                            </div>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <Footer />

            </div>

        </>
    );
}

export default Userdetails;