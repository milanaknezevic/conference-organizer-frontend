/*import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Admin from "./pages/Admin/Admin";
import Organizator from "./pages/Organizator/Organizator";
import UserDetails from "./pages/UserDetails/UserDetails";
import UrediKonferenciju from "./pages/Organizator/UrediKonferenciju/UrediKonferenciju";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="admin" element={<Admin />} />
            <Route path="urediKonferenciju" element={<UrediKonferenciju />} />
            <Route path="organizator" element={<Organizator />} />
            <Route path="user_details" element={<UserDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
