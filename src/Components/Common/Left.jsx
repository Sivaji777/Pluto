import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
// import logomini from '../../images/logo-mini.png';
import logomini from '../../images/logomini2.png';
import logo from '../../images/logo-2.png';
//import Menu from '../../Jsonfiles/Menu.json'
import '../../Css/left.css'
import admission from '../../images/home-icon.png'
import { BiMessageSquareDetail } from 'react-icons/bi';
import { MdNotificationsNone } from 'react-icons/md';

import { FaBeer } from 'react-icons/fa';

function Left(props) {
    const _show = props.isShow;
    var UserNameSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        slide: "ul",
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 11,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 410,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                },
            },

        ],
    };




    const [Menu, setMenu] = useState([]);
    const [userList, setuserList] = useState([]);
    useEffect(() => {
        const data = {}
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_USER_URL, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        )

            .then(res => {

                setMenu(res.data)

            })
            .catch(err => {
                console.log(err);
            })
        getInitial();
    }, [])

    const getInitial = () => {
        const data = {}
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_USER_LIST_URL, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        )

            .then(res => {
                // console.log(res.data)
                setuserList(res.data)

            })
            .catch(err => {
                console.log(err);
            })
    }



    return (
        <div className="left-part-new">
            <div className={_show}>
                <div className={"sidebar"}>
                    <nav className="sidebar-offcanvas" id="sidebar">
                        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
                            <Link className="sidebar-brand brand-logo" to={"/dashboard"}><img src={logo} alt="logo" /></Link>
                            <a className="sidebar-brand brand-logo-mini pt-3" href="index.html">
                                <img src={logomini} alt="logo" /></a>
                        </div>
                         <hr className="left-hr" />
                        <ul className="nav">
                            {/* <li className="nav-item">
                                <Link className="nav-link" to={"/dashboard"}>
                                    <i className="mdi mdi-home menu-icon"></i>
                                    <span className="menu-title">Dashboard</span>
                                </Link>
                            </li> */}
                            <li className="nav-item">
                                
                                    <div className="nav-link">

                                    <i className="mdi mdi-home menu-icon"></i>
                                    <span className="menu-title">Home  </span> <i className="mdi mdi-chevron-right menu-icon-r"></i>
                                </div>
                               
                            </li>

                            <li className="nav-item">
                                <div className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                                    {/* <i className="mdi mdi-crosshairs-gps menu-icon"></i> */}
                                    {/* <div className="home-icon"></div> */}
                                    {/* <img src={admission} /> */}
                                    {/* <i className="menu-arrow"></i> */}
                                    {/* <div className='admission-icon-div' >
                                        <div className='admission-icon' >
                                        </div>
                                    </div> */}
                                    <i className="mdi mdi-chart-timeline-variant menu-icon"></i>
                                    <div>
                                        {/* <FaBeer /> */}
                                    </div>
                                    <span className="menu-title">Admission Status <i className="mdi mdi-chevron-right menu-icon-r"></i></span>
                                </div>
                                <div className="collapse" id="ui-basic">
                                    <ul className="nav flex-column sub-menu">
                                        <li className="nav-item">
                                            <a className="nav-link" href="pages/ui-features/buttons.html">Buttons</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="pages/ui-features/dropdowns.html">Dropdowns</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="pages/ui-features/typography.html">Typography</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link">
                                    {/* <i className="mdi mdi-format-list-bulleted menu-icon"></i> */}
                                    <i className="mdi mdi-bell menu-icon"></i>
                                    {/* <MdNotificationsNone  size="25" /> */}
                                    <span className="menu-title"> Notification <i className="mdi mdi-chevron-right menu-icon-r"></i></span>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link">
                                    {/* <i className="mdi mdi-format-list-bulleted menu-icon"></i> */}
                                    <i className="mdi mdi-message-text-outline menu-icon"></i>
                                    {/* <BiMessageSquareDetail size="19" /> */}
                                    <span className="menu-title">Messages <i className="mdi mdi-chevron-right menu-icon-r"></i> </span>
                                </div>
                            </li>


                            <div className='favtop'>
                             <li className="nav-item">
                                <div className="nav-link">
                                    {/* <i className="mdi mdi-format-list-bulleted menu-icon"></i> */}
                                    <i className="mdi mdi-star-outline menu-icon"></i>
                                    {/* <MdNotificationsNone  size="25" /> */}
                                    <span className="menu-title"> Favourites <i className="mdi mdi-chevron-right menu-icon-r"></i></span>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link">
                                    {/* <i className="mdi mdi-format-list-bulleted menu-icon"></i> */}
                                    <i className="mdi mdi-book-outline menu-icon"></i>
                                    {/* <BiMessageSquareDetail size="19" /> */}
                                    <span className="menu-title">Courses <i className="mdi mdi-chevron-right menu-icon-r"></i> </span>
                                </div>
                            </li>

                            </div>
                            {/* <li className="only-mobile nav-item">
                        <div className="nav-link">
                            <i className="mdi mdi-crosshairs-gps menu-icon"></i>
                            <span className="menu-title">Logout</span>
                        </div>
                    </li> */}



                    <div className='favtop2'>
                             <li className="nav-item">
                                <div className="nav-link">
                                    {/* <i className="mdi mdi-format-list-bulleted menu-icon"></i> */}
                                    <i className="mdi mdi-star-outline menu-icon"></i>
                                    {/* <MdNotificationsNone  size="25" /> */}
                                    <span className="menu-title"> Social Feed <i className="mdi mdi-chevron-right menu-icon-r"></i></span>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link">
                                    {/* <i className="mdi mdi-format-list-bulleted menu-icon"></i> */}
                                    <i className="mdi mdi-information-variant menu-icon"></i>
                                    {/* <BiMessageSquareDetail size="19" /> */}
                                    <span className="menu-title">Terms & Condition <i className="mdi mdi-chevron-right menu-icon-r"></i> </span>
                                </div>
                            </li>

                            </div>
                        </ul>
                    </nav>

                    <div className="workflow">
                        <div className='shat-name'>





                            {userList !== undefined && <ul>
                                <Slider {...UserNameSettings}>
                                    {
                                        userList.map((item, index) => <li key={index} className={"user-circle-color" + index} title={item.fristName + " " + item.lastName} >
                                            {item.photoURL != undefined && item.photoURL.length > 0 ?
                                                <>
                                                    {
                                                        <img className="nav-profile-img mr-2" alt="" src={item.photoURL} />
                                                    }
                                                </>
                                                :
                                                <>
                                                    {item.fristName[0]}{item.lastName[0]}
                                                </>
                                            }
                                        </li>)
                                    }
                                </Slider>
                            </ul>

                            }

                        </div>

                        {/* <div className="scrollbar list-workflow">
                            {Menu.length > 0 &&
                                <ul>
                                    {
                                        Menu.map((item) => <li className='mdi mdi-check-circle-outline' key={item.gid}><NavLink to={`/listing/${item.gid}`}>{item.name}</NavLink></li>)
                                    }

                                </ul>
                            }

                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Left;