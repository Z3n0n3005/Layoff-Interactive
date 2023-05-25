import "./styles.css";
import {useNavigate} from "react-router-dom";
export const End = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="Page">
                <div className="HomePage">
                    <center>
                        <h1>Thank you!</h1>
                        <p>We appreciate your time so far!</p>
                        <div className="outerButton">
                            <div className="outerButton">
                                <div className="innerButton">
                                    <button className="rightButton" onClick={closeTab}>Close the page</button>
                                    <button className="leftButton" onClick={() => navigate("/.")}>Return to home</button>
                                </div>
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        </>
    )
}
const closeTab = () => {
    window.open("about:blank", "_self");
    window.close();
};