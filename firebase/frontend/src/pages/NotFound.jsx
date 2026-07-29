import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Terminal } from 'lucide-react';
import BackgroundCanvas from '../components/BackgroundCanvas';

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <BackgroundCanvas pageType="404" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 sm:p-12 rounded-3xl border border-rose-500/40 text-center space-y-6 max-w-lg w-full shadow-2xl relative overflow-hidden"
      >
        <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 w-fit mx-auto text-rose-400">
          <ShieldAlert className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-widest">
            ERROR CODE 404: UNKNOWN ROUTE
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white font-mono">
            System Breach
          </h1>
          <p className="text-sm text-slate-300 font-mono">
            The requested pathway does not exist within the SecurePrompt AI platform kernel.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <Link
            to="/"
            className="cyber-button px-6 py-3 rounded-xl font-bold text-cyan-300 text-sm inline-flex items-center space-x-2 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Return to Secure Firewall</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
