import {useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';

export const Feedback = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("")
    useEffect(() => {
        // if(/^[A-Za-z]+$/.test(name) &&  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))

    }, [name, email])
    return (
        <>
            <div className="Page">
                <div className="HomePage">
                    <center>
                        <h1>Thank you for taking the time to see our research. Your feedback is very much appreciated.</h1>
                        <p>If you have any questions or concerns, please email us:</p>
                        <ul>
                            <li><strong>Research Group</strong> (research@gmail.com)</li>
                        </ul>
                        <hr/>
                    </center>
                    <form action="">
                        <label htmlFor="name"><strong>YOUR NAME:</strong></label><br/>
                        <input type="text" id="name" name="name" onChange={e => setName(e.target.value)}/><br/>
                        <label htmlFor="email" onChange={e => setEmail(e.target.value)}><strong>EMAIL:</strong></label><br/>
                        <input type="email" id="email" name="email" onChange={e => setEmail(e.target.value)}/><br/>
                        <label htmlFor="fb"><strong>YOUR FEEDBACK:</strong></label>
                        <textarea className="textArea" name="type3" rows="4" cols="50" maxLength="2000"/>
                        <i><strong>Please note: </strong> your name should not include number and your email should be valid</i>
                        <div className="outerButton">
                            <div className="innerButton">
                                <button className="leftButton" onClick={() => navigate("/.")}>Back to home</button>
                                <button className="rightButton" onClick={() => {
                                    navigate("/end")
                                }}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}