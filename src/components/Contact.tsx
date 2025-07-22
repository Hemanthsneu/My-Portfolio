import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import ScrambledText from './ScrambledText';
import ShinyText from './ShinyText';
import ProfileCard from './ProfileCard';

const Contact: React.FC = () => {
  const handleContactClick = () => {
    // Scroll to contact section or open email
    window.location.href = 'mailto:hemanthsaragadam.dev@gmail.com';
  };

  // Create a placeholder avatar using initials
  const placeholderAvatar = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23000"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="60" font-weight="600" fill="%23FFD700">HS</text></svg>`;

  // Icon pattern
  const iconPattern = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="transparent"/><circle cx="50" cy="50" r="2" fill="%23FFD700" opacity="0.3"/></svg>`;

  // Grain texture
  const grainTexture = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="noiseFilter"><feTurbulence type="turbulence" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.02"/></svg>`;

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hemanthsaragadam.dev@gmail.com",
      href: "mailto:hemanthsaragadam.dev@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1(857)-313-2694",
      href: "tel:+18573132694"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Boston, Massachusetts",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      href: "https://github.com/Hemanthsneu",
      color: "hover:bg-gray-800"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://linkedin.com/in/hemanths31/",
      color: "hover:bg-blue-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin mb-4 text-black dark:text-white">
              <ShinyText 
                text="Get In Touch" 
                speed={3}
                className="text-4xl md:text-5xl font-thin text-black dark:text-white"
              />
            </h2>
            <div className="w-24 h-px bg-gold mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? 
              I'd love to hear from you. Let's create something amazing together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-light text-black dark:text-white mb-6">
                  Let's Connect
                </h3>
                <div className="mb-8 flex justify-center">
                  <ScrambledText
                    radius={100}
                    duration={0.4}
                    speed={0.2}
                    scrambleChars=".:"
                    className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed text-center m-0 max-w-full font-light"
                    style={{ 
                      margin: 0,
                      maxWidth: '100%',
                    }}
                  >
                    I'm always open to discussing new opportunities, interesting projects, or just having a conversation about technology and innovation. Feel free to reach out!
                  </ScrambledText>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="cursor-target flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-800 hover:border-gold/50 bg-white dark:bg-black transition-all duration-200 group"
                  >
                    <div className="p-3 border border-gold/30 text-gold group-hover:bg-gold/10 transition-colors duration-200">
                      <info.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-light text-black dark:text-white">{info.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-light text-black dark:text-white">Connect on Social</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`p-3 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gold hover:text-gold transition-all duration-200`}
                      aria-label={social.name}
                    >
                      <social.icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Profile Card */}
            <motion.div 
              variants={itemVariants}
              className="w-full max-w-md mx-auto"
            >
              <ProfileCard
                avatarUrl={placeholderAvatar}
                iconUrl={iconPattern}
                grainUrl={grainTexture}
                name="Hemanth Saragadam"
                title="Senior Software Engineer"
                handle="hemanthsneu"
                status="Available for hire"
                contactText="Get in Touch"
                showUserInfo={true}
                onContactClick={handleContactClick}
                className="mx-auto"
                enableTilt={true}
                miniAvatarUrl={placeholderAvatar}
                behindGradient="radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(51,100%,50%,var(--card-opacity)) 4%,hsla(51,100%,50%,calc(var(--card-opacity)*0.75)) 10%,hsla(51,50%,40%,calc(var(--card-opacity)*0.5)) 50%,hsla(51,0%,30%,0) 100%),radial-gradient(35% 52% at 55% 20%,#FFD70080 0%,#FFD70000 100%),radial-gradient(100% 100% at 50% 50%,#FFD700FF 1%,#FFD70000 76%),conic-gradient(from 124deg at 50% 50%,#FFD700FF 0%,#FFA500FF 40%,#FFA500FF 60%,#FFD700FF 100%)"
                innerGradient="linear-gradient(145deg,#1a1a1a8c 0%,#FFD70044 100%)"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 