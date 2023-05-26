import {useNavigate} from "react-router-dom";
import "./styles.css";
import {useEffect, useState} from "react";

export const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [submit,setSubmit] = useState(false);
    const [admin, setAdmin] = useState()
    const checkValid = () => {
        for (let i = 0; i < admin.length; i++) {
            var d = admin[i]
            if(d["Username"] === name && d["Password"] === password){
                setSubmit(true)
                return
            }
        }
        setSubmit(false)
    };
    useEffect(() => {
        fetch("http://localhost:8080/api/adminData/")
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                throw res
            })
            .then(res => {
                console.log(res)
                setAdmin(res)
            })
            .catch(err => console.log(err))

    }, [])
    useEffect(() => {
        if(name !== "")
            checkValid()
    }, [name, password, admin])
    return (
        <>
            <div className="Page">
                <div className="HomePage">
                    <center>
                        <h1>Login form</h1>
                        <p>This login form is just valid for admin</p>
                        <hr/>
                    </center>
                    <form action="">
                        <label htmlFor="name"><strong>Your account:</strong></label><br/>
                        <input type="text" id="name" name="name" onChange={e => setName(e.target.value)}/><br/>
                        <label htmlFor="password"><strong>PASSWORD:</strong></label><br/>
                        <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)}/><br/>
                        <hr/>
                        <div className="outerButton">
                            <div className="innerButton">
                                <button className="leftButton" onClick={() => navigate("/.")}>Back to home</button>
                                <button className="rightButton" disabled={!submit} onClick={() => {
                                    navigate("/admin")
                                }}>Login</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}