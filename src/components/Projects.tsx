import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import ShinyText from './ShinyText';
import CircularGallery from './CircularGallery';

const Projects: React.FC = () => {

  const featuredProjects = [
    {
      id: 1,
      title: "AegisGate: Multi-Tenant API Gateway",
      description: "Multi-tenant API gateway with authentication hooks, per-route policies, and role-aware routing. Sustained 12,000 req/s in load tests with p95 latency under 45ms.",
      longDescription: "Built a multi-tenant API gateway and policy engine with sliding-window rate limiting, burst control, request fingerprinting, and hot-key mitigation. Implemented contract tests and backward-compatible API versioning checks in CI. Instrumented end-to-end tracing and metrics with service-level dashboards and burn-rate alerts.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      technologies: ["Node.js", "Redis", "OpenAPI", "OpenTelemetry", "CI/CD", "Contract Testing"],
      github: "https://github.com/Hemanthsneu",
      live: "",
      highlights: [
        "12,000 requests/second with p95 < 45ms",
        "Reduced abuse traffic impact by 70%, 99.95% availability",
        "Reduced breaking changes by 90% with contract tests",
        "Reduced MTTR by 50% with burn-rate alerts"
      ]
    },
    {
      id: 2,
      title: "PulseLedger: Event-Driven Orders & Payments",
      description: "Microservices system for orders and payments using saga orchestration and transactional outbox publishing. Processed 1.2M events/day with zero duplicate charges.",
      longDescription: "Designed event-driven architecture with saga orchestration for order and payment workflows. Implemented idempotent consumers, retries with exponential backoff, and dead-letter workflows with replay tooling. Built schema evolution strategy with compatibility gates and consumer contract checks.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      technologies: ["Kafka", "PostgreSQL", "Saga Pattern", "DLQ", "Schema Versioning", "CI/CD"],
      github: "https://github.com/Hemanthsneu",
      live: "",
      highlights: [
        "1.2M events/day, zero duplicate charges",
        "Reduced failure handling time by 60%",
        "Zero-downtime upgrades with schema evolution",
        "Transactional outbox for reliable delivery"
      ]
    },
    {
      id: 3,
      title: "SignalForge: Observability & SLO Platform",
      description: "Unified telemetry pipeline collecting traces, metrics, and logs with correlation IDs. Defined SLIs/SLOs with error budgets and burn-rate alerts.",
      longDescription: "Built a full-stack observability platform with unified telemetry collection from services and clients. Defined SLIs and SLOs for critical user journeys with error budgets and burn-rate alerting. Load-tested and chaos-tested critical paths to validate timeouts, retries, and back-pressure behavior.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop",
      technologies: ["OpenTelemetry", "Dashboards", "Alerting", "k6", "Fault Injection", "SLIs/SLOs"],
      github: "https://github.com/Hemanthsneu",
      live: "",
      highlights: [
        "Reduced alert noise by 35%",
        "Improved incident detection by 45%",
        "Reduced false positives by 30%",
        "Reduced cascading failures by 40% with chaos testing"
      ]
    },
    {
      id: 4,
      title: "GlideCast: Low-Latency Remote Session Client",
      description: "Native Windows client with asynchronous pipelines and bounded queues for remote streaming. 60 FPS with median input-to-frame latency under 35ms.",
      longDescription: "Built a native Windows client using C# and .NET 8 with asynchronous pipelines for handling input events and frame updates. Implemented reconnect with exponential backoff, session resume, and congestion control. Instrumented telemetry with distributed tracing and performance counters.",
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop",
      technologies: ["C#", ".NET 8", "gRPC", "WebSockets", "OpenTelemetry", "Monitoring"],
      github: "https://github.com/Hemanthsneu",
      live: "",
      highlights: [
        "60 FPS streaming, <35ms input-to-frame latency",
        "98% reconnect success rate",
        "55% faster disconnect recovery",
        "Distributed tracing for root-cause analysis"
      ]
    },
  ];

  const otherProjects = [
    {
      title: "TriageFlow",
      description: "Real-time incident triage system that prioritizes events using a rules engine and scoring model. Reduced alert backlog by 55% and handles 10x traffic spikes.",
      technologies: ["Kafka", "Node.js", "Redis", "OpenTelemetry"],
      github: "https://github.com/Hemanthsneu",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "MatchMint",
      description: "Serverless scheduling platform matching participants using availability windows and constraints. Reduced scheduling conflicts by 60%.",
      technologies: ["AWS Lambda", "DynamoDB", "SNS", "JWT"],
      github: "https://github.com/Hemanthsneu",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=400&fit=crop"
    },
    {
      title: "VaultLink",
      description: "Zero-trust file sharing with short-lived signed links, download limits, and audit trails. Sustained 5,000 req/s under load tests.",
      technologies: ["AWS S3", "Redis", "React", "Node.js"],
      github: "https://github.com/Hemanthsneu",
      image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=600&h=400&fit=crop"
    },
    {
      title: "Assignment Management System",
      description: "Full-stack system with role-based permissions, serverless processing, and IaC. Reduced processing time from 6 min to 25 sec.",
      technologies: ["Node.js", "AWS Lambda", "Pulumi", "PostgreSQL"],
      github: "https://github.com/Hemanthsneu",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop"
    },
    {
      title: "Healthcare PWA Platform",
      description: "Progressive Web App with offline-first caching, push notifications, and real-time analytics. Reduced release cycle time by 48%.",
      technologies: ["Angular", "Jenkins", "Redis", "AWS Lambda"],
      github: "https://github.com/Hemanthsneu",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop"
    },
    {
      title: "KYC Compliance Platform",
      description: "Full-stack KYC/KYB verification workflows with multi-tenant auth and 6+ provider integrations. Increased throughput by 30%.",
      technologies: ["Spring Boot", "Angular", "OAuth2", "Redis"],
      github: "https://github.com/Hemanthsneu",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
    }
  ];

  // Prepare items for CircularGallery (other projects)
  const galleryItems = otherProjects.map(project => ({
    image: project.image,
    text: project.title
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin mb-4 text-black dark:text-white">
              <ShinyText 
                text="Featured Projects" 
                speed={3}
                className="text-4xl md:text-5xl font-thin text-black dark:text-white"
              />
            </h2>
            <div className="w-24 h-px bg-gold mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Showcasing my latest work in distributed systems, observability, and scalable architecture
            </p>
          </motion.div>

          {/* Featured Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {featuredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                variants={itemVariants} 
                className="group"
              >
                <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-8 h-full hover:border-gold/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <Code2 className="text-gold" size={24} />
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gold transition-colors"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gold transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-light mb-3 text-black dark:text-white">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {project.highlights && (
                    <ul className="list-disc list-inside mb-6 space-y-2 text-gray-600 dark:text-gray-400">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-sm">{highlight}</li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs uppercase tracking-wider border border-gold/30 text-gold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Projects Circular Gallery */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl md:text-4xl font-thin mb-8 text-center text-black dark:text-white">
              <ShinyText 
                text="Other Notable Projects" 
                speed={4}
                className="text-3xl md:text-4xl font-thin text-black dark:text-white"
              />
            </h3>
            <div className="w-24 h-px bg-gold mx-auto mb-12"></div>
            
            {/* Circular Gallery for Other Projects */}
            <motion.div 
              variants={itemVariants} 
              className="mb-8 relative"
              style={{ height: '500px' }}
            >
              <CircularGallery 
                items={galleryItems}
                bend={2}
                textColor="#FFD700"
                borderRadius={0.02}
                font="bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                scrollSpeed={1.5}
                scrollEase={0.05}
              />
              
              {/* Instructions */}
              <div className="absolute bottom-0 left-0 right-0 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                  <ChevronLeft size={16} />
                  Drag or scroll to explore more projects
                  <ChevronRight size={16} />
                </p>
              </div>
            </motion.div>

            {/* Project Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 hover:border-gold/50 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Code2 className="text-gold" size={24} />
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gold transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                  <h4 className="text-lg font-medium mb-2 text-black dark:text-white">
                    {project.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 