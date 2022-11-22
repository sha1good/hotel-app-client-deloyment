import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <span className="logo">Sha1booking</span>
        <div className="navbarItems">
          <button className="navbarButton">Register</button>
          <button className="navbarButton">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
