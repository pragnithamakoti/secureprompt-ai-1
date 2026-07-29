import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, ShieldAlert, Cpu, Activity, Menu, X, Terminal, BarChart3, Database, Info } from 'lucide-react';
import { checkHealth } from '../services/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const location = useLocation();

  useEffect(() => {
    const verifyHealth = async () => {
      try {
        const res = await checkHealth();
        if (res && res.status === 'online') {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch (err) {
        setBackendStatus('offline');
      }
    };

    verifyHealth();
    const interval = setInterval(verifyHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Cpu },
    { name: 'Prompt Detector', path: '/detector', icon: ShieldAlert },
    { name: 'Analytics SOC', path: '/dashboard', icon: BarChart3 },
    { name: 'Attack Logs', path: '/logs', icon: Database },
    { name: 'About Platform', path: '/about', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 bg-[#050816]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300">
              <Shield className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 rounded-xl bg-cyan-400/10 animate-ping opacity-25" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                SecurePrompt <span className="cyber-gradient-text font-black">AI</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-cyan-400/80 font-mono font-semibold">
                LLM Threat Protection Engine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Engine Status & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono">
              <span
                className={`w-2 h-2 rounded-full ${
                  backendStatus === 'online'
                    ? 'bg-emerald-400 shadow-[0_0_8px_#00C896] animate-pulse'
                    : 'bg-rose-500 shadow-[0_0_8px_#FF4D6D]'
                }`}
              />
              <span className="text-slate-300">
                {backendStatus === 'online' ? 'ENGINE ONLINE' : 'DISCONNECTED'}
              </span>
            </div>

            <Link
              to="/detector"
              className="cyber-button px-4 py-2 rounded-xl text-sm font-semibold text-cyan-300 flex items-center space-x-2 shadow-lg"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Scan</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5 text-cyan-400" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
