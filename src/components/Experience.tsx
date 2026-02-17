import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';
import ShinyText from './ShinyText';

const Experience: React.FC = () => {
  const experiences = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Labs196 Innovations LLC",
      period: "September 2024 – Present",
      location: "Sugar Land, Texas",
      description: [
        "Led architecture and delivery of a microservices platform, defining bounded contexts, API contracts, and data ownership; improved feature delivery speed by 35% and reduced cross-team dependencies by 40%",
        "Designed event-driven workflows with idempotent consumers, retries with exponential backoff, and dead-letter handling; reduced production incidents by 45% and improved recovery time by 38%",
        "Implemented transactional outbox publishing for reliable event delivery; eliminated duplicate side effects and improved data consistency across services by 90%",
        "Optimized hot-path APIs with query plan tuning, indexing, and selective caching; reduced p95 latency by 42% and lowered database CPU by 28%",
        "Built production observability with traces, metrics, logs, and correlation IDs; reduced time-to-root-cause by 55% and improved alert precision by 30%",
        "Strengthened platform security with RBAC, audit trails, and secrets management; reduced security findings by 60%",
        "Automated deployments and infrastructure with CI/CD and IaC; reduced deployment time by 70% and lowered rollback rate by 25%"
      ],
      technologies: ["Java", "Spring Boot", "Node.js", "PostgreSQL", "Kafka", "Redis", "Kubernetes", "Terraform", "OpenTelemetry"]
    },
    {
      id: 2,
      title: "Full Stack Developer (Part-time)",
      company: "Northeastern University",
      period: "January 2023 – May 2024",
      location: "Boston, Massachusetts",
      description: [
        "Built an assignment management system with role-based permissions, validation, and workflow automation; reduced administrative overhead by 30% and improved submission correctness by 15%",
        "Automated submission processing using serverless event notifications with idempotent handlers; reduced processing time from 6 minutes to 25 seconds",
        "Added observability with structured logs, metrics, dashboards, and alerts; reduced time-to-detect issues by 40%",
        "Provisioned environments and infrastructure using IaC and standardized setup; reduced onboarding time by 45%"
      ],
      technologies: ["Node.js", "Express", "AWS Lambda", "SNS", "Pulumi", "PostgreSQL", "Jest"]
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "KYC Hub",
      period: "January 2022 – June 2022",
      location: "Remote",
      description: [
        "Built full-stack KYC and KYB verification workflows with reviewer tooling and deterministic state transitions; increased case throughput by 30% and reduced manual steps by 25%",
        "Integrated 6+ identity and risk providers using adapter services with standardized mapping and error taxonomy; improved completion rate by 11%",
        "Implemented multi-tenant authentication, authorization, and auditing with PII-safe logging; passed compliance review with 50% fewer findings",
        "Reduced endpoint latency through query optimization, pagination, and caching; improved p95 response time by 29% under peak traffic"
      ],
      technologies: ["Spring Boot", "Angular", "REST APIs", "OAuth2", "JWT", "Redis", "SQL", "JUnit", "Cypress"]
    },
    {
      id: 4,
      title: "Full-Stack Engineer",
      company: "DocsTime",
      period: "January 2020 – October 2021",
      location: "Remote",
      description: [
        "Delivered end-to-end product features across frontend and backend; reduced customer request turnaround time from 2 weeks to 4 days",
        "Modernized the application into a progressive web experience with offline-first caching and notifications; improved retention by 12%",
        "Built CI/CD pipelines with automated tests, versioned artifacts, and staged deployments; reduced release cycle time by 48%",
        "Optimized APIs by profiling slow endpoints, tuning SQL queries and indexes; reduced p95 latency by 37% and reduced timeouts by 31%",
        "Introduced caching for high-frequency reads; reduced database load by 34% and improved throughput by 21%"
      ],
      technologies: ["Angular", "Node.js", "REST APIs", "Redis", "Jenkins", "AWS Lambda", "Jest", "Cypress"]
    }
  ];

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
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="experience" className="py-20 bg-white dark:bg-black transition-colors">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
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
                text="Professional Experience" 
                speed={3}
                className="text-4xl md:text-5xl font-thin text-black dark:text-white"
              />
            </h2>
            <div className="w-24 h-px bg-gold mx-auto"></div>
          </motion.div>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-px bg-gold/30"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-center justify-between mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-white dark:border-black z-10"></div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 hover:border-gold/50 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-2xl font-light mb-2 text-black dark:text-white">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gold mb-4">
                      <Building size={16} />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300 text-sm pl-4 relative">
                          <span className="absolute left-0 text-gold">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs uppercase tracking-wider border border-gold/30 text-gold hover:bg-gold hover:text-black dark:hover:text-black transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for timeline layout */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 