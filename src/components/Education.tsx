"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "IIMT College of Engineering, Greater Noida",
    period: "2022 – 2024",
    percentage: "74%"
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Goel Institute of Higher Studies, Lucknow",
    period: "2019 – 2022",
    percentage: "77%"
  }
];

const certifications = [
  "Google Skills Boost – Introduction to Generative AI"
];

export default function Education() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center mb-8">
              <GraduationCap className="h-8 w-8 text-blue-500 mr-4" />
              <h2 className="text-3xl font-bold">Education</h2>
            </div>
            
            <div className="space-y-6">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="relative z-10 text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{item.degree}</h3>
                  <p className="relative z-10 text-blue-400 font-medium mb-4">{item.institution}</p>
                  <div className="relative z-10 flex justify-between items-center text-sm text-slate-400">
                    <span className="flex items-center">
                      <span className="bg-slate-800/80 border border-slate-700/50 px-4 py-1.5 rounded-full font-medium shadow-sm">
                        {item.period}
                      </span>
                    </span>
                    <span className="font-semibold text-slate-300 bg-slate-800/50 px-3 py-1 rounded-lg">
                      Score: <span className="text-blue-400">{item.percentage}</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center mb-8 mt-12 md:mt-0">
              <Award className="h-8 w-8 text-blue-500 mr-4" />
              <h2 className="text-3xl font-bold">Certifications</h2>
            </div>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card flex items-center rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-l from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 bg-blue-500/10 p-3 rounded-xl mr-4 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                    <Award className="h-6 w-6 text-blue-400" />
                  </div>
                  <p className="relative z-10 text-slate-200 font-medium leading-relaxed">
                    {cert}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

