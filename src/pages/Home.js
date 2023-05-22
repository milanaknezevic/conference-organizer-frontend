import { useNavigate } from "react-router-dom";
import "../App.css";
const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="FirstPage">
      <button type="button" onClick={handleLogin}>
        Prijavi se
      </button>
      <button type="button" onClick={handleSignup}>
        Registruj se
      </button>
    </div>
  );
};
export default Home;
