import React, { useEffect, useState } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import logo from '../../images/Logo(2).png';
import '../../Js/login-common';
import '../../Css/dashtheme.css';
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios';



function Dashtheme4() {
  useEffect(async() => {
    const data = {
      searchtext: "Bombay"
    }

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwbHV0b0B0ZXN0LmNvbSIsImV4cCI6MTY4NjMzMzExOCwiaWF0IjoxNjY4MzMzMTE4fQ.eP0DM0Y9QG0nOd4_BPys_Af5MVvcRuf79fJb_0AKz84'
      }
    }

    console.log(process.env.REACT_APP_API_DOMAIN_URL,'process.env.REACT_APP_API_POST_INSTITUTION_NAMES_LIST');

    await axios.post(process.env.REACT_APP_API_DOMAIN_URL + '/api/v1/taskmanagement/data/search/institution' , data, options).then((responce) => {
      console.log(responce, 'responceresponce');
    }).catch((error) => {
      console.log(error, 'eeee');
    })


  }, [])
  const countryOptions = [
    {
      value: 'sivaji',
      text: 'sivaji',
      image: {
        avatar: true,
        src: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
      }
    },
    {
      value: 'anil',
      text: 'anil',
      image: {
        avatar: true,
        src: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
      }
    },
    {
      value: 'kumar',
      text: 'kumar',
      image: {
        avatar: true,
        src: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
      }
    },

  ]

  return (
    <div className="bg">
      <>
        <section className="top_panel transition2">
          <div className="logo wow fadeInDown"><img src={logo} alt="" /> </div></section>
        <div className="q1">
          <section className="  themeq1">
            <div className=" ques1">
              <h1>Tell us your Institution name. </h1>
              {/* <ul className="signinForm">
                <li className="styled-input ">
                  <input type="" placeholder="write here" />
                </li>
              </ul> */}
              <Dropdown
                clearable
                fluid
                multiple
                search
                selection
                options={countryOptions}
                placeholder='Select Country'
              />




              <a href="/dashtheme1"><label class="yesBtn"><span>next</span>
                <input type="button" class="submit_btn" /></label>
              </a>
            </div>
          </section>
        </div>


      </>
    </div>
  )
}

export default Dashtheme4;