import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Pages/Home'
import ProtectedRoute from './Components/ProtectedRoute';
import AddVideo from './Components/AddVideo';
import DisplayVideos from './Components/DisplayVideos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addvideo" element={<AddVideo />} />
        <Route path="/displayvideo/:id" element={<DisplayVideos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
