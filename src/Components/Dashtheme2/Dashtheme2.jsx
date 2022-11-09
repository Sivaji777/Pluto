import React, { useEffect, useState } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import logo from '../../images/Logo(2).png';
import '../../Js/login-common';
import '../../Css/dashtheme.css'; 

function Dashtheme2() {
  return (
    <div className="bg">
        <>
            <section className="top_panel transition2">
                        <div className="logo wow fadeInDown"><img src={logo} alt="" /> </div></section>
                   
                    <div className="q1">
                        <section className="  themeq1">
                         
                               
                                    <div className=" ques1">
                                         <h1>Enter your Email for OTP </h1>
                                          <ul className="signinForm">
                                             <li className="styled-input ">
                                                <input type="text" placeholder="name@gmail.com" />
                                             </li>
                                           </ul>

                                            <a href="/dashtheme1"><label class="yesBtn"><span>Next</span>
                                            <input type="button" class="submit_btn"  /></label>
                                         </a>
                               
   
                                        
                                    </div>



                                    

                            
                           
                        </section>
                    </div>

               
        </> 
    </div>
  )
}

export default Dashtheme2;
