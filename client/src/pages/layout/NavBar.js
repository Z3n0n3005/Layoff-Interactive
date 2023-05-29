import "./styles.css";
import {useNavigate} from "react-router-dom";
const NavBar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="Nav">
                <div className="titleNav">Layoff Trends in United States</div>
                <div className="subTitleNav" onClick={() => navigate("/login")}>Login as admin</div>
            </div>
        </>
    )
}
export default NavBar