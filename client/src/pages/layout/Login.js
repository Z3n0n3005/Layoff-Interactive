import {useNavigate} from "react-router-dom";
import "./styles.css";
import {useEffect, useState} from "react";

export const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [submit,setSubmit] = useState(false);
    const checkValid = (response) => {
        if(name !== "" && password !== "") setSubmit(true)
        for (let r of response) {
            if(r["username"] === name && r["password"] === password){
                setSubmit(true)
                return
            }
        }
        setSubmit(false)
    };
    useEffect(() => {
        fetch("http://localhost:8080/api/adminData/")
            .then(r => {
                r.json()
            })
            .then(r => {
                checkValid(r)
            })

    }, [name, password])
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