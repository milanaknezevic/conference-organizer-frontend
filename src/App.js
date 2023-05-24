/*import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Prikaz from "./pages/Prikaz";
import Admin from "./pages/Admin";
import initializeI18N from "./i8n/init";
import { Provider } from "react-redux";
import { store } from "./pages/store";
import store2 from "./redux/store2";

initializeI18N();

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="admin" element={<Admin />} /> {/* Promijenjeno */}
            <Route path="pocetnaStranica" element={<Prikaz />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
