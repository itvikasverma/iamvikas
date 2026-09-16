"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experience = [
  {
    role: "AI / ML Engineer",
    company: "Wittybrains Software Technologies Private Limited",
    period: "Oct 2024 – Present",
    responsibilities: [
      "Designed and deployed an enterprise-grade RAG chatbot processing 10K+ documents using Hybrid Retrieval (BM25 + Semantic Search) with cross-encoder re-ranking, improving query accuracy by 35% and reducing manual search time by 60%.",
      "Built scalable AWS-based pipelines for document ingestion, embedding generation, hybrid search, and cross-encoder re-ranking, enabling low-latency and high-accuracy document retrieval.",
      "Designed and implemented an Agentic AI workflow using LangGraph with intelligent query routing, tool calling, multi-agent orchestration, and Human-in-the-Loop (HITL) approval for sensitive actions, improving system reliability and reducing hallucinations.",
      "Developed and deployed end-to-end computer vision pipelines for object detection (YOLOv10), human action recognition (CNN + LSTM), and image segmentation, optimizing real-time inference and model performance.",
      "Trained and deployed deep learning models using TensorFlow and PyTorch, built autonomous AI agents and orchestrated multi-agent workflows using LangChain and LangGraph, and leveraged MLflow, DVC, and Docker for experiment tracking, model versioning, and containerized deployment."
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-12">
          <Briefcase className="h-8 w-8 text-blue-500 mr-4" />
          <h2 className="text-3xl font-bold">Work Experience</h2>
        </div>

        <div className="space-y-12">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline vertical line */}
              <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-blue-500/50 to-transparent"></div>
              
              {/* Timeline dot */}
              <div className="absolute w-5 h-5 bg-slate-900 border-2 border-blue-500 rounded-full -left-[10px] top-1 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10">
                <div className="absolute inset-1 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              </div>
              
              <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-baseline mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">{exp.role}</h3>
                    <p className="text-lg text-slate-300 font-medium mt-1">{exp.company}</p>
                  </div>
                  <span className="text-sm text-blue-400 mt-3 md:mt-0 font-semibold px-4 py-1.5 border border-blue-500/20 bg-blue-500/10 rounded-full inline-block w-fit backdrop-blur-sm shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                    {exp.period}
                  </span>
                </div>
                <ul className="relative z-10 list-none space-y-4 text-slate-300">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="leading-relaxed flex items-start">
                      <span className="text-blue-500 mr-3 mt-1.5 flex-shrink-0">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

