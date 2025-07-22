import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import ShinyText from './ShinyText';
import CircularGallery from './CircularGallery';

const Projects: React.FC = () => {

  const featuredProjects = [
    {
      id: 1,
      title: "Tokenization Platform",
      description: "Enterprise-grade tokenization platform implementing multiple ERC standards including ERC-3643 for security tokens, ERC-1404 for restricted tokens, and traditional ERC-20/721 for fungible and non-fungible assets.",
      longDescription: "Developed a comprehensive blockchain tokenization platform supporting multiple token standards. Implemented smart contracts for ERC-3643 (T-REX protocol) for compliant security tokens, ERC-1404 for restricted token transfers, and traditional ERC-20/721 standards. Built using Solidity, Ethers.js, and Web3.js with deployment capabilities for both EVM and non-EVM based chains.",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop",
      technologies: ["Solidity", "Ethers.js", "Web3.js", "React", "Node.js", "Smart Contracts"],
      github: "https://github.com/Hemanthsneu",
      live: "",
      highlights: [
        "Multiple ERC standard implementations",
        "Compliance and KYC integration",
        "Cross-chain deployment capability",
        "Gas-optimized smart contracts"
      ]
    },
    {
      id: 2,
      title: "Geo-Anonymous Chat App",
      description: "iOS application allowing anonymous users within a specific geographic radius to chat in real time. Features secure messaging protocols, push notifications, and an intuitive user interface.",
      longDescription: "Developed a location-based anonymous chat application leveraging CoreLocation for accurate geographic communication. Implemented secure, anonymous user authentication and chat management using Firebase with real-time data synchronization. Designed an intuitive and visually appealing user interface using UIKit, focusing on smooth interactions and accessibility.",
      image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop",
      technologies: ["iOS", "Swift", "Firebase", "CoreLocation", "UIKit"],
      github: "https://github.com/Hemanthsneu",
      live: "",
      highlights: [
        "Real-time location-based chat functionality",
        "Secure anonymous authentication",
        "Push notifications for message alerts",
        "Optimized UI for seamless chat experience"
      ]
    },
    {
      id: 3,
      title: "Assignment Management System",
      description: "Full-stack web application for managing academic assignments with role-based access control, automated processing, and comprehensive notification system.",
      longDescription: "Engineered a comprehensive Assignment Management System using Node.js and RESTful APIs. Utilized Sequelize ORM for secure data storage with role-based access control. Integrated AWS services including SNS for alerts and Lambda for automated submission processing, with Pulumi for Infrastructure as Code.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      technologies: ["Node.js", "AWS", "Pulumi", "Sequelize", "RESTful APIs"],
      github: "https://github.com/Hemanthsneu",
      live: "",
      highlights: [
        "RESTful API architecture",
        "AWS Lambda automated processing",
        "Role-based access control",
        "Real-time notifications via SNS"
      ]
    },
    {
      id: 4,
      title: "Healthcare PWA Platform",
      description: "Progressive Web Application for healthcare providers with offline support, push notifications, and real-time referral analytics.",
      longDescription: "Converted an Angular-based website into a scalable Progressive Web Application with offline support and enhanced caching mechanisms. Built CI/CD pipeline using Jenkins, reducing release times by 40%. Leveraged Redis for caching and AWS Lambda for real-time referral analytics to support high-volume traffic.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
      technologies: ["Angular", "PWA", "Jenkins", "Redis", "AWS Lambda"],
      github: "https://github.com/Hemanthsneu",
      live: "",
      highlights: [
        "40% reduction in release times",
        "Offline support and push notifications",
        "Real-time analytics dashboard",
        "High-volume traffic optimization"
      ]
    },
  ];

  const otherProjects = [
    {
      title: "DeFi Yield Aggregator",
      description: "Smart contract system for optimizing yield farming strategies across multiple DeFi protocols with automated rebalancing.",
      technologies: ["Solidity", "Hardhat", "Ethers.js"],
      github: "https://github.com/Hemanthsneu",
      image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=600&h=400&fit=crop"
    },
    {
      title: "NFT Marketplace",
      description: "Decentralized marketplace for trading NFTs with royalty distribution and multi-chain support.",
      technologies: ["ERC-721", "IPFS", "Web3.js"],
      github: "https://github.com/Hemanthsneu",
      image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=600&h=400&fit=crop"
    },
    {
      title: "KYC Compliance Platform",
      description: "Responsive compliance tools for identity verification and fraud detection with optimized performance.",
      technologies: ["Angular", "Spring Boot", "REST APIs"],
      github: "https://github.com/Hemanthsneu",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
    },
    {
      title: "Real-time Financial Dashboard",
      description: "Interactive dashboards for institutional investors with GraphQL APIs and automated testing.",
      technologies: ["React", "GraphQL", "TypeScript"],
      github: "https://github.com/Hemanthsneu",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "Cross-Chain Bridge",
      description: "Blockchain bridge enabling seamless asset transfers between different blockchain networks.",
      technologies: ["Solidity", "Go", "Rust"],
      github: "https://github.com/Hemanthsneu",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop"
    },
    {
      title: "Microservices Platform",
      description: "Scalable microservices architecture with service mesh, distributed tracing, and container orchestration.",
      technologies: ["Kubernetes", "Docker", "Istio"],
      github: "https://github.com/Hemanthsneu",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop"
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
              Showcasing my latest work in blockchain, mobile, and cloud technologies
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