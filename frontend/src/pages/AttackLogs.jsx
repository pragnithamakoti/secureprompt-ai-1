import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Search, Filter, ChevronLeft, ChevronRight, Eye, ShieldAlert, 
  ShieldCheck, AlertTriangle, X, Terminal, Clock, Copy, Check, Sparkles, Download, Calendar
} from 'lucide-react';
import BackgroundCanvas from '../components/BackgroundCanvas';
import Toast from '../components/Toast';
import { fetchLogs } from '../services/api';

const AttackLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedLog, setSelectedLog] = useState(null);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info', title = '') => {
    setToast({ message, type, title });
    setTimeout(() => setToast(null), 3000);
  };

  const loadLogsData = async () => {
    setLoading(true);
    try {
      const res = await fetchLogs({
        search,
        category: category === "All" ? "" : category,
        date_filter: dateFilter,
        page,
        limit: 10
      });
      setLogs(res.logs || []);
      setTotalPages(res.total_pages || 1);
      setTotalRecords(res.total || 0);
    } catch (err) {
      console.error("Logs fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogsData();
  }, [search, category, dateFilter, page]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("Text copied to clipboard!", "success", "Copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    if (!logs || logs.length === 0) {
      showToast("No logs available to export.", "error", "Export Failed");
      return;
    }

    const headers = ["ID", "Timestamp", "Prompt", "Prediction", "Confidence (%)", "Attack Category", "Gemini Status", "Safe Prompt Recommendation"];
    const rows = logs.map(l => [
      l.id,
      `"${l.timestamp}"`,
      `"${(l.prompt || "").replace(/"/g, '""')}"`,
      l.prediction,
      l.confidence,
      l.attack_category,
      l.gemini_called || l.prediction === 'Safe' ? 'Forwarded' : 'Blocked',
      `"${(l.safe_prompt || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `secureprompt_attack_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Exported attack logs to CSV file!", "success", "CSV Exported");
  };

  return (
    <div className="relative min-h-screen pb-20">
      <BackgroundCanvas videoSrc="/videos/matrix.mp4" pageType="logs" />
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* PAGE HEADER */}
      <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <Database className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Security Audit & Telemetry Repository</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Attack & Prediction <span className="cyber-gradient-text">Logs</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Search, filter by threat class, query by date, and export historical security classification logs.
        </p>
      </section>

      {/* CONTROLS BAR: SEARCH, FILTERS & CSV EXPORT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Left Controls: Search & Date Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search prompts, categories, or status..."
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Date Filter */}
            <div className="relative w-full sm:w-48">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => { setDateFilter(e.target.value); setPage(1); }}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            {dateFilter && (
              <button
                onClick={() => setDateFilter("")}
                className="text-xs font-mono text-slate-400 hover:text-cyan-400 underline whitespace-nowrap"
              >
                Clear Date
              </button>
            )}
          </div>

          {/* Right Controls: Filter Pills & Export CSV Button */}
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <div className="flex items-center space-x-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-white/10">
              {["All", "Safe", "Suspicious", "Jailbreak", "DAN", "Prompt Injection"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                    category === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 transition-all shrink-0 shadow-lg"
              title="Download CSV export"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export CSV</span>
            </button>
          </div>

        </div>

        {/* LOGS AUDIT TABLE */}
        <div className="glass-panel rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl">
          
          <div className="p-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Showing {logs.length} of {totalRecords} total log entries</span>
            <span>Page {page} of {totalPages}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Prompt Excerpt</th>
                  <th className="p-4">Classification</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Gemini Status</th>
                  <th className="p-4">Confidence</th>
                  <th className="p-4 text-center">Inspect</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      <div className="flex items-center justify-center space-x-2">
                        <Terminal className="w-4 h-4 text-cyan-400 animate-spin" />
                        <span>Querying prediction audit records...</span>
                      </div>
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      No logs matched your search or date filters.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 text-slate-400 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-4 max-w-sm truncate text-slate-200">
                        "{log.prompt}"
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold uppercase ${
                            log.prediction === 'Safe'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : log.prediction === 'Suspicious'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          }`}
                        >
                          {log.prediction}
                        </span>
                      </td>
                      <td className="p-4 text-cyan-300 whitespace-nowrap">
                        {log.attack_category}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                            log.gemini_called || log.prediction === 'Safe' || log.gemini_status === 'Forwarded'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          {log.gemini_called || log.prediction === 'Safe' ? 'Forwarded' : 'Blocked'}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-white whitespace-nowrap">
                        {log.confidence}%
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition-all"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER */}
          <div className="p-4 bg-slate-900/90 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-slate-300 disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <span className="text-xs font-mono text-slate-400">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-slate-300 disabled:opacity-40 flex items-center gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </main>

      {/* INSPECTION MODAL */}
      <AnimatePresence>
        {selectedLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/40 max-w-2xl w-full space-y-6 relative shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <span className="text-lg font-bold text-white font-mono">Log Audit Inspector</span>
                </div>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 uppercase">Logged Prompt:</span>
                  <div className="mt-1 p-3 rounded-xl bg-slate-950 border border-white/10 text-slate-200 leading-relaxed">
                    "{selectedLog.prompt}"
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-slate-400 uppercase">Classification:</span>
                    <div className="mt-1 font-bold text-sm text-cyan-400">{selectedLog.prediction} ({selectedLog.confidence}%)</div>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase">Attack Category:</span>
                    <div className="mt-1 font-bold text-sm text-purple-400">{selectedLog.attack_category}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase">Gemini Status:</span>
                    <div className="mt-1 font-bold text-sm text-emerald-400">
                      {selectedLog.gemini_called || selectedLog.prediction === 'Safe' ? 'Forwarded' : 'Blocked'}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 uppercase">Risk Analysis Explanation:</span>
                  <p className="mt-1 p-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 leading-relaxed">
                    {selectedLog.explanation}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 uppercase font-bold">Recommended Safe Prompt:</span>
                    <button
                      onClick={() => handleCopy(selectedLog.safe_prompt)}
                      className="text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="mt-1 p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 italic">
                    "{selectedLog.safe_prompt}"
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 border-t border-white/10 pt-3">
                  Log Record ID: {selectedLog.id} | Recorded: {new Date(selectedLog.timestamp).toISOString()}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AttackLogs;
