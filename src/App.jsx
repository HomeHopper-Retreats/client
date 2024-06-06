import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import PlaceDetailsPage from "./pages/PlaceDetailsPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import MyReservations from "./pages/MyReservation";
import { ChakraProvider } from "@chakra-ui/react";
import IsPrivate from "./components/IsPrivate";
import IsAdmin from "./components/IsAdmin";
import Footer from "./components/Footer";
import AboutUsPage from "./pages/AboutUs";

function App() {
  return (
    <>
      <ChakraProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/places/:placeId" element={<PlaceDetailsPage />} />
          <Route path="/admin" element={<IsAdmin><AdminPage /></IsAdmin>} />
          <Route path="/reservations" element={<IsPrivate><MyReservations /></IsPrivate>} />
        </Routes>
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default App;
