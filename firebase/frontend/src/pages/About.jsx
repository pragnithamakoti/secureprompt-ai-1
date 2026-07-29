import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Cpu, Layers, Database, Lock, Code, Terminal, Sparkles, Globe, Server, 
  CheckCircle2, Rocket, ArrowRight, Activity, FileCode, Check
} from 'lucide-react';
import BackgroundCanvas from '../components/BackgroundCanvas';

const About = () => {
  return (
    <div className="relative min-h-screen pb-20">
      <BackgroundCanvas videoSrc="/videos/futuristic.mp4" pageType="about" />

      {/* HEADER SECTION */}
      <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <Layers className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>System Specifications & Technical Architecture</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          About <span className="cyber-gradient-text">SecurePrompt AI</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Production-grade AI Security Proxy auditing, classifying, and sanitizing LLM prompt interactions in real time.
        </p>
      </section>

      {/* MAIN SPECIFICATIONS CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 1. SYSTEM ARCHITECTURE & OVERVIEW */}
        <div className="glass-panel p-8 rounded-2xl border border-cyan-500/30 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white font-mono">1. System Architecture</h2>
              <p className="text-xs text-slate-400 font-mono">End-to-end request lifecycle and inline security firewall</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950/90 border border-white/10 font-mono text-xs text-cyan-300 space-y-4 overflow-x-auto shadow-inner">
            <pre className="text-slate-300 leading-normal">
{`[User Input / React Frontend] ──(REST API JSON)──> [FastAPI Backend Security Proxy]
                                                          │
               ┌──────────────────────────────────────────┴──────────────────────────────────────────┐
               │                                                                                     │
               v                                                                                     v
   [TF-IDF NLP Vectorizer Engine]                                                        [Regex Heuristic Rule Engine]
   - Character N-grams (1-3) & Word Features                                              - DAN & Developer Mode Bypasses
   - Logistic Regression Classifier Model                                                - Base64 / Obfuscated Payloads
   - Multi-class Confidence Estimation                                                   - Direct Prompt Injections
               │                                                                                     │
               └──────────────────────────────────────────┬──────────────────────────────────────────┘
                                                          │
                                                          v
                                       [Threat Assessment & Sanitizer]
                                       - Assigns Threat Level: SAFE / SUSPICIOUS / JAILBREAK
                                       - Generates Rewritten Safe Prompt Recommendation
                                                          │
                           ┌──────────────────────────────┴──────────────────────────────┐
                           │                                                             │
                           v (If Prompt is SAFE)                                         v (If Prompt is THREAT)
             [Google Gemini 2.5 Flash API]                                 [Security Guardrail Block]
             - Executes user query securely                                - Prevents LLM forwarding
             - Returns live response to UI                                 - Returns risk explanation
                           │                                                             │
                           └──────────────────────────────┬──────────────────────────────┘
                                                          │
                                                          v
                                        [Firebase Audit Logging & SOC Metrics]`}
            </pre>
          </div>
        </div>

        {/* 2. TECHNOLOGY STACK */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center font-mono flex items-center justify-center gap-2">
            <Code className="w-6 h-6 text-cyan-400" />
            <span>2. Production Technology Stack</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: "Frontend Core", tech: "React 18, Vite 5, JavaScript ES6+", desc: "High performance SPA UI with reactive state management and sub-second load times.", icon: Code, color: "cyan" },
              { category: "Design System", tech: "Tailwind CSS, Framer Motion", desc: "Cyberpunk dark-mode aesthetics with glassmorphism, glowing micro-interactions, and radar animations.", icon: Sparkles, color: "purple" },
              { category: "Backend Microservice", tech: "FastAPI, Python 3.10, Uvicorn", desc: "Asynchronous REST API running threaded executors for non-blocking ML inference.", icon: Server, color: "green" },
              { category: "Machine Learning", tech: "scikit-learn, joblib, NumPy", desc: "Multi-class TF-IDF Logistic Regression model trained on 15,000+ jailbreak & safe datasets.", icon: Cpu, color: "yellow" },
              { category: "Generative AI", tech: "Google Gemini 2.5 Flash SDK", desc: "Integrated via google-genai SDK to answer safe queries in real time with low latency.", icon: Sparkles, color: "cyan" },
              { category: "Database & Audit", tech: "Firebase Firestore & Local Store", desc: "Thread-safe document persistence storing telemetry data, SOC metrics, and prediction logs.", icon: Database, color: "red" }
            ].map((stack, idx) => {
              const Icon = stack.icon;
              return (
                <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono uppercase text-slate-400">{stack.category}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white font-mono">{stack.tech}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{stack.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. MACHINE LEARNING PIPELINE & 4. GEMINI INTEGRATION WORKFLOW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ML Pipeline */}
          <div className="glass-panel p-8 rounded-2xl border border-purple-500/30 space-y-4">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 w-fit text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white font-mono">3. ML Classification Pipeline</h3>
            <ul className="space-y-3 text-xs text-slate-300 font-mono leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Feature Extraction:</strong> Converts raw text into TF-IDF n-gram vectors (1-3 word combinations).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Logistic Regression:</strong> Evaluates feature weights across Safe, Suspicious, and Jailbreak classes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Heuristic Correlation:</strong> Correlates model confidence against explicit regex attack signatures (DAN, DevMode, Base64).</span>
              </li>
            </ul>
          </div>

          {/* Gemini Integration Workflow */}
          <div className="glass-panel p-8 rounded-2xl border border-cyan-500/30 space-y-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 w-fit text-cyan-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white font-mono">4. Gemini Integration Workflow</h3>
            <ul className="space-y-3 text-xs text-slate-300 font-mono leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Pre-Execution Inspection:</strong> Prompts are audited BEFORE any API request reaches Google servers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Conditional Forwarding:</strong> If prompt is SAFE, it is sent to <code className="text-cyan-300">gemini-2.5-flash</code>. If Jailbreak/Suspicious, execution is blocked.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Asynchronous Execution:</strong> Executed in Python thread pool executors to prevent blocking client requests.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 5. SECURITY FEATURES & GUARDRAILS */}
        <div className="glass-panel p-8 rounded-2xl border border-emerald-500/30 space-y-6">
          <h2 className="text-2xl font-bold text-white font-mono text-center flex items-center justify-center gap-2">
            <Lock className="w-6 h-6 text-emerald-400" />
            <span>5. Enterprise Security Features</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Zero Key Exposure", desc: "API keys loaded dynamically via environment variables; never exposed to client browsers." },
              { title: "Sanitized Logging", desc: "Logs redact sensitive key tokens and prevent raw credential storage." },
              { title: "Input Validation", desc: "4000-character input ceiling prevents memory exhaustion and denial-of-service." },
              { title: "Adversarial Rewriting", desc: "Constructs clean, sanitized prompt alternatives automatically for flagged queries." }
            ].map((sec, i) => (
              <div key={i} className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-2">
                <h4 className="text-sm font-bold text-emerald-400 font-mono">{sec.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. FUTURE SCOPE & ROADMAP */}
        <div className="glass-panel p-8 rounded-2xl border border-cyan-500/30 space-y-6">
          <h2 className="text-2xl font-bold text-white text-center font-mono flex items-center justify-center gap-2">
            <Rocket className="w-6 h-6 text-cyan-400" />
            <span>6. Future Scope & Roadmap</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            <div className="p-6 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase">Phase 1: Short Term</span>
              <h4 className="text-base font-bold text-white">Multilingual Dataset Expansion</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Incorporating non-English jailbreak vectors and enhanced deep base64/hex payload de-obfuscators.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase">Phase 2: Medium Term</span>
              <h4 className="text-base font-bold text-white">Continuous Model Retraining</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated continuous model retraining pipeline triggered when new flagged attack logs accumulate.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase">Phase 3: Long Term</span>
              <h4 className="text-base font-bold text-white">Enterprise SDK & Reverse Proxy</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Deployable inline API Reverse Proxy gateway and installable Python (<code className="text-cyan-300">pip install secureprompt</code>) SDK package.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default About;
