import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldAlert, Sparkles, X, Info } from 'lucide-react';

const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const { message, type = 'info', title } = toast;

  const typeStyles = {
    success: {
      bg: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400'
    },
    error: {
      bg: 'bg-rose-950/90 border-rose-500/50 text-rose-200',
      icon: ShieldAlert,
      iconColor: 'text-rose-400'
    },
    gemini: {
      bg: 'bg-cyan-950/90 border-cyan-500/50 text-cyan-200',
      icon: Sparkles,
      iconColor: 'text-cyan-400'
    },
    info: {
      bg: 'bg-slate-900/90 border-cyan-500/30 text-slate-200',
      icon: Info,
      iconColor: 'text-cyan-400'
    }
  };

  const style = typeStyles[type] || typeStyles.info;
  const Icon = style.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className={`fixed top-20 right-6 z-50 p-4 rounded-xl border ${style.bg} shadow-2xl backdrop-blur-md max-w-sm w-full font-mono text-xs flex items-start gap-3`}
      >
        <div className="p-1 rounded-lg bg-black/30">
          <Icon className={`w-4 h-4 ${style.iconColor}`} />
        </div>
        <div className="flex-1 space-y-0.5">
          {title && <div className="font-bold text-white uppercase text-[11px] tracking-wider">{title}</div>}
          <div className="leading-relaxed">{message}</div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
