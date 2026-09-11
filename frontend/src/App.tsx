import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import NavBar from './components/ui/Navbar';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';

export default function App() {
  return (
   
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path = "/about" element = {<About />} />
        <Route path = "/services" element = {<Services />} />
        <Route path = "/contact" element = {<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}