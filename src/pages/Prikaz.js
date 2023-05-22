import { useNavigate } from "react-router-dom";

const Prikaz = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Svaka čast</h1>
      <button onClick={handleLogout}>Odjavi se</button>
    </div>
  );
};

export default Prikaz;
