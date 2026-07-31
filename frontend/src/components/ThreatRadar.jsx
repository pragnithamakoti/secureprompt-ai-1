import React from 'react';
import { ShieldAlert, Cpu, Activity, Zap } from 'lucide-react';

const ThreatRadar = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6 glass-panel rounded-2xl border border-cyan-500/30 relative overflow-hidden">
      
      {/* Scanning Radar Graphic */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Concentric Radar Rings */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping opacity-30" />
        <div className="absolute inset-2 rounded-full border border-cyan-500/30" />
        <div className="absolute inset-8 rounded-full border border-cyan-500/40" />
        <div className="absolute inset-14 rounded-full border border-cyan-500/50" />
        
        {/* Crosshair lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-[1px] bg-cyan-500/30" />
          <div className="h-full w-[1px] bg-cyan-500/30" />
        </div>

        {/* Rotating Radar Sweep Beam */}
        <div className="absolute inset-0 rounded-full overflow-hidden animate-[spin_2s_linear_infinite]">
          <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/40 via-cyan-500/10 to-transparent origin-bottom-right transform rotate-45" />
        </div>

        {/* Central Glowing Target Core */}
        <div className="relative z-10 p-3 rounded-full bg-cyan-500/20 border border-cyan-400 shadow-[0_0_20px_#00E5FF]">
          <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
        </div>
      </div>

      {/* Status Text & Matrix Subtitles */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold text-white tracking-wide flex items-center justify-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400 animate-spin" />
          <span>EXECUTING THREAT ANALYSIS</span>
        </h3>
        <p className="text-xs font-mono text-cyan-300/80">
          Running TF-IDF NLP Vectorizer & Vector Similarity Heuristics...
        </p>
      </div>

      {/* Animated Code Matrix Streams */}
      <div className="w-full bg-black/40 p-2.5 rounded-lg border border-white/10 font-mono text-[11px] text-cyan-400/90 flex justify-between items-center">
        <span>[HEURISTIC] Checking DAN patterns...</span>
        <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
      </div>

    </div>
  );
};

export default ThreatRadar;
