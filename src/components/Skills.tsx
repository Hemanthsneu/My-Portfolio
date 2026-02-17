import React from 'react';
import { motion } from 'framer-motion';
import ShinyText from './ShinyText';
import TechIcon from './TechIcons';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      id: 'languages',
      category: 'Languages',
      color: 'from-blue-500 to-cyan-500',
      skills: ['Java', 'TypeScript', 'JavaScript', 'Python', 'C#', 'SQL'],
    },
    {
      id: 'backend',
      category: 'Backend',
      color: 'from-purple-500 to-pink-500',
      skills: ['Spring Boot', 'Node.js', 'Express', 'REST APIs', 'OpenAPI', 'gRPC', 'WebSockets'],
    },
    {
      id: 'frontend',
      category: 'Frontend',
      color: 'from-cyan-500 to-blue-500',
      skills: ['React', 'Next.js', 'Angular', 'HTML', 'CSS'],
    },
    {
      id: 'architecture',
      category: 'Architecture & Systems',
      color: 'from-indigo-500 to-purple-500',
      skills: ['Microservices', 'Distributed Systems', 'Event-Driven', 'Domain-Driven Design', 'System Design', 'API Versioning'],
    },
    {
      id: 'messaging',
      category: 'Messaging & Data Pipelines',
      color: 'from-orange-500 to-red-500',
      skills: ['Kafka', 'Idempotency', 'Outbox Pattern', 'Dead-Letter Queues', 'Retries with Backoff'],
    },
    {
      id: 'databases',
      category: 'Datastores',
      color: 'from-green-500 to-emerald-500',
      skills: ['PostgreSQL', 'MySQL', 'Redis', 'DynamoDB', 'MongoDB'],
    },
    {
      id: 'cloud',
      category: 'Cloud & DevOps',
      color: 'from-yellow-500 to-orange-500',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Pulumi', 'Jenkins', 'GitHub Actions'],
    },
    {
      id: 'observability',
      category: 'Observability & Reliability',
      color: 'from-teal-500 to-green-500',
      skills: ['OpenTelemetry', 'Structured Logging', 'Metrics', 'Tracing', 'Dashboards', 'SLIs/SLOs', 'Incident Response'],
    },
    {
      id: 'blockchain',
      category: 'Blockchain & Web3',
      color: 'from-amber-500 to-orange-500',
      skills: ['Ethereum', 'Solidity', 'Web3.js', 'Ethers.js', 'Smart Contracts', 'Tokenization', 'ERC-20', 'ERC-721', 'ERC-3643', 'ERC-1404', 'DeFi', 'NFTs', 'EVM'],
    },
  ];

  const additionalSkills = [
    'OAuth2', 'OpenID Connect', 'JWT', 'RBAC', 'Secrets Management',
    'JUnit', 'Mockito', 'Jest', 'Cypress', 'Selenium',
    'Integration Testing', 'Contract Testing', 'CI/CD',
    'AWS EKS', 'AWS Lambda', 'AWS SNS', 'AWS S3', 'AWS RDS',
    'Alerting', 'Correlation IDs', 'Error Taxonomy',
    'Web3 Integration', 'Hardhat', 'IPFS', 'Smart Contract Auditing', 'Non-EVM'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const hexagonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        type: "spring" as const,
        stiffness: 200,
      },
    }),
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
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
                text="Technical Skills" 
                speed={3}
                className="text-4xl md:text-5xl font-thin text-black dark:text-white"
              />
            </h2>
            <div className="w-24 h-px bg-gold mx-auto"></div>
          </motion.div>

          {/* Skill Categories Grid */}
          <div className="space-y-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Category Title */}
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-light mb-2 text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
                    {category.category}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      custom={index}
                      variants={hexagonVariants}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      viewport={{ once: true }}
                      className="relative group"
                    >
                      {/* Hexagon Container */}
                      <div className="relative w-24 h-24 md:w-28 md:h-28">
                        {/* Hexagon Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                             style={{
                               clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                             }}
                        />
                        
                        {/* Hexagon Border */}
                        <div className="absolute inset-0 border-2 border-gray-300 dark:border-gray-700 group-hover:border-gold transition-colors duration-300"
                             style={{
                               clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                             }}
                        />
                        
                        {/* Skill Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                          <TechIcon 
                            name={skill} 
                            size={20} 
                            className="text-gray-600 dark:text-gray-400 mb-1 group-hover:text-gold transition-colors duration-300"
                          />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                            {skill}
                          </span>
                        </div>
                        
                        {/* Hover Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills */}
          <motion.div variants={itemVariants} className="mt-20 text-center">
            <h3 className="text-xl font-light mb-8 text-black dark:text-white">
              <ShinyText 
                text="Additional Expertise" 
                speed={4}
                className="text-xl font-light text-black dark:text-white"
              />
            </h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {additionalSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
                  }}
                  className="px-4 py-2 border border-gold/30 text-gold text-sm uppercase tracking-wider hover:bg-gold/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
                >
                  <TechIcon 
                    name={skill} 
                    size={16} 
                    className="text-gold"
                  />
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 