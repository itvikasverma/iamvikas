"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, Database, Network, Terminal } from "lucide-react";

export default function CommandCenter() {
  const [signal, setSignal] = useState(92);
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState("ONLINE");
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const logMessages = [
    "embedding[0.82,0.31,0.91]...",
    "vector_search(query) -> 0.842",
    "attention_weights -> updated",
    "retrieval_augmented_generation -> ok",
    "agent.status = thinking",
    "optimizing_loss_function...",
    "model_inference -> 12ms",
    "parsing_json_response...",
    "tool_call -> search_database",
    "human_in_the_loop -> approved",
    "xgboost_score -> 0.98",
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setSignal(Math.floor(Math.random() * 15) + 85);
      
      if (Math.random() > 0.6) {
        const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
        setLogs(prev => {
          const newLogs = [...prev, `[${new Date().toISOString().split('T')[1].slice(0,8)}] ${randomLog}`];
          return newLogs.slice(-4);
        });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-6 right-6 z-50 w-80 glass-card rounded-lg border border-blue-500/30 overflow-hidden font-mono text-xs hidden md:block shadow-2xl"
    >
      <div className="bg-blue-950/80 px-3 py-2 border-b border-blue-500/30 flex items-center justify-between">
        <div className="flex items-center text-blue-400 font-bold">
          <Terminal className="w-3 h-3 mr-2" />
          AI SYSTEM CONTROL
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-green-400">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse" />
            {status}
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white transition-colors"
            title="Close Panel"
          >
            &times;
          </button>
        </div>
      </div>
      
      <div className="p-3 space-y-3 bg-slate-900/90 text-slate-300">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <Network className="w-3 h-3 text-blue-500 mr-2" />
            <span>Neural Net</span>
          </div>
          <div className="text-right text-blue-400">ACTIVE</div>
          
          <div className="flex items-center">
            <Cpu className="w-3 h-3 text-purple-500 mr-2" />
            <span>Agent System</span>
          </div>
          <div className="text-right text-purple-400">ACTIVE</div>
          
          <div className="flex items-center">
            <Database className="w-3 h-3 text-cyan-500 mr-2" />
            <span>Vector Space</span>
          </div>
          <div className="text-right text-cyan-400">ACTIVE</div>
          
          <div className="flex items-center">
            <Activity className="w-3 h-3 text-green-500 mr-2" />
            <span>ML Pipeline</span>
          </div>
          <div className="text-right text-green-400">READY</div>
        </div>

        <div className="pt-2 border-t border-slate-700/50">
          <div className="flex justify-between mb-1 text-slate-400">
            <span>SIGNAL STRENGTH</span>
            <span className="text-blue-400">{signal}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.8)]"
              style={{ width: `${signal}%` }}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-700/50 h-24 overflow-hidden flex flex-col justify-end">
          {logs.map((log, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: i === logs.length - 1 ? 1 : 0.5, x: 0 }}
              className={`truncate ${i === logs.length - 1 ? 'text-blue-300' : 'text-slate-500'}`}
            >
              {log}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

