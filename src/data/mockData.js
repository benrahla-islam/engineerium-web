// Mock data for Engineerium magazine

export const authors = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    bio: "Professor of Artificial Intelligence and Machine Learning at RE2SD Engineering. Specializes in neural networks and deep learning applications in engineering systems.",
    profileImage: "S",
    specialization: "AI & Machine Learning",
    email: "s.mitchell@re2sd.edu"
  },
  {
    id: 2,
    name: "Ahmed Ben Rahma",
    bio: "PhD candidate in Robotics Engineering. Research focuses on autonomous systems and human-robot interaction in industrial environments.",
    profileImage: "A",
    specialization: "Robotics",
    email: "a.benrahma@re2sd.edu"
  },
  {
    id: 3,
    name: "Dr. Maria Santos",
    bio: "Associate Professor of Software Engineering. Expert in software architecture, distributed systems, and cloud computing technologies.",
    profileImage: "M",
    specialization: "Software Engineering",
    email: "m.santos@re2sd.edu"
  },
  {
    id: 4,
    name: "Omar Khalil",
    bio: "Master's student in Cybersecurity. Research interests include network security, cryptography, and secure software development.",
    profileImage: "O",
    specialization: "Cybersecurity",
    email: "o.khalil@re2sd.edu"
  },
  {
    id: 5,
    name: "Dr. Jennifer Lee",
    bio: "Professor of Data Science and Analytics. Focuses on big data processing, statistical modeling, and data visualization techniques.",
    profileImage: "J",
    specialization: "Data Science",
    email: "j.lee@re2sd.edu"
  }
];

export const issues = [
  {
    id: 1,
    title: "AI Revolution in Engineering",
    date: "2025-05-01",
    description: "Exploring how artificial intelligence is transforming traditional engineering practices and opening new possibilities for innovation.",
    coverImage: "A",
    pdfPath: "/pdfs/Engineerium_May_2025.pdf",
    articleCount: 4
  },
  {
    id: 2,
    title: "Sustainable Technology Solutions",
    date: "2025-03-01",
    description: "Examining cutting-edge sustainable technologies and their impact on environmental engineering and green energy systems.",
    coverImage: "S",
    pdfPath: "/pdfs/Engineerium_March_2025.pdf",
    articleCount: 5
  },
  {
    id: 3,
    title: "The Future of Robotics",
    date: "2025-01-01",
    description: "Investigating the latest developments in robotics, automation, and their applications across various engineering disciplines.",
    coverImage: "R",
    pdfPath: "/pdfs/Engineerium_January_2025.pdf",
    articleCount: 3
  }
];

export const articles = [
  // Issue 1 articles
  {
    id: 1,
    title: "Machine Learning Applications in Structural Engineering",
    excerpt: "Discover how ML algorithms are revolutionizing structural analysis and predictive maintenance in civil engineering projects.",
    content: `
# Machine Learning Applications in Structural Engineering

Machine learning is transforming the field of structural engineering by providing powerful tools for analysis, prediction, and optimization. This article explores the current applications and future potential of ML in structural engineering.

## Introduction

Traditional structural engineering relies heavily on mathematical models and empirical formulas. However, the integration of machine learning algorithms has opened new possibilities for more accurate predictions and innovative design approaches.

## Current Applications

### Predictive Maintenance
Machine learning models can analyze sensor data from structures to predict when maintenance is needed, reducing costs and preventing failures.

### Structural Health Monitoring
ML algorithms process data from various sensors to continuously monitor the health of bridges, buildings, and other structures.

### Design Optimization
Neural networks can optimize structural designs by considering multiple variables simultaneously, leading to more efficient and cost-effective solutions.

## Case Studies

Recent implementations have shown promising results in bridge monitoring systems and earthquake-resistant building design.

## Conclusion

The future of structural engineering lies in the seamless integration of machine learning technologies with traditional engineering principles.
    `,
    authorId: 1,
    issueId: 1,
    publishDate: "2025-05-01",
    readTime: "8 min read",
    category: "AI"
  },
  {
    id: 2,
    title: "Neural Networks for Predictive Maintenance",
    excerpt: "Learn how neural networks are being used to predict equipment failures before they occur, saving costs and improving safety.",
    content: `
# Neural Networks for Predictive Maintenance

Predictive maintenance using neural networks represents a paradigm shift from reactive to proactive maintenance strategies in engineering systems.

## Overview

This article examines how neural networks are being implemented across various industries to predict equipment failures and optimize maintenance schedules.

## Technical Implementation

### Data Collection
The foundation of any predictive maintenance system is comprehensive data collection from sensors, operational logs, and maintenance records.

### Network Architecture
Deep neural networks with LSTM layers are particularly effective for time-series analysis in maintenance prediction.

## Benefits and Challenges

While the benefits are substantial, implementing these systems requires careful consideration of data quality, model selection, and integration with existing systems.

## Future Outlook

The integration of IoT devices with neural networks promises even more sophisticated predictive maintenance solutions.
    `,
    authorId: 1,
    issueId: 1,
    publishDate: "2025-05-01",
    readTime: "6 min read",
    category: "AI"
  },
  {
    id: 3,
    title: "Autonomous Systems in Industrial Settings",
    excerpt: "Exploring the implementation of autonomous robotics systems in manufacturing and industrial environments.",
    content: `
# Autonomous Systems in Industrial Settings

The deployment of autonomous systems in industrial environments is reshaping manufacturing processes and operational efficiency.

## Introduction

This comprehensive analysis covers the current state and future prospects of autonomous systems in various industrial applications.

## Key Technologies

### Computer Vision
Advanced computer vision systems enable robots to navigate complex industrial environments and perform precise tasks.

### Decision Making Algorithms
Sophisticated algorithms allow autonomous systems to make real-time decisions based on environmental conditions and operational requirements.

## Implementation Challenges

Deploying autonomous systems requires addressing safety concerns, integration with existing infrastructure, and workforce adaptation.

## Success Stories

Several manufacturing companies have successfully implemented autonomous systems, resulting in improved efficiency and reduced operational costs.
    `,
    authorId: 2,
    issueId: 1,
    publishDate: "2025-05-01",
    readTime: "10 min read",
    category: "Robotics"
  },
  {
    id: 4,
    title: "Software Architecture for AI Systems",
    excerpt: "Understanding the architectural patterns and design principles essential for building robust AI-powered software systems.",
    content: `
# Software Architecture for AI Systems

Building robust AI systems requires careful consideration of software architecture patterns and design principles that can handle the unique challenges of machine learning workloads.

## Architectural Patterns

### Microservices Architecture
Breaking down AI systems into microservices allows for better scalability and maintainability of individual components.

### Event-Driven Architecture
Event-driven patterns are particularly useful for real-time AI systems that need to respond to data streams.

## Design Principles

### Scalability
AI systems must be designed to handle varying computational loads and data volumes.

### Monitoring and Observability
Comprehensive monitoring is essential for maintaining AI system performance and detecting model drift.

## Best Practices

This section covers industry best practices for designing, implementing, and maintaining AI software systems.
    `,
    authorId: 3,
    issueId: 1,
    publishDate: "2025-05-01",
    readTime: "7 min read",
    category: "Software"
  },
  
  // Issue 2 articles
  {
    id: 5,
    title: "Green Energy Storage Solutions",
    excerpt: "Innovative approaches to energy storage that support sustainable power generation and distribution systems.",
    content: `
# Green Energy Storage Solutions

Energy storage is crucial for the widespread adoption of renewable energy sources. This article explores innovative storage technologies and their environmental impact.

## Current Technologies

### Battery Technologies
Advanced lithium-ion and emerging solid-state batteries are improving energy density and reducing environmental impact.

### Mechanical Storage
Pumped hydro storage and compressed air energy storage offer large-scale solutions for grid-level energy storage.

## Environmental Considerations

Sustainable energy storage must consider the entire lifecycle of storage systems, from manufacturing to disposal.

## Future Innovations

Research into new materials and storage methods promises even more efficient and environmentally friendly solutions.
    `,
    authorId: 5,
    issueId: 2,
    publishDate: "2025-03-01",
    readTime: "9 min read",
    category: "Energy"
  },
  {
    id: 6,
    title: "Sustainable Manufacturing Processes",
    excerpt: "How modern manufacturing is adopting sustainable practices to reduce environmental impact while maintaining efficiency.",
    content: `
# Sustainable Manufacturing Processes

Manufacturing industries are increasingly adopting sustainable practices to reduce their environmental footprint while maintaining competitiveness.

## Sustainable Practices

### Waste Reduction
Implementing lean manufacturing principles and circular economy concepts to minimize waste generation.

### Energy Efficiency
Adopting energy-efficient equipment and renewable energy sources in manufacturing facilities.

## Technology Integration

Advanced technologies like IoT sensors and AI analytics help optimize resource usage and reduce environmental impact.

## Case Studies

Real-world examples demonstrate successful implementation of sustainable manufacturing practices across different industries.
    `,
    authorId: 3,
    issueId: 2,
    publishDate: "2025-03-01",
    readTime: "8 min read",
    category: "Manufacturing"
  },
  
  // Issue 3 articles
  {
    id: 7,
    title: "Human-Robot Collaboration in Manufacturing",
    excerpt: "Examining how humans and robots work together in modern manufacturing environments to improve productivity and safety.",
    content: `
# Human-Robot Collaboration in Manufacturing

The future of manufacturing lies in effective collaboration between humans and robots, combining human creativity with robotic precision and endurance.

## Collaborative Robotics

### Safety Systems
Advanced safety systems ensure that humans and robots can work safely in shared workspaces.

### Task Allocation
Optimal task allocation between humans and robots maximizes the strengths of both while minimizing weaknesses.

## Implementation Strategies

Successful human-robot collaboration requires careful planning, training, and adaptation of existing workflows.

## Benefits and Challenges

While collaboration offers significant benefits, it also presents challenges in terms of integration and worker acceptance.
    `,
    authorId: 2,
    issueId: 3,
    publishDate: "2025-01-01",
    readTime: "7 min read",
    category: "Robotics"
  },
  {
    id: 8,
    title: "Security in Automated Systems",
    excerpt: "Addressing cybersecurity challenges in increasingly automated industrial and infrastructure systems.",
    content: `
# Security in Automated Systems

As automation becomes more prevalent, ensuring the security of automated systems against cyber threats becomes increasingly critical.

## Security Challenges

### Attack Vectors
Understanding the various ways that automated systems can be compromised and the potential impact of such attacks.

### Vulnerability Assessment
Regular assessment of system vulnerabilities and implementation of appropriate security measures.

## Protection Strategies

### Defense in Depth
Implementing multiple layers of security to protect against various types of attacks.

### Continuous Monitoring
Real-time monitoring and threat detection systems help identify and respond to security incidents quickly.

## Best Practices

Industry best practices for securing automated systems and maintaining operational integrity.
    `,
    authorId: 4,
    issueId: 3,
    publishDate: "2025-01-01",
    readTime: "6 min read",
    category: "Security"
  }
];

// Helper functions
export const getIssueById = (id) => {
  return issues.find(issue => issue.id === parseInt(id));
};

export const getArticleById = (id) => {
  return articles.find(article => article.id === parseInt(id));
};

export const getAuthorById = (id) => {
  return authors.find(author => author.id === parseInt(id));
};

export const getArticlesByIssue = (issueId) => {
  return articles.filter(article => article.issueId === parseInt(issueId));
};

export const getArticlesByAuthor = (authorId) => {
  return articles.filter(article => article.authorId === parseInt(authorId));
};

export const getIssuesByAuthor = (authorId) => {
  const authorArticles = getArticlesByAuthor(authorId);
  const issueIds = [...new Set(authorArticles.map(article => article.issueId))];
  return issues.filter(issue => issueIds.includes(issue.id));
};