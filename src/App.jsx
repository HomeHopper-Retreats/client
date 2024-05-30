import './App.css'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import PlaceDetailsPage from './pages/PlaceDetailsPage'
import Navbar from './components/Navbar'


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/places/:placeId" element={<PlaceDetailsPage />} />
      </Routes>      
    </>
  )
}

export default App
