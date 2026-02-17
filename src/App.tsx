import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TargetCursor from './components/TargetCursor';
import VoiceAgent from './components/VoiceAgent';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  useEffect(() => {
    document.title = 'Hemanth Saragadam | Senior Software Engineer & Full Stack Developer | Hire Top Engineer';
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-black transition-colors">
      {/* Custom Cursor */}
      <TargetCursor />
      
      {/* Dark Mode Toggle */}
      <DarkModeToggle />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />

      {/* SEO Content - visually hidden but crawlable */}
      <div className="sr-only" aria-hidden="true" role="complementary">
        <h2>Hire Hemanth Saragadam - Senior Software Engineer</h2>
        <p>
          Hemanth Saragadam is a Senior Software Engineer, Full Stack Developer, Blockchain Developer, 
          iOS Developer, and Cloud Architect with 5+ years of professional experience. He holds a 
          Master's degree in Computer Science from Northeastern University, Boston, MA.
        </p>
        <p>
          Currently working at Labs196 Innovations LLC (RealProton) as Senior Software Engineer. 
          Previously worked at Northeastern University, KYC Hub, and DocsTime. 
          Expert in React, Node.js, TypeScript, JavaScript, Python, Go, Golang, Rust, Java, C++, 
          Swift, Solidity, Angular, Next.js, Vue.js, Spring Boot, Django, ASP.NET, Express.js.
        </p>
        <p>
          Cloud and DevOps expertise: AWS, GCP, Azure, Docker, Kubernetes, Jenkins, Terraform, Pulumi, 
          AWS Lambda, Serverless Architecture, CI/CD pipelines.
        </p>
        <p>
          Blockchain and Web3 specialist: Ethereum, Solidity Smart Contracts, ERC-20, ERC-721, 
          ERC-3643, ERC-1404, Tokenization, DeFi, NFTs, Web3.js, Ethers.js.
        </p>
        <p>
          Database expertise: PostgreSQL, MySQL, MongoDB, Redis, DynamoDB, Snowflake, Neo4j.
        </p>
        <p>
          Available for hire worldwide: Boston, New York, San Francisco, Seattle, Chicago, Austin, 
          Los Angeles, Denver, Atlanta, Washington DC, Dallas, Houston, Miami, Philadelphia, 
          Phoenix, Portland, Raleigh, Charlotte, Minneapolis, Detroit, London, Toronto, Singapore, 
          Berlin, Amsterdam, Dublin, Bangalore, Hyderabad, Remote.
        </p>
        <p>
          Open to roles: Senior Software Engineer, Staff Engineer, Principal Engineer, Lead Developer, 
          Technical Lead, Engineering Manager, Full Stack Developer, Frontend Developer, Backend Developer, 
          Blockchain Developer, Smart Contract Developer, iOS Developer, Mobile Developer, Cloud Architect, 
          Solutions Architect, DevOps Engineer, Site Reliability Engineer, Platform Engineer.
        </p>
        <p>
          Contact: hemanthsaragadam.dev@gmail.com | +1(857)-313-2694 | 
          LinkedIn: linkedin.com/in/hemanthsaragadam | GitHub: github.com/Hemanthsneu
        </p>
      </div>
      
      {/* Voice Agent */}
      <VoiceAgent />
    </div>
  );
}

export default App; 