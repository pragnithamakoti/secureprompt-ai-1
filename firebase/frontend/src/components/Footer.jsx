import React, { useState } from 'react';
import { Shield, Lock, Github, FileText, ExternalLink, X, Terminal, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showDocs, setShowDocs] = useState(false);

  return (
    <footer className="relative z-10 border-t border-white/10 glass-panel bg-[#050816]/90 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Version */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                SecurePrompt <span className="cyber-gradient-text">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Enterprise AI security proxy auditing prompt injections, DAN exploits, and adversarial LLM jailbreaks in real time.
            </p>
            
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center space-x-2 text-cyan-400">
                <Lock className="w-3.5 h-3.5" />
                <span>Version: v1.2.0 Production Release</span>
              </div>
              <div className="text-slate-400">
                Developed by: <strong className="text-slate-200">SecurePrompt AI Core Team</strong>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white tracking-wider uppercase mb-4">Platform Pages</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><Link to="/" className="text-slate-400 hover:text-cyan-400 transition-colors">Home Landing</Link></li>
              <li><Link to="/detector" className="text-slate-400 hover:text-cyan-400 transition-colors">Prompt Detector</Link></li>
              <li><Link to="/dashboard" className="text-slate-400 hover:text-cyan-400 transition-colors">SOC Analytics Dashboard</Link></li>
              <li><Link to="/logs" className="text-slate-400 hover:text-cyan-400 transition-colors">Attack History Logs</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-cyan-400 transition-colors">Architecture & Specs</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources & Links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white tracking-wider uppercase mb-4">Resources & Links</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setShowDocs(true)} 
                  className="text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>API Documentation</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setShowPrivacy(true)} 
                  className="text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Policy</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Attack Vectors Covered */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white tracking-wider uppercase mb-4">Guardrails Active</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" /><span>DAN Mode Guardrail</span></li>
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /><span>Developer Mode Guardrail</span></li>
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" /><span>Prompt Injection Guardrail</span></li>
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /><span>Base64 Obfuscation Guardrail</span></li>
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /><span>Gemini 2.5 Flash Safety Proxy</span></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <p>© 2026 SecurePrompt AI. Production-grade AI Defense Platform.</p>
          <div className="flex items-center space-x-3 mt-2 sm:mt-0">
            <span>Built for Enterprise LLM Security</span>
            <span>•</span>
            <button onClick={() => setShowPrivacy(true)} className="hover:text-slate-300">Privacy</button>
            <span>•</span>
            <button onClick={() => setShowDocs(true)} className="hover:text-slate-300">Docs</button>
          </div>
        </div>
      </div>

      {/* PRIVACY POLICY MODAL */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/40 max-w-lg w-full space-y-4 text-xs font-mono text-slate-300 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-sm font-bold text-white uppercase flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Privacy & Data Security Policy
              </span>
              <button onClick={() => setShowPrivacy(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p>1. <strong>Zero Credential Logging:</strong> API keys and secrets are loaded strictly from environment variables and never logged or stored in audit records.</p>
            <p>2. <strong>Sanitized Telemetry:</strong> Only threat metadata, classification scores, and sanitized prompt content are saved to Firebase audit storage.</p>
            <p>3. <strong>Conditional API Forwarding:</strong> Malicious or flagged prompts are automatically blocked prior to sending any request to external LLM providers like Gemini.</p>
            <div className="pt-3 border-t border-white/10 text-right">
              <button onClick={() => setShowPrivacy(false)} className="px-4 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENTATION MODAL */}
      {showDocs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/40 max-w-lg w-full space-y-4 text-xs font-mono text-slate-300 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-sm font-bold text-white uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                API & Integration Documentation
              </span>
              <button onClick={() => setShowDocs(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p><strong>POST /predict</strong></p>
            <div className="p-2.5 rounded bg-slate-950 border border-white/10 text-cyan-300 font-mono">
              {`{ "prompt": "What is photosynthesis?" }`}
            </div>
            <p><strong>GET /health</strong> - Returns backend status and Gemini API configuration state.</p>
            <p><strong>GET /dashboard</strong> - Returns real-time threat metrics and category counts.</p>
            <p><strong>GET /logs</strong> - Returns paginated, searchable prediction history.</p>
            <div className="pt-3 border-t border-white/10 text-right">
              <button onClick={() => setShowDocs(false)} className="px-4 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                Close Docs
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
