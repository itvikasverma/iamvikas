import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import NeuralNetwork from "@/components/NeuralNetwork";
import AgentGraph from "@/components/AgentGraph";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-grid-pattern">
      {/* Global Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralNetwork />
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col">
        <Hero />
        <Experience />
        
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
          <AgentGraph />
        </div>

        <Projects />
        <Skills />
        <Education />
      </div>
    </div>
  );
}
