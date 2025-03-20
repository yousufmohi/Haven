import reactLogo from "../assets/react-logo.svg";
import { Link } from "react-router-dom";
import "../index.css"; // Import the CSS file

export default function () {
  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome to Haven</h1>
          <div className="button-container">
            <Link to="/sign-up" className="btn">Sign up</Link>
            <Link to="/sign-in" className="btn">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
