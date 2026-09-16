"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Enterprise RAG Chatbot",
    description: "Designed and developed a Retrieval-Augmented Generation (RAG) chatbot for question answering across large-scale document repositories.",
    details: [
      "Built scalable document ingestion pipelines and generated dense embeddings using all-MiniLM-L6-v2, stored and indexed in QdrantDB.",
      "Implemented Hybrid Retrieval (BM25 + Semantic Search) with cross-encoder/ms-marco-MiniLM-L-6-v2 re-ranking to improve retrieval relevance and reduce hallucinations.",
      "Architected the agentic workflow using LangGraph with query routing, tool calling, and Human-in-the-Loop (HITL) approval.",
      "Exposed APIs through FastAPI, and deployed the solution on AWS with logging and monitoring."
    ],
    tags: ["RAG", "LangGraph", "QdrantDB", "FastAPI", "AWS", "Hybrid Retrieval"]
  },
  {
    title: "Agentic AI Fraud Investigation",
    description: "An enterprise-grade Fraud Detection and Investigation system that combines Machine Learning (XGBoost) with an Agentic AI Workflow (LangGraph & Groq) to detect and explain suspicious banking transactions in real-time.",
    details: [
      "Built ultra-fast ML detection using XGBoost with SHAP explainability to evaluate transactions and explain fraud scores.",
      "Architected smart routing via LangGraph to auto-approve low-risk transactions and trigger deep-dive investigations for high risk.",
      "Implemented a Context-Aware SQL Agent and RAG Compliance Agent (Qdrant) to fetch historical data and verify internal policies.",
      "Developed a FastAPI backend with Groq LLM integration and a Streamlit dashboard for Human-in-the-Loop (HITL) final decisions."
    ],
    tags: ["LangGraph", "XGBoost", "Groq", "FastAPI", "Qdrant", "Streamlit", "RAG"],
    link: "https://github.com/itvikasverma/Agentic-AI-Fraud-Investigation-System"
  },
  {
    title: "Human Action Recognition System",
    description: "Developed a deep learning-based human activity recognition system for drone-captured video streams using YOLOv10 for object detection and a hybrid CNN + LSTM architecture for activity classification in PyTorch.",
    details: [
      "Built an end-to-end pipeline covering frame extraction, detection, spatial feature extraction, and temporal sequence modeling.",
      "Improved performance through hyperparameter tuning and data augmentation, optimizing for near real-time inference."
    ],
    tags: ["PyTorch", "YOLOv10", "CNN", "LSTM", "Computer Vision"]
  },
  {
    title: "Image Segmentation Quality Assessment",
    description: "Developed a YOLOv8-Seg-based image segmentation and classification system for saffron quality assessment.",
    details: [
      "Built custom datasets, implemented preprocessing and augmentation pipelines, and trained YOLOv8-Seg models for accurate segmentation and classification.",
      "Applied MLOps practices including experiment tracking, versioning, and automated training workflows."
    ],
    tags: ["YOLOv8-Seg", "Image Segmentation", "MLOps", "Computer Vision"]
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group flex flex-col h-full z-10 transition-all duration-500"
      style={{
        transform: isHovered ? "perspective(1000px) rotateX(2deg) rotateY(-2deg) translateY(-5px)" : "perspective(1000px) rotateX(0) rotateY(0) translateY(0)",
        boxShadow: isHovered ? "0 20px 40px -10px rgba(59,130,246,0.3)" : ""
      }}
    >
      {/* Dynamic Background Network on Hover */}
      <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-[50px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full" />
        
        {/* Animated Data streams */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 delay-150 ease-in-out" />
      </div>
      
      <div className="relative z-10 flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{project.title}</h3>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 mt-1 transition-transform hover:scale-110">
            <ExternalLink className="h-5 w-5" />
          </a>
        )}
      </div>
      <p className="relative z-10 text-slate-300 text-sm mb-6 font-medium leading-relaxed">
        {project.description}
      </p>
      
      <div className="relative z-10 flex-grow">
        <ul className="list-none space-y-3 text-sm text-slate-400 mb-6">
          {project.details.map((detail, idx) => (
            <li key={idx} className="flex items-start">
              <span className={`mr-2 mt-0.5 flex-shrink-0 transition-colors duration-300 ${isHovered ? 'text-blue-400' : 'text-blue-500/50'}`}>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isHovered ? 3 : 2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Node Graph visually */}
      <div className="relative z-10 mt-auto pt-6 border-t border-slate-700/50 group-hover:border-blue-500/30 transition-colors">
        {isHovered && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-blue-400 font-mono tracking-widest bg-slate-900 px-2 rounded-full border border-blue-500/30">
            TECHNOLOGY_NODES
          </div>
        )}
        <div className="flex flex-wrap gap-2 relative">
          {/* Simulated node connections */}
          {isHovered && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-30" style={{ minHeight: '40px' }}>
              <path d="M20,20 L60,20 L100,40" stroke="#3b82f6" strokeWidth="1" fill="none" className="animate-pulse" />
            </svg>
          )}
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-300 ${
                isHovered 
                  ? "bg-blue-500/20 text-blue-200 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
                  : "bg-slate-800/80 text-blue-300/70 border-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.05)]"
              }`}
            >
              <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mr-1.5 mb-0.5 animate-pulse" style={{ animationDelay: `${idx * 0.2}s` }} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 z-10 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-12">
          <FolderGit2 className="h-8 w-8 text-blue-500 mr-4" />
          <h2 className="text-3xl font-bold">System Architectures</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

