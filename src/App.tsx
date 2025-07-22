import React from 'react';
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
      
      {/* Voice Agent */}
      <VoiceAgent />
    </div>
  );
}

export default App; 