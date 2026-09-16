"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Python", "JavaScript"]
  },
  {
    title: "AI / ML",
    skills: ["Generative AI", "LLMs", "RAG", "AI Agents", "NLP", "Deep Learning (CNN, LSTM)"]
  },
  {
    title: "Frameworks & Libraries",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face Transformers", "FastAPI", "Flask", "OpenCV"]
  },
  {
    title: "GenAI Tooling",
    skills: ["LangChain", "LangGraph", "Agentic AI", "Multi-Agent Systems", "MCP", "CrewAI", "AutoGen", "Human-in-the-Loop (HITL)", "Tool Calling", "Prompt Engineering", "Embedding Models", "Workflow Orchestration", "LLM Evaluation", "Guardrails"]
  },
  {
    title: "Cloud & Infrastructure",
    skills: ["AWS (S3, EC2, ECS, DynamoDB, Lambda, Bedrock, API Gateway, IAM, CloudWatch)", "Docker", "Terraform"]
  },
  {
    title: "MLOps & Deployment",
    skills: ["MLflow", "Git", "GitHub", "DVC", "Model Deployment", "Model Monitoring", "Experiment Tracking"]
  },
  {
    title: "Computer Vision",
    skills: ["Object Detection", "OCR", "Image Segmentation", "Human Action Recognition"]
  },
  {
    title: "Databases & Vector Stores",
    skills: ["MongoDB", "MySQL", "QdrantDB", "ChromaDB"]
  },
  {
    title: "AI Development Agents",
    skills: ["Claude Code", "OpenAI Codex"]
  }
];

function SkillCategory({ category, index }: { category: typeof skillCategories[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group transition-all duration-300"
      style={{
        boxShadow: isHovered ? "0 10px 30px -10px rgba(59,130,246,0.2)" : ""
      }}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Background connecting lines simulation */}
      {isHovered && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="4 4" className="animate-pulse" />
          <line x1="90%" y1="20%" x2="10%" y2="80%" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="4 4" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
        </svg>
      )}

      <h3 className="relative z-10 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-5 pb-3 border-b border-slate-700/50 group-hover:border-blue-500/30 transition-colors">
        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2 mb-0.5 shadow-[0_0_8px_#3b82f6]" />
        {category.title}
      </h3>
      <div className="relative z-10 flex flex-wrap gap-2.5">
        {category.skills.map((skill, idx) => (
          <span
            key={idx}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-300 cursor-default ${
              isHovered 
                ? "bg-blue-900/30 text-blue-200 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.2)] scale-[1.02]" 
                : "bg-slate-800/80 text-slate-300 border-slate-700/50"
            }`}
            style={{ transitionDelay: `${idx * 0.05}s` }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-12">
          <Code2 className="h-8 w-8 text-blue-500 mr-4" />
          <h2 className="text-3xl font-bold">Technology Constellation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

