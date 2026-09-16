"use client";

import { useEffect, useRef } from "react";

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let layers: Particle[][] = [];
    let dataStreams: DataStream[] = [];
    let mouse = { x: 0, y: 0 };
    let isMouseIn = false;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMouseIn = true;
    };
    
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleMouseEnter = () => { isMouseIn = true; };
    const handleMouseLeave = () => { isMouseIn = false; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSystem();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      isStructured: boolean;
      targetX: number;
      targetY: number;
      activation: number;

      constructor(x?: number, y?: number, isStructured = false) {
        this.x = x !== undefined ? x : Math.random() * canvas!.width;
        this.y = y !== undefined ? y : Math.random() * canvas!.height;
        this.targetX = this.x;
        this.targetY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = isStructured ? Math.random() * 2 + 2 : Math.random() * 1.5 + 0.5;
        this.isStructured = isStructured;
        this.activation = 0;
      }

      update() {
        if (this.isStructured) {
          // Gently float around target
          this.x += Math.sin(Date.now() * 0.001 + this.targetX) * 0.2;
          this.y += Math.cos(Date.now() * 0.001 + this.targetY) * 0.2;
        } else {
          this.x += this.vx;
          this.y += this.vy - (scrollY * 0.0005); // Parallax effect

          if (this.x < 0) this.x = canvas!.width;
          if (this.x > canvas!.width) this.x = 0;
          if (this.y < 0) this.y = canvas!.height;
          if (this.y > canvas!.height) this.y = 0;
        }
        
        if (this.activation > 0) this.activation -= 0.02;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + (this.activation * 2), 0, Math.PI * 2);
        if (this.activation > 0) {
          ctx.fillStyle = `rgba(168, 85, 247, ${0.8 + this.activation})`; // Purple glow
          ctx.shadowBlur = 15;
          ctx.shadowColor = "rgba(168, 85, 247, 0.8)";
        } else {
          ctx.fillStyle = "rgba(59, 130, 246, 0.5)"; // Blue-500
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class DataStream {
      x: number;
      y: number;
      text: string;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height + canvas!.height; // Start below
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        
        const types = [
          "embedding[0.82,0.31,0.91]",
          "vector → 0.842",
          "attention → 0.731",
          "agent.status = thinking",
          "010101001",
          "model.inference()",
          "Qdrant.search()"
        ];
        this.text = types[Math.floor(Math.random() * types.length)];
      }

      update() {
        this.y -= this.speed + (scrollY * 0.001);
        if (this.y < -50) {
          this.y = canvas!.height + 50;
          this.x = Math.random() * canvas!.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.font = "10px monospace";
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
      }
    }

    class DataPacket {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      progress: number;
      speed: number;

      constructor(x1: number, y1: number, x2: number, y2: number) {
        this.startX = x1;
        this.startY = y1;
        this.endX = x2;
        this.endY = y2;
        this.progress = 0;
        this.speed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.progress += this.speed;
        return this.progress >= 1;
      }

      draw() {
        if (!ctx) return;
        const x = this.startX + (this.endX - this.startX) * this.progress;
        const y = this.startY + (this.endY - this.startY) * this.progress;
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(168, 85, 247, 1)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(168, 85, 247, 1)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let packets: DataPacket[] = [];

    const initSystem = () => {
      particles = [];
      layers = [];
      dataStreams = [];
      packets = [];
      
      // 1. Structured Hero Neural Layers
      const centerX = canvas!.width / 2;
      const layerSpacing = Math.min(canvas!.width / 5, 200);
      const nodeSpacing = 60;
      
      const architecture = [4, 6, 6, 3]; // Input, Hidden 1, Hidden 2, Output
      const startX = centerX - (architecture.length - 1) * layerSpacing / 2;
      
      architecture.forEach((nodeCount, layerIdx) => {
        const layerParticles: Particle[] = [];
        const startY = (canvas!.height / 2) - (nodeCount - 1) * nodeSpacing / 2;
        
        for (let i = 0; i < nodeCount; i++) {
          const p = new Particle(
            startX + layerIdx * layerSpacing,
            startY + i * nodeSpacing - 100, // Offset up a bit
            true
          );
          layerParticles.push(p);
          particles.push(p);
        }
        layers.push(layerParticles);
      });

      // 2. Ambient Particles
      const particleCount = Math.floor((canvas!.width * canvas!.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
      
      // 3. Data Streams
      for (let i = 0; i < 15; i++) {
        dataStreams.push(new DataStream());
      }
    };

    const drawConnections = () => {
      if (!ctx) return;

      // Draw structured neural network layers
      for (let i = 0; i < layers.length - 1; i++) {
        const currentLayer = layers[i];
        const nextLayer = layers[i + 1];
        
        for (const p1 of currentLayer) {
          for (const p2 of nextLayer) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Dynamic opacity based on scroll (fade out structured network as you scroll down)
            const scrollOpacity = Math.max(0, 1 - scrollY / 600);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * scrollOpacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            // Randomly spawn data packets
            if (Math.random() < 0.002) {
              packets.push(new DataPacket(p1.x, p1.y, p2.x, p2.y));
              p1.activation = 1; // Light up source node
            }
          }
        }
      }

      // Draw ambient connections & Mouse react
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Connect to mouse
        if (isMouseIn) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            const opacity = 1 - distance / 200;
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.5})`; // Purple synapse
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Neural activation effect
            p1.activation = opacity;
            
            // Magnetic pull
            if (!p1.isStructured) {
              p1.vx -= dx * 0.0001;
              p1.vy -= dy * 0.0001;
            }
          }
        }

        // Connect ambient
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p1.isStructured && p2.isStructured) continue; // Skip already drawn layers
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 1 - distance / 120;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            
            if (p1.activation > 0.5 && Math.random() < 0.05) {
                p2.activation = 0.5; // Spread activation
            }
          }
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      dataStreams.forEach(stream => {
        stream.update();
        stream.draw();
      });

      drawConnections();
      
      // Update and draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        if (packets[i].update()) {
            // Find the closest node to the end and activate it
            const endX = packets[i].endX;
            const endY = packets[i].endY;
            const targetNode = particles.find(p => Math.abs(p.x - endX) < 1 && Math.abs(p.y - endY) < 1);
            if (targetNode) targetNode.activation = 1;
            
            packets.splice(i, 1);
        } else {
            packets[i].draw();
        }
      }

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

