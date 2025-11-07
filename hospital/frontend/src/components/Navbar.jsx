import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api";
import Logo from "../components/Logo";




const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    
   <nav className="navbar">
  <div className="brand">
    <Logo size={38} />
    <div className="brand-text-group">
      <h1 className="brand-title">
        Medi<span>Care</span><sup>+</sup>
      </h1>
      <p className="brand-subtitle">Hospital Management System</p>
    </div>
  </div>
      <div className="nav-links">
        {user ? (
          <>
            <span>
              {user.name} ({user.role})
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
