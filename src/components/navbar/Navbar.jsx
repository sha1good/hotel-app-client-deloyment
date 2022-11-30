import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Sha1booking</span>
        </Link>
        {user ? (
          <div className="navbarItems">
             { user.username }
            <button onClick={handleLogout} className="navbarButton">
              Logout
            </button>
          </div>
        ) : (
          <div className="navbarItems">
            <button className="navbarButton">Register</button>
            <Link to="/login"> <button className="navbarButton">Login</button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
