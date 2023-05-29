import NavBar from "./layout/NavBar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useCookies} from "react-cookie";
import { useParams, useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";


import Home from "./layout/Home";
import {Login} from "./layout/Login";
import {Page1} from "./layout/Page1";
import {Page2} from "./layout/Page2";
import {Page3} from "./layout/Page3";
import {Feedback} from "./layout/feedback";
import {End} from "./layout/theEnd";
import {Error} from "./layout/error";


export const Vis = () => {

  let navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies()

  useEffect(() => {
    async function checkAdmin() {
      if(Object.keys(cookie).includes("admin")) {
        navigate("/admin")
      }

    }
    checkAdmin();
  }, []); 

  return(
    <>
        
            <NavBar/>
            <Routes>
                <Route path='/*' element={<Error/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/page-1" element={<Page1/>}></Route>
                <Route path="/page-2" element={<Page2/>}></Route>
                <Route path="/page-3" element={<Page3/>}></Route>
                <Route path="/feedback" element={<Feedback/>}></Route>
                <Route path="/end" element={<End/>}></Route>
            </Routes>
    </>
  )
}
