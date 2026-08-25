export const resumeData = {
  name: "Shantanu Fadnavis",
  title: "ML Engineer — AI Quality & Test Automation",
  location: "Nagpur, India — 440010",
  phone: "+91-8010568963",
  email: "shantanufadnavis@protonmail.com",
  github: "https://github.com/Shanny-dot",
  githubLabel: "github.com/Shanny-dot",
  linkedin: "https://linkedin.com/in/shantanufadnavis",
  linkedinLabel: "linkedin.com/in/shantanufadnavis",

  tagline: "ML Engineer with hands-on QA experience — writing automated test scripts, validating APIs, and catching data/pipeline defects before they reach production.",

  summary: `ML Engineer with hands-on QA and test automation experience — writing automated test scripts, validating APIs, and catching data/pipeline defects before production. Pairs engineering-level Python skills with a tester's instinct for what breaks, backed by real-world experience building and stress-testing AI/data systems for an enterprise client.`,

  achievements: [
    "Delivered testing and validation coverage across ML pipelines and a client-facing analytics dashboard during a 4-month engineering internship at DataObserve.",
    "5 patents granted — 2 technical books and 1 research paper published (AI & Data Engineering).",
    "18+ public GitHub repositories."
  ],

  experience: [
    {
      role: "Machine Learning Engineer Intern — AI Systems & QA",
      company: "DataObserve",
      period: "Dec 2025 – Mar 2026",
      location: "Texas, United States (Remote)",
      mlBullets: [
        "Built ML models on Big Data infrastructure with API & LLM integration, powering scalable analytics for a US-based enterprise client.",
        "Designed and deployed an AI-powered real-time analytics dashboard for energy surveillance.",
        "Built end-to-end ETL pipelines using Snowflake and Databricks, improving data ingestion and processing efficiency."
      ],
      qaBullets: [
        "Reduced defects reaching production by writing automated test scripts (pytest) to cover ML pipeline outputs and dashboard data before each deployment.",
        "Validated API endpoints for correctness and reliability by building and running Postman test collections against the client-facing dashboard's API layer.",
        "Caught data quality issues before they reached the client by combining manual spot-testing with automated data/pipeline validation scripts.",
        "Logged bugs with clear repro steps and severity ratings by manually testing dashboard features and documenting issues for the engineering team."
      ]
    }
  ],

  projects: [
    {
      name: "SneakerHeadLM",
      tech: "Python, NLP, LLM",
      description: "Built full ML pipeline — preprocessing, training, and evaluation — including a custom evaluation suite to test model output quality against baseline benchmarks before considering it \"done.\""
    },
    {
      name: "SmallAnimeLM",
      tech: "Python, Transformer Models",
      description: "Designed a lightweight transformer-based language model; curated datasets and validated fine-tuning results against evaluation benchmarks."
    },
    {
      name: "Beautiful Story Generator",
      tech: "TypeScript, AI App",
      description: "Built a full-stack AI narrative-generation app; integrated APIs and prompt engineering, and manually tested structured outputs for consistency and correctness."
    }
  ],

  education: {
    degree: "B.Tech, Computer Science Engineering (Gaming Technology)",
    institution: "Vellore Institute of Technology (VIT) Bhopal",
    expected: "June 2027",
    cgpa: "8.5 / 10"
  },

  certifications: [
    "Claude 101 & MCP Server Course",
    "Prompt Engineering — DeepLearning.AI",
    "Google AI Essentials",
    "AWS Cloud Certification (Foundations)",
    "Python & ML — FreeCodeCamp",
    "SQL & MongoDB — Oracle"
  ],

  skills: {
    testing_qa: ["Manual & Automated Testing", "Pytest", "Postman / API Testing", "Data & Pipeline Validation", "Bug Reporting & Triage", "Regression Testing"],
    ml_ai: ["Deep Learning", "NLP", "LLMs", "Prompt Engineering", "Model Deployment & Evaluation"],
    data_engineering: ["ETL Pipelines", "Data Modelling", "Snowflake", "Databricks", "Apache Spark"],
    programming: ["Python", "Java", "SQL", "TypeScript"],
    databases: ["MySQL", "PostgreSQL", "MongoDB"],
    cloud_devops: ["AWS", "Azure ML", "Docker", "Git", "Linux"]
  }
};

export const downloadResumeText = () => {
  const r = resumeData;
  const content = `================================================================================
${r.name.toUpperCase()}
${r.title}
${r.location}  |  ${r.phone}  |  ${r.email}  |  ${r.githubLabel}
================================================================================

PROFESSIONAL SUMMARY
${r.summary}

KEY ACHIEVEMENTS
${r.achievements.map(a => `• ${a}`).join('\n')}

CORE SKILLS
Testing & QA: ${r.skills.testing_qa.join(', ')}
ML & AI: ${r.skills.ml_ai.join(', ')}
Data Engineering: ${r.skills.data_engineering.join(', ')}
Programming: ${r.skills.programming.join(', ')}
Databases: ${r.skills.databases.join(', ')}
Cloud & DevOps: ${r.skills.cloud_devops.join(', ')}

PROFESSIONAL EXPERIENCE

${r.experience[0].role}
${r.experience[0].company}  |  ${r.experience[0].period}  |  ${r.experience[0].location}

ML Engineering & Data Pipelines
${r.experience[0].mlBullets.map(b => `• ${b}`).join('\n')}

QA & Testing
${r.experience[0].qaBullets.map(b => `• ${b}`).join('\n')}

PROJECTS
${r.projects.map(p => `• ${p.name} (${p.tech})\n  ${p.description}`).join('\n')}

EDUCATION
${r.education.degree}
${r.education.institution}
Expected ${r.education.expected}  |  CGPA: ${r.education.cgpa}

CERTIFICATIONS
${r.certifications.map(c => `• ${c}`).join('\n')}

--------------------------------------------------------------------------------
Generated: ${new Date().toLocaleDateString('en-IN')}
--------------------------------------------------------------------------------`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Shantanu_Fadnavis_QA_Resume.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
