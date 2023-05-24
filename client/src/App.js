import './App.css';
import NavBar from "./pages/NavBar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import {Login} from "./pages/Login";
import {Edit} from "./pages/updateData";

function App() {

  return(
    <>
        <Router>
            <NavBar/>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/edit" element={<Edit/>}></Route>
                {/*<Route path="/contact" element={<Contact/>}></Route>*/}
                {/*<Route path="*" element={<Error/>}></Route>*/}
                {/*<Route path="/end" element={<End/>}></Route>*/}
            </Routes>
        </Router>    </>
  )
}

export default App;