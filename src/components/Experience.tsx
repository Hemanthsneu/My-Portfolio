import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';
import ShinyText from './ShinyText';

const Experience: React.FC = () => {
  const experiences = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Labs196 Innovations LLC (RealProton)",
      period: "September 2024 – Present",
      location: "Sugar Land, Texas",
      description: [
        "Led full-stack ownership including requirement gathering, designing, implementing, and deploying scalable features across web applications, ensuring cross-platform compatibility",
        "Designed and maintained complex data storage solutions using MySQL and non-relational databases, optimizing data processing efficiency and ensuring high availability",
        "Built powerful and intuitive client apps using Next.js, implementing responsive features for seamless experience across devices",
        "Led technical design discussions with stakeholders, focusing on reliability and scalability",
        "Developed and optimized backend services using Golang, including data processing pipelines and server-side logic"
      ],
      technologies: ["Next.js", "Golang", "MySQL", "Full-Stack Development"]
    },
    {
      id: 2,
      title: "Full Stack Developer (Part-time)",
      company: "Northeastern University",
      period: "January 2023 – May 2024",
      location: "Boston, Massachusetts",
      description: [
        "Engineered an Assignment Management System with Node.js, implementing RESTful APIs and Sequelize ORM for secure data storage",
        "Utilized AWS SDK for SNS alerts, Pulumi for Infrastructure as Code, and AWS Lambda for automated submission processing",
        "Enhanced application reliability by integrating Winston for logging and StatsD for capturing metrics",
        "Collaborated with UX/UI designers to enhance user experience, following user-centered design principles"
      ],
      technologies: ["Node.js", "AWS", "Pulumi", "Sequelize", "RESTful APIs"]
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "KYC Hub",
      period: "January 2022 – August 2022",
      location: "Remote",
      description: [
        "Developed responsive user interfaces for compliance tools using Angular, streamlining workflows for identity verification and fraud detection",
        "Created scalable RESTful APIs with Spring Boot to integrate multiple global data sources",
        "Optimized backend services and Angular components to reduce data fetching latency by 30%",
        "Worked on front-end and backend integration, leveraging REST APIs for efficient data exchange"
      ],
      technologies: ["Angular", "Spring Boot", "RESTful APIs", "SQL", "NoSQL"]
    },
    {
      id: 4,
      title: "Full Stack Engineer",
      company: "DocsTime",
      period: "January 2020 – December 2021",
      location: "Remote",
      description: [
        "Converted an Angular-based website into a scalable Progressive Web Application (PWA) with offline support and push notifications",
        "Built a CI/CD pipeline using Jenkins, reducing release times by 40%",
        "Leveraged Redis for caching and AWS Lambda-based serverless functions for real-time referral analytics",
        "Supported high-volume traffic with minimal latency through optimized architecture"
      ],
      technologies: ["Angular", "PWA", "Jenkins", "Redis", "AWS Lambda"]
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