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
    document.title = 'Hemanth Saragadam | Senior Software Engineer | Full Stack Developer | Distributed Systems | Hire Top Engineer';
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
          Hemanth Saragadam is a Senior Software Engineer with 5+ years building full-stack and backend 
          platforms end to end, including API design, distributed systems, event-driven pipelines, cloud 
          infrastructure, CI/CD, and on-call ownership. Master's in Computer Science from Northeastern 
          University. AWS Certified Solutions Architect. HashiCorp Certified Terraform Associate.
        </p>
        <p>
          Currently Senior Software Engineer at Labs196 Innovations LLC. Previously at Northeastern 
          University, KYC Hub, and DocsTime. Expert in Java, Spring Boot, Node.js, Express, React, 
          Next.js, Angular, TypeScript, JavaScript, Python, C#, SQL.
        </p>
        <p>
          Architecture and Systems: Microservices, distributed systems, event-driven architecture, 
          domain-driven design, system design, API versioning, saga pattern, outbox pattern.
        </p>
        <p>
          Messaging and Pipelines: Kafka, idempotency, dead-letter queues, retries with backoff, 
          at-least-once processing, schema evolution.
        </p>
        <p>
          Cloud and DevOps: AWS (EKS, Lambda, SNS, S3, RDS), Docker, Kubernetes, Terraform, 
          Pulumi, Jenkins, GitHub Actions, CI/CD pipelines, infrastructure as code.
        </p>
        <p>
          Observability: OpenTelemetry, structured logging, metrics, tracing, dashboards, alerting, 
          SLIs, SLOs, incident response, burn-rate alerts, error budgets, chaos engineering.
        </p>
        <p>
          Databases: PostgreSQL, MySQL, Redis, DynamoDB, MongoDB. Security: OAuth2, OpenID Connect, 
          JWT, RBAC, secrets management. Testing: JUnit, Mockito, Jest, Cypress, Selenium, 
          integration testing, contract testing.
        </p>
        <p>
          Available for hire worldwide: Boston, New York, San Francisco, Seattle, Chicago, Austin, 
          Los Angeles, Denver, Atlanta, Washington DC, Dallas, Houston, Miami, Philadelphia, 
          London, Toronto, Singapore, Berlin, Amsterdam, Dublin, Remote.
        </p>
        <p>
          Open to roles: Senior Software Engineer, Staff Engineer, Principal Engineer, Lead Developer, 
          Technical Lead, Backend Engineer, Full Stack Developer, Cloud Architect, Solutions Architect, 
          DevOps Engineer, Site Reliability Engineer, Platform Engineer, Engineering Manager.
        </p>
        <p>
          Contact: hemanthdev31@gmail.com | +1 (510) 394-4615 | 
          LinkedIn: linkedin.com/in/hemanthsaragadam | GitHub: github.com/Hemanthsneu
        </p>
      </div>
      
      {/* Voice Agent */}
      <VoiceAgent />
    </div>
  );
}

export default App; 