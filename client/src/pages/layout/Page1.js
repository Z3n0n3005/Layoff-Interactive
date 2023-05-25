import "./styles.css";
import BarChart from "../barChart";
import {useNavigate} from "react-router-dom";
export const Page1 = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="Page">
                <div className="HomePage">
                    <h3><center>The chart represents layoff data for each industry for the period
                    from Q1 2021 to Q4 2022</center></h3>
                    <p><i><center>Click button to change the period.</center></i></p>
                    <p>We hope you to focus on the tech layoff (red color)</p>
                </div>
                <hr/>
                <center>
                    <BarChart/>
                    <h5>Next, we will show how the data changes in tech industry for the same period</h5>

                    <div className="outerButton">
                        <div className="innerButton">
                            <button className="leftButton" onClick={() => navigate("/.")}>Back to home</button>
                            <button className="rightButton" onClick={() => {
                                navigate("/page-2")
                            }}>Next Page</button>
                        </div>
                    </div>
                </center>
            </div>
        </>
    )
}