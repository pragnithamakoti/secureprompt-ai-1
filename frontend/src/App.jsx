import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PromptDetector from './pages/PromptDetector';
import Dashboard from './pages/Dashboard';
import AttackLogs from './pages/AttackLogs';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#050816] text-slate-100 font-['Outfit',sans-serif]">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detector" element={<PromptDetector />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logs" element={<AttackLogs />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
