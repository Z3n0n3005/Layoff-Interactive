import "./styles.css";
import {useNavigate} from "react-router-dom";
import StackedBarChart from "../stackedBarChart";
export const Page3 = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="Page">
                <div className="HomePage">
                    <h3><center>The chart shows the layoff data of top 20 company in US for each year</center></h3>
                    <p><i><center>You can select the check box.</center></i></p>
                </div>
                <hr/>
                <center>
                    <StackedBarChart/>
                    <h5>Next, we would appreciate your feedback.</h5>

                    <div className="outerButton">
                        <div className="innerButton">
                            <button className="leftButton" onClick={() => navigate("/page-2")}>Back to previous page</button>
                            <button className="rightButton" onClick={() => {
                                navigate("/fb")
                            }}>Next Page</button>
                        </div>
                    </div>
                </center>
            </div>
        </>
    )
}