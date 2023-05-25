import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Admin} from "./pages/Admin";
import {Vis} from "./pages/Vis";


function App() {

  return(
    <>
        <Router>
            <Routes>
                <Route path="/admin/*" element={<Admin/>}></Route>
                <Route path="/*" element={<Vis/>}></Route>
            </Routes>
        </Router>
    </>
  )
}

export default App;