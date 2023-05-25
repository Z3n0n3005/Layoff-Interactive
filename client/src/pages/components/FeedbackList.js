import React, { useState, useEffect } from "react";
import FeedbackDataService from "../services/FeedbackService";

const FeedbacksList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveFeedbacks();
  }, []);


  const retrieveFeedbacks = () => {
    FeedbackDataService.getAll()
      .then(response => {
        setFeedbacks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveFeedbacks();
    setCurrentFeedback(null);
    setCurrentIndex(-1);
  };

  const setActiveFeedback = (Feedback, index) => {
    console.log(Feedback);
    setCurrentFeedback(Feedback);
    setCurrentIndex(index);
  };


  return (
    <div className="list row">
      
      <div className="col-md-6">
        <h4>Feedbacks</h4>
        
        <ul className="list-group">
          {feedbacks &&
            feedbacks.map((feedback, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveFeedback(feedback, index)}
                key={index}
              >
                {feedback.Email}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentFeedback ? (
          <div>
            <h4>Detail</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentFeedback.id}
            </div>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentFeedback.Name}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentFeedback.Email}
            </div>
            <div>
              <label>
                <strong>Content:</strong>
              </label>{" "}
              {currentFeedback.Content}
            </div>

          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a row for more detail...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbacksList;
