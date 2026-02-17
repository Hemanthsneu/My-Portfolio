import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CurvedLoop from './CurvedLoop';
import ShinyText from './ShinyText';

const Hero: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/Hemanth_Saragadam_AM (1).pdf`;
    link.download = 'Hemanth_Saragadam_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-white dark:bg-black overflow-hidden transition-colors"
    >
      {/* Minimalist background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 text-6xl text-gold opacity-10 animate-pulse-subtle">✦</div>
        <div className="absolute bottom-20 right-20 text-8xl text-gold opacity-10 animate-float">✦</div>
        <div className="absolute top-1/2 left-1/3 text-4xl text-gold opacity-5 animate-pulse-subtle">✦</div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 lg:px-12 py-16 z-10"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-5xl md:text-7xl font-thin mt-4 tracking-wider text-black dark:text-white">
              <ShinyText 
                text="HEMANTH SARAGADAM" 
                speed={3}
                className="text-5xl md:text-7xl font-thin tracking-wider text-black dark:text-white"
              />
            </h1>
            <span className="sr-only">Hemanth Saragadam - Senior Software Engineer, Full Stack Developer, iOS Developer, Blockchain Specialist, Cloud Architect. Available for hire. Based in Boston, MA. Master's in Computer Science from Northeastern University.</span>
          </motion.div>

          {/* Roles with Curved Loop Animation */}
          <motion.div
            variants={itemVariants}
            className="mb-12 relative w-full max-w-5xl mx-auto h-32"
            role="marquee"
            aria-label="Professional roles: Senior Software Engineer, Full-Stack Developer, iOS Developer, Blockchain Specialist, Cloud Architect"
          >
            <CurvedLoop 
              marqueeText="SENIOR SOFTWARE ENGINEER ✦ FULL-STACK DEVELOPER ✦ iOS DEVELOPER ✦ BLOCKCHAIN SPECIALIST ✦ CLOUD ARCHITECT ✦ "
              speed={2}
              className="fill-gold dark:fill-gold-light"
              curveAmount={30}
              direction="left"
              interactive={true}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            <ShinyText 
              text="Crafting elegant digital experiences" 
              speed={4}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-light"
            />
            <span className="text-gray-700 dark:text-gray-300"> with precision and purpose.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a
              href="#projects"
              className="btn-minimal"
            >
              View Work
            </a>
            <button
              onClick={downloadResume}
              className="btn-gold"
            >
              Download Resume
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-px bg-gray-400 dark:bg-gray-600"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 