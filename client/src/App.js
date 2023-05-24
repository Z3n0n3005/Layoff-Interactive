import './App.css';
import NavBar from "./pages/NavBar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import {Login} from "./pages/Login";
import {Edit} from "./pages/updateData";
import {Page1} from "./pages/Page1";
import {Page2} from "./pages/Page2";
import {Page3} from "./pages/Page3";
import {Feedback} from "./pages/feedback";
import {End} from "./pages/theEnd";

function App() {

  return(
    <>
        <Router>
            <NavBar/>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/edit" element={<Edit/>}></Route>
                <Route path="/page-1" element={<Page1/>}></Route>
                <Route path="/page-2" element={<Page2/>}></Route>
                <Route path="/page-3" element={<Page3/>}></Route>
                <Route path="/fb" element={<Feedback/>}></Route>
                <Route path="/end" element={<End/>}></Route>
            </Routes>
        </Router>    </>
  )
}

export default App;