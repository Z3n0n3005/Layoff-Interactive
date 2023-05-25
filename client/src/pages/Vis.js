import NavBar from "./layout/NavBar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./layout/Home";
import {Login} from "./layout/Login";
import {Page1} from "./layout/Page1";
import {Page2} from "./layout/Page2";
import {Page3} from "./layout/Page3";
import {Feedback} from "./layout/feedback";
import {End} from "./layout/theEnd";


export const Vis = () => {

  return(
    <>
        
            <NavBar/>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
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
