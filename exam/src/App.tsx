import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import NavMenu from "./shared/NavMenu";
import HomePage from "./home/HomePage";
import ItemListPage from "./items/ItemListPage";
import ItemCreatePage from "./items/ItemCreatePage";
import ItemUpdatePage from "./items/ItemUpdatePage";
import AboutPage from "./about/AboutPage";
import Login from "./account/Login";
import Register from "./account/Register";
import Footer from "./shared/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          minHeight: "100vh",
          background: "#f1fff6",
        }}
      >
        {/* This should wrap the whole application */}
        <NavMenu />
        <div style={{ flex: "1 1 0%" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<ItemListPage />} />
            <Route path="/itemcreate" element={<ItemCreatePage />} />
            <Route path="/itemupdate/:itemId" element={<ItemUpdatePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />{" "}
            {/* Added Login Route */}
            <Route path="/register" element={<Register />} />{" "}
            {/* Added Register Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
