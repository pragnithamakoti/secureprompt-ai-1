import React from 'react';
import { motion } from 'framer-motion';

const MetricCard = ({ title, value, subtitle, icon: Icon, color = "cyan", trend }) => {
  const colorMap = {
    cyan: {
      border: "border-cyan-500/30",
      glow: "shadow-[0_0_20px_rgba(0,229,255,0.15)]",
      iconBg: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
      accentText: "text-cyan-400"
    },
    green: {
      border: "border-emerald-500/30",
      glow: "shadow-[0_0_20px_rgba(0,200,150,0.15)]",
      iconBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      accentText: "text-emerald-400"
    },
    yellow: {
      border: "border-amber-500/30",
      glow: "shadow-[0_0_20px_rgba(255,183,3,0.15)]",
      iconBg: "bg-amber-500/20 text-amber-400 border-amber-500/40",
      accentText: "text-amber-400"
    },
    red: {
      border: "border-rose-500/30",
      glow: "shadow-[0_0_20px_rgba(255,77,109,0.15)]",
      iconBg: "bg-rose-500/20 text-rose-400 border-rose-500/40",
      accentText: "text-rose-400"
    },
    purple: {
      border: "border-purple-500/30",
      glow: "shadow-[0_0_20px_rgba(108,99,255,0.15)]",
      iconBg: "bg-purple-500/20 text-purple-400 border-purple-500/40",
      accentText: "text-purple-400"
    }
  };

  const currentTheme = colorMap[color] || colorMap.cyan;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className={`glass-panel p-6 rounded-2xl border ${currentTheme.border} ${currentTheme.glow} transition-all duration-300 relative overflow-hidden`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            {title}
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`p-3 rounded-xl border ${currentTheme.iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Live Status</span>
          <span className={currentTheme.accentText}>{trend}</span>
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;
