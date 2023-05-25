import "./styles.css";
import {useNavigate} from "react-router-dom";
import LineChart from "../lineChart";
export const Page2 = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="Page">
                <div className="HomePage">
                    <h3><center>The chart represents the change of layoff data in tech industry for the period
                        from Q1 2021 to Q4 2022</center></h3>
                    <p><i><center>You can zoom in data.</center></i></p>
                    <p><i><center>Double click to return the default chart</center></i></p>

                </div>
                <hr/>
                <center>
                    <LineChart/>
                    <h5>Next, we will show the top 20 companies with the highest number of layoff </h5>

                    <div className="outerButton">
                        <div className="innerButton">
                            <button className="leftButton" onClick={() => navigate("/page-1")}>Back to previous page</button>
                            <button className="rightButton" onClick={() => {
                                navigate("/page-3")
                            }}>Next Page</button>
                        </div>
                    </div>
                </center>
            </div>
        </>
    )
}