import React from 'react';
import { 
  SiSwift, SiJavascript, SiTypescript, SiPython, SiGo, SiSharp, SiRust, SiCplusplus,
  SiReact, SiAngular, SiNextdotjs, SiNodedotjs, SiSpringboot, SiExpress, SiVuedotjs, SiDjango, SiDotnet,
  SiFirebase, SiPostgresql, SiMysql, SiMongodb, SiRedis, SiSnowflake, SiNeo4J,
  SiAmazon, SiDocker, SiKubernetes, SiGooglecloud, SiJenkins, SiTerraform,
  SiGraphql, SiWebrtc, SiThreedotjs, SiD3Dotjs, SiJest, SiCypress, SiSelenium, SiApachekafka, 
  SiJira, SiGithub, SiNginx, SiSwagger, SiPulumi,
  SiIos, SiEthereum, SiSolidity, SiWeb3Dotjs
} from 'react-icons/si';
import { 
  FaDatabase, FaCode, FaServer, FaCloud, FaJava, FaObjectGroup, FaAws, FaCoins, FaCubes
} from 'react-icons/fa';
import {
  TbApi, TbBrandReactNative, TbServerBolt
} from 'react-icons/tb';
import {
  BsCloudFill
} from 'react-icons/bs';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

const TechIcon: React.FC<TechIconProps> = ({ name, className = "", size = 24 }) => {
  const iconMap: Record<string, any> = {
    // Languages
    'Swift': SiSwift,
    'Java': FaJava,
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'Python': SiPython,
    'GO': SiGo,
    'C#': SiSharp,
    'Rust': SiRust,
    'C++': SiCplusplus,
    'Solidity': SiSolidity,
    
    // Web Technologies
    'React': SiReact,
    'Angular': SiAngular,
    'Next.js': SiNextdotjs,
    'Node.js': SiNodedotjs,
    'Spring Boot': SiSpringboot,
    'Express': SiExpress,
    'Vue': SiVuedotjs,
    'Django': SiDjango,
    'ASP.NET': SiDotnet,
    
    // iOS Development
    'UIKit': SiIos,
    'CoreData': FaDatabase,
    'CoreLocation': SiIos,
    'Firebase': SiFirebase,
    'Objective-C': FaObjectGroup,
    
    // Databases
    'PostgreSQL': SiPostgresql,
    'MySQL': SiMysql,
    'MongoDB': SiMongodb,
    'Redis': SiRedis,
    'DynamoDB': FaDatabase,
    'Snowflake': SiSnowflake,
    'Neo4j': SiNeo4J,
    
    // Cloud & DevOps
    'AWS': FaAws,
    'Docker': SiDocker,
    'Kubernetes': SiKubernetes,
    'GCP': SiGooglecloud,
    'Jenkins': SiJenkins,
    'Terraform': SiTerraform,
    'Azure': BsCloudFill,
    
    // Blockchain
    'Ethereum': SiEthereum,
    'Ethers.js': SiEthereum,
    'Web3.js': SiWeb3Dotjs,
    'Smart Contracts': FaCubes,
    'Tokenization': FaCoins,
    'ERC-20': SiEthereum,
    'ERC-721': SiEthereum,
    'ERC-3643': SiEthereum,
    'ERC-1404': SiEthereum,
    'EVM': SiEthereum,
    'Non-EVM': FaCubes,
    'Web3 Integration': SiWeb3Dotjs,
    'DeFi': FaCoins,
    'NFTs': SiEthereum,
    'Smart Contract Auditing': FaCubes,
    
    // Additional Skills
    'GraphQL': SiGraphql,
    'REST APIs': TbApi,
    'WebRTC': SiWebrtc,
    'gRPC': TbServerBolt,
    'Three.js': SiThreedotjs,
    'D3.js': SiD3Dotjs,
    'Jest': SiJest,
    'Cypress': SiCypress,
    'Selenium': SiSelenium,
    'TDD': FaCode,
    'Kafka': SiApachekafka,
    'WebSockets': FaServer,
    'Jira': SiJira,
    'GitHub': SiGithub,
    'Nginx': SiNginx,
    'Swagger': SiSwagger,
    'Pulumi': SiPulumi,
    'AWS Lambda': FaAws,
  };

  const Icon = iconMap[name] || FaCode;
  
  // TypeScript workaround for React 19 compatibility
  return React.createElement(Icon, { size, className });
};

export default TechIcon; 