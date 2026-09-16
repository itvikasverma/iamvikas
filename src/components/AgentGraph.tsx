"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { User, Bot, Search, BrainCircuit, Database, Network } from "lucide-react";

const agents = [
  { id: "user", icon: User, label: "USER", color: "white", x: 50, y: 20 },
  { id: "supervisor", icon: Network, label: "SUPERVISOR", color: "blue", x: 50, y: 45 },
  { id: "rag", icon: Database, label: "RAG AGENT", color: "purple", x: 20, y: 72 },
  { id: "research", icon: Search, label: "RESEARCH AGENT", color: "cyan", x: 50, y: 72 },
  { id: "ml", icon: BrainCircuit, label: "ML AGENT", color: "green", x: 80, y: 72 },
  { id: "output", icon: Bot, label: "OUTPUT", color: "blue", x: 50, y: 92 },
];

export default function AgentGraph() {
  const [activeNode, setActiveNode] = useState("supervisor");
  const [dataPackets, setDataPackets] = useState<{ id: number, from: string, to: string, path: {x:number, y:number}[] }[]>([]);

  useEffect(() => {
    let packetId = 0;
    const interval = setInterval(() => {
      // Simulate data flow with orthogonal paths
      const flows = [
        { from: "user", to: "supervisor", path: [{x:50, y:20}, {x:50, y:45}] },
        { from: "supervisor", to: "rag", path: [{x:50, y:45}, {x:50, y:58}, {x:20, y:58}, {x:20, y:72}] },
        { from: "supervisor", to: "research", path: [{x:50, y:45}, {x:50, y:72}] },
        { from: "supervisor", to: "ml", path: [{x:50, y:45}, {x:50, y:58}, {x:80, y:58}, {x:80, y:72}] },
        { from: "rag", to: "output", path: [{x:20, y:72}, {x:20, y:85}, {x:50, y:85}, {x:50, y:92}] },
        { from: "research", to: "output", path: [{x:50, y:72}, {x:50, y:92}] },
        { from: "ml", to: "output", path: [{x:80, y:72}, {x:80, y:85}, {x:50, y:85}, {x:50, y:92}] },
        { from: "output", to: "user", path: [{x:50, y:92}, {x:95, y:92}, {x:95, y:20}, {x:50, y:20}] },
      ];
      
      const flow = flows[Math.floor(Math.random() * flows.length)];
      setActiveNode(flow.from);
      
      setDataPackets(prev => [...prev, { id: packetId++, ...flow }]);
      
      setTimeout(() => {
        setActiveNode(flow.to);
      }, 1000);
      
      setTimeout(() => {
        setDataPackets(prev => prev.filter(p => p.id !== packetId - 1));
      }, 1500);

    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getNodePos = (id: string) => {
    const agent = agents.find(a => a.id === id);
    return agent ? { left: `${agent.x}%`, top: `${agent.y}%` } : { left: "0", top: "0" };
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[700px] my-12 bg-slate-900/40 rounded-2xl border border-slate-700/50 backdrop-blur-md overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-sm font-mono text-blue-400 opacity-70">
        [AGENT_ORCHESTRATION_LAYER]
      </div>

      {/* Connection Lines (SVG) Orthogonal Paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* User to Supervisor */}
        <path d="M 50% 20% L 50% 45%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" />
        
        {/* Supervisor to Agents */}
        <path d="M 50% 45% L 50% 58% L 20% 58% L 20% 72%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" strokeLinejoin="round" />
        <path d="M 50% 45% L 50% 72%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" />
        <path d="M 50% 45% L 50% 58% L 80% 58% L 80% 72%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" strokeLinejoin="round" />
        
        {/* Agents to Output */}
        <path d="M 20% 72% L 20% 85% L 50% 85% L 50% 92%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" strokeLinejoin="round" />
        <path d="M 50% 72% L 50% 92%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" />
        <path d="M 80% 72% L 80% 85% L 50% 85% L 50% 92%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" strokeLinejoin="round" />
        
        {/* Output back to User */}
        <path d="M 50% 92% L 95% 92% L 95% 20% L 50% 20%" stroke="rgba(59, 130, 246, 0.05)" strokeWidth="1" strokeDasharray="4 4" fill="none" strokeLinejoin="round" />
        
        {/* Animated Packets */}
        {dataPackets.map(packet => {
          return (
            <motion.circle
              key={packet.id}
              r="4"
              fill="#a855f7"
              initial={{ cx: `${packet.path[0].x}%`, cy: `${packet.path[0].y}%`, opacity: 0 }}
              animate={{ 
                cx: packet.path.map(p => `${p.x}%`), 
                cy: packet.path.map(p => `${p.y}%`), 
                opacity: [0, 1, 1, 0] 
              }}
              transition={{ duration: 1.5, ease: "linear", times: packet.path.map((_, i) => i / (packet.path.length - 1 || 1)) }}
              className="shadow-[0_0_10px_#a855f7]"
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {agents.map((agent) => {
        const isActive = activeNode === agent.id;
        const Icon = agent.icon;
        
        return (
          <div
            key={agent.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={getNodePos(agent.id)}
          >
            <div 
              className={`relative flex items-center justify-center w-14 h-14 rounded-xl border transition-all duration-500 z-10 ${
                isActive 
                  ? "bg-blue-900/80 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.6)] scale-110" 
                  : "bg-slate-800 border-slate-600 hover:border-blue-500/50 hover:bg-slate-700"
              }`}
            >
              <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-blue-300' : 'text-slate-400'}`} />
              
              {/* Ping effect when active */}
              {isActive && (
                <span className="absolute inset-0 rounded-xl bg-blue-400 opacity-20 animate-ping" />
              )}
            </div>
            
            <div className={`mt-3 text-xs font-bold tracking-widest transition-colors duration-300 bg-slate-900/80 px-2 py-1 rounded border border-slate-700/50 ${
              isActive ? "text-blue-300" : "text-slate-500"
            }`}>
              {agent.label}
            </div>
            
            {isActive && (
              <div className="mt-2 text-[10px] text-purple-400 font-mono bg-purple-900/30 px-2 py-0.5 rounded border border-purple-500/30 whitespace-nowrap">
                STATUS: {agent.id === 'supervisor' ? 'ROUTING' : agent.id === 'output' ? 'GENERATING' : 'THINKING'}...
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

