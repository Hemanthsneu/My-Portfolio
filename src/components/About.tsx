import React from 'react';
import { motion } from 'framer-motion';
import ShinyText from './ShinyText';

const About: React.FC = () => {
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
    <section id="about" className="py-20 bg-white dark:bg-black transition-colors">
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
                text="About Me" 
                speed={3}
                className="text-4xl md:text-5xl font-thin text-black dark:text-white"
              />
            </h2>
            <div className="w-24 h-px bg-gold mx-auto"></div>
          </motion.div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I'm a <span className="text-gold font-medium">Senior Software Engineer</span> with 5+ years building full-stack and backend 
                platforms end to end—including API design, distributed systems, event-driven pipelines, cloud infrastructure, CI/CD, and 
                on-call ownership. Currently leading development at Labs196 Innovations LLC.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                With a Master's degree in Computer Science from Northeastern University, I'm strong in Java, Spring Boot, Node.js, React, 
                AWS, Kubernetes, and observability using SLIs, SLOs, and OpenTelemetry. I deliver scalable systems, improve latency and 
                reliability, and ship iterative releases with measurable impact.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <span className="px-3 py-1 text-xs uppercase tracking-wider border border-gold/30 text-gold">AWS Certified Solutions Architect</span>
                <span className="px-3 py-1 text-xs uppercase tracking-wider border border-gold/30 text-gold">HashiCorp Terraform Associate</span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Available for full-time, contract & consulting opportunities
                </p>
              </div>
            </motion.div>

            {/* Visual Element */}
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-full"></div>
                <div className="absolute inset-4 bg-gradient-to-tl from-gold/10 to-transparent rounded-full"></div>
                <div className="absolute inset-8 border border-gold/30 rounded-full"></div>
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl font-thin text-gold mb-2">5+</p>
                    <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400">Years Experience</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div variants={itemVariants} className="mt-20">
            <h3 className="text-2xl font-light text-center mb-12 text-black dark:text-white">
              <ShinyText 
                text="My Philosophy" 
                speed={4}
                className="text-2xl font-light text-black dark:text-white"
              />
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Simplicity",
                  description: "I believe the best solutions are often the simplest ones.",
                },
                {
                  title: "Excellence",
                  description: "Every line of code is an opportunity to create something exceptional.",
                },
                {
                  title: "Innovation",
                  description: "Pushing boundaries while maintaining a foundation of reliability.",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 border border-gray-200 dark:border-gray-800 hover:border-gold/50 transition-colors bg-white dark:bg-black"
                  whileHover={{ y: -5 }}
                >
                  <h4 className="text-xl font-light mt-4 mb-2 text-black dark:text-white">{value.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 