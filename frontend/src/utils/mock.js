// src/utils/mock.js

// Mock data for Resume Builder
export const mockResumeData = {
  personalInfo: {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarahjohnson',
    website: 'sarahjohnson.dev',
    profilePhoto: null
  },
  summary: 'Results-driven Full Stack Developer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies. Passionate about creating efficient, user-centric solutions that drive business growth.',
  workExperience: [
    {
      id: 'exp_1',
      position: 'Senior Full Stack Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      startDate: '2021-06',
      endDate: '',
      current: true,
      description: 'Lead development of cloud-based SaaS platform serving 10,000+ users. Architected microservices infrastructure reducing response time by 40%. Mentor junior developers and conduct code reviews.'
    },
    {
      id: 'exp_2',
      position: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: '2019-03',
      endDate: '2021-05',
      current: false,
      description: 'Built and maintained RESTful APIs and React-based dashboards. Implemented CI/CD pipeline reducing deployment time by 60%. Collaborated with cross-functional teams to deliver features on schedule.'
    }
  ],
  education: [
    {
      id: 'edu_1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California',
      location: 'Berkeley, CA',
      graduationDate: '2019-05',
      gpa: '3.8'
    }
  ],
  skills: [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'FastAPI',
    'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Git',
    'REST APIs', 'GraphQL', 'CI/CD', 'Agile/Scrum'
  ],
  projects: [
    {
      id: 'proj_1',
      name: 'E-Commerce Platform',
      description: 'Built a full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Achieved 99.9% uptime and handled 50K+ transactions.',
      technologies: 'React, Node.js, MongoDB, Stripe',
      link: 'github.com/sarah/ecommerce'
    },
    {
      id: 'proj_2',
      name: 'AI Content Generator',
      description: 'Developed an AI-powered content generation tool using GPT API. Implemented caching and rate limiting for optimal performance.',
      technologies: 'React, Python, OpenAI API, Redis',
      link: 'github.com/sarah/ai-content'
    }
  ],
  certifications: [
    {
      id: 'cert_1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-08'
    },
    {
      id: 'cert_2',
      name: 'Professional Scrum Master (PSM I)',
      issuer: 'Scrum.org',
      date: '2022-11'
    }
  ],
  languages: [
    { id: 'lang_1', name: 'English', proficiency: 'Native' },
    { id: 'lang_2', name: 'Spanish', proficiency: 'Professional Working' }
  ],
  achievements: 'Led a team of 5 developers to deliver a critical product feature 2 weeks ahead of schedule, resulting in 15% increase in user engagement.',
  interests: 'Open source contributions, hiking, photography, and reading technical blogs'
};

// Template preview data
export const templateData = {
  modern: {
    name: 'Modern Professional',
    description: 'Clean layout with subtle accent colors',
    colorScheme: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#3b82f6'
    }
  },
  classic: {
    name: 'Classic Traditional',
    description: 'Timeless design for conservative industries',
    colorScheme: {
      primary: '#1e293b',
      secondary: '#475569',
      accent: '#334155'
    }
  },
  minimal: {
    name: 'Minimal Clean',
    description: 'Simple and elegant with maximum readability',
    colorScheme: {
      primary: '#0f172a',
      secondary: '#64748b',
      accent: '#475569'
    }
  },
  executive: {
    name: 'Executive Premium',
    description: 'Sophisticated layout for senior positions',
    colorScheme: {
      primary: '#1e293b',
      secondary: '#475569',
      accent: '#334155'
    }
  },
  creative: {
    name: 'Creative Modern',
    description: 'Bold design for creative professionals',
    colorScheme: {
      primary: '#7c3aed',
      secondary: '#8b5cf6',
      accent: '#a78bfa'
    }
  },
  technical: {
    name: 'Technical Pro',
    description: 'Optimized for technical roles and IT professionals',
    colorScheme: {
      primary: '#0f172a',
      secondary: '#334155',
      accent: '#475569'
    }
  }
};

// Proficiency levels for languages
export const proficiencyLevels = [
  'Native',
  'Fluent',
  'Professional Working',
  'Limited Working',
  'Elementary'
];

// Month names for date formatting
export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Default form field values
export const defaultFormValues = {
  workExperience: {
    id: '',
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  },
  education: {
    id: '',
    degree: '',
    institution: '',
    location: '',
    graduationDate: '',
    gpa: ''
  },
  project: {
    id: '',
    name: '',
    description: '',
    technologies: '',
    link: ''
  },
  certification: {
    id: '',
    name: '',
    issuer: '',
    date: ''
  },
  language: {
    id: '',
    name: '',
    proficiency: ''
  }
};

// Sample resumes for inspiration
export const sampleResumes = {
  softwareEngineer: {
    title: 'Software Engineer',
    summary: 'Full Stack Developer with 3+ years of experience specializing in React and Node.js. Proven ability to design and implement scalable solutions that improve performance and user experience.',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'Git']
  },
  dataScientist: {
    title: 'Data Scientist',
    summary: 'Data Scientist with expertise in machine learning, statistical analysis, and data visualization. Experienced in transforming raw data into actionable insights for business decisions.',
    skills: ['Python', 'SQL', 'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy', 'Tableau']
  },
  productManager: {
    title: 'Product Manager',
    summary: 'Product Manager with 5+ years of experience leading cross-functional teams to deliver successful digital products. Strong background in agile methodologies and user-centered design.',
    skills: ['Product Strategy', 'Agile', 'User Research', 'Data Analysis', 'JIRA', 'Figma', 'SQL']
  }
};