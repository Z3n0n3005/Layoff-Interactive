import {useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import FeedbackDataService from "../services/FeedbackService";


export const Feedback = () => {
    const initialFeedbackState = {
        id: null,
        Name: "",
        Email: "",
        Content: "",
      };
      const [feedback, setFeedback] = useState(initialFeedbackState);
    
      const handleInputChange = event => {
        const { name, value } = event.target;
        setFeedback({ ...feedback, [name]: value });
      };
    
      const saveFeedback = () => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(feedback.Email)) {
          alert("You have entered an invalid email address!");
        } else {
          var data = {
            Name: feedback.Name,
            Email: feedback.Email,
            Content: feedback.Content
          };
      
          FeedbackDataService.create(data)
            .then(response => {
              setFeedback({
                id: response.data.id,
                Name: response.data.Name,
                Email: response.data.Email,
                Content: response.data.Content
              });
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
          navigate("/end");

        }
      };

    const navigate = useNavigate();
    
    return (
        <>
            <div className="Page">
                <div className="HomePage">
                    <center>
                        <h2>Thank you for taking the time to see our research. Your feedback is very much appreciated.</h2>
                        <p>If you have any questions or concerns, please email us:</p>
                        <ul>
                            <li><strong>Research Group</strong> (research@gmail.com)</li>
                        </ul>
                        <hr/>
                    </center>
                    <div>
                        <label htmlFor="name"><strong>YOUR NAME:</strong></label><br/>
                        <input type="text" id="name" name="Name" onChange={handleInputChange}/><br/>
                        <label htmlFor="email"><strong>EMAIL:</strong></label><br/>
                        <input type="email" id="email" name="Email" onChange={handleInputChange}/><br/>
                        <label htmlFor="Content"><strong>YOUR FEEDBACK:</strong></label>
                        <textarea id="Content" name="Content" rows="4" cols="55" maxLength="2000" onChange={handleInputChange}/>
                        <i><strong>Please note: </strong> your name should not include number and your email should be valid</i>
                        <div className="outerButton">
                            <div className="innerButton">
                                <button className="leftButton" onClick={() => navigate("/.")}>Back to home</button>
                                <button className="rightButton" onClick={saveFeedback}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}