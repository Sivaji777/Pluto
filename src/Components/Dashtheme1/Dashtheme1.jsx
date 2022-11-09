import React, { useEffect, useState } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import logo from '../../images/Logo(2).png';
import '../../Js/login-common';
import '../../Css/dashtheme.css'; 

function Dashtheme1() {
  return (
    <div className="bg">
        <>
            <section className="top_panel transition2">
                        <div className="logo wow fadeInDown"><img src={logo} alt="" /> </div></section>
                   
                    <div className="q1">
                        <section className="  themeq1">
                         
                               
                                    <div className=" ques1">
                                         <h1>What best describe your current role?</h1>
                                         <div className='role'>
                                          <a href="/dashtheme1"><label class="ryesBtn1"><span> Faculty</span>
                                            <input type="button" class="submit_btn"  /></label>
                                         </a>
                                         <a href="/dashtheme1"><label class="ryesBtn"><span>Student</span>
                                            <input type="button" class="submit_btn"  /></label>
                                         </a>
                                         <a href="/dashtheme1"><label class="ryesBtn"><span>Admin</span>
                                            <input type="button" class="submit_btn"  /></label>
                                         </a>
                                         <a href="/dashtheme1"><label class="ryesBtn"><span>Others</span>
                                            <input type="button" class="submit_btn"  /></label>
                                         </a>

                                         </div>

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

export default Dashtheme1;
