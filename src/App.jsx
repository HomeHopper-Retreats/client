import "./App.css";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import PlaceDetailsPage from "./pages/PlaceDetailsPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <>
      <ChakraProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/places/:placeId" element={<PlaceDetailsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
