import {useNavigate} from "react-router-dom";
import "./styles.css";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="Page">
            <div className="HomePage">
                <h2><center>Thank you for your interest</center></h2>
                <p><i><center>Please read the information below.</center></i></p>
                <p><center>Once you have read and understood the information, if you interest in the
                    research, click on the "<strong>I'm interested</strong>" button to begin the research</center></p>
                <div className="Text">
                    <h4>Why are we asking you to take part?</h4>
                    <p>We have invited you to read this research because you may interest in the economic trends in US. We want to hear
                        from more and more people all over the world whose people have known the information.</p>
                    <h4>What would I need to do?</h4>
                    <p>This is voluntary. If you choose not to continue, this will not any problems. If you do decide to take
                        part, we hope to receive some feedbacks about your idea and about
                        your share (or who you think will
                        interest in, if you have just seen this topic).
                        We want to hear from you, even if you think you might not
                        like our research very much!</p>
                    <p>The feedback can include about the real data you have known
                        at home, how we should improve our research (Visualization, User Interface, and so on) and whether other people join them in these
                        activities. We hope to receive your views on recent layoff trends in US, particularly in tech layoffs.
                    </p>
                    <h4>How will we use the information?</h4>
                    <p>This research will help to improve the design of data visualization, so that they are better able to meet the
                        questions of most people. We will
                        share our findings with all people over the world in academic
                        publications.</p>
                    <h4>What if I change my mind?</h4>
                    <p>While you are reading the research, you can stop at any time by
                        clicking the button which says Cancel.</p>
                    <h4>Who do I contact to ask questions, or if I want to complain?</h4>
                    <p>If you have any questions or concerns about the study, before or
                        after taking part, please email the lead researchers: Research Group
                        (<strong>research@gmail.com</strong>).</p>
                </div>
                <div className="outerButton">
                    <div className="innerButton">
                        <button className="leftButton" onClick={closeTab}>Cancel</button>
                        <button className="rightButton" onClick={() => navigate("/page-1")}>I have read and I'm interested with it</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const closeTab = () => {
    window.open("about:blank", "_self");
    window.close();
};
export default Home;