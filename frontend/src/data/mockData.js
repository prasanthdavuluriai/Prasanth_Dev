// Mock data for static deployment fallback - Prasanth Davuluri

export const mockProfile = {
  id: "prasanth-davuluri-automotive-specialist",
  name: "Prasanth Davuluri",
  title: "Senior Automotive Embedded Systems Engineer",
  email: "dprasanth30@gmail.com",
  phone: "+1 7344476610",
  location: "Westland, Michigan, USA",
  linkedin: "prasanth-davuluri",
  github: "prasanth-dev",
  bio: "Accomplished Automotive Systems Engineer with 13+ years of expertise in embedded systems, AUTOSAR, and model-based development. Proven track record in delivering mission-critical automotive solutions for Ford, Stellantis, and Lucid Motors.",
  yearsExperience: 13,
  availability: "Open to new opportunities",
  tagline: "Driving Innovation in Automotive Technology",
  summary: "Passionate about transforming automotive experiences through cutting-edge embedded systems and intelligent automation solutions."
};

export const mockSkills = [
  // Technical Skills
  { name: "MATLAB/Simulink", level: 95, category: "Technical", yearsExperience: 13 },
  { name: "AUTOSAR", level: 90, category: "Technical", yearsExperience: 8 },
  { name: "Model-Based Development", level: 95, category: "Technical", yearsExperience: 10 },
  { name: "LabVIEW", level: 90, category: "Technical", yearsExperience: 12 },
  { name: "Test Stand", level: 85, category: "Technical", yearsExperience: 8 },
  { name: "C Programming", level: 85, category: "Technical", yearsExperience: 13 },
  { name: "Python", level: 80, category: "Technical", yearsExperience: 5 },
  { name: "MIL/SIL/HIL Testing", level: 95, category: "Technical", yearsExperience: 10 },
  { name: "CAN/LIN Protocols", level: 90, category: "Technical", yearsExperience: 12 },
  { name: "Diagnostics (UDS)", level: 85, category: "Technical", yearsExperience: 8 },
  { name: "Git/JIRA", level: 85, category: "Technical", yearsExperience: 10 },
  
  // Domain Expertise
  { name: "Body Control Modules", level: 95, category: "Domain", yearsExperience: 8 },
  { name: "Infotainment Systems", level: 90, category: "Domain", yearsExperience: 10 },
  { name: "Powertrain Control", level: 85, category: "Domain", yearsExperience: 3 },
  { name: "ADAS/Autonomous Systems", level: 80, category: "Domain", yearsExperience: 5 },
  { name: "Functional Safety", level: 85, category: "Domain", yearsExperience: 6 },
  { name: "Test Automation", level: 95, category: "Domain", yearsExperience: 12 }
];

export const mockExperience = [
  {
    id: "tcs-stellantis-2021",
    company: "Tata Consultancy Services",
    position: "End of Line Validation Engineer",
    location: "Detroit, Michigan",
    duration: "July 2021 - Present",
    type: "Full-time",
    client: "Stellantis",
    description: "Leading powertrain HIL validation and diagnostics validation for end-of-line testing systems.",
    achievements: [
      "Developed comprehensive HIL validation framework for powertrain systems",
      "Implemented automated diagnostics validation reducing testing time by 40%",
      "Led end-of-line validation processes for multiple vehicle platforms",
      "Mentored team of 5 engineers in advanced validation techniques"
    ],
    technologies: ["HIL Testing", "Diagnostics", "AUTOSAR", "CAN Protocols", "Test Automation"]
  },
  {
    id: "tcs-ford-2021",
    company: "Tata Consultancy Services", 
    position: "Senior Developer - Body Control Systems",
    location: "Pune, India / Dearborn, Michigan",
    duration: "August 2021 - June 2025",
    type: "Full-time",
    client: "Ford Motor Company",
    description: "Senior role in Ford's Vehicle Controls division developing Body Control Module ECUs and software components.",
    achievements: [
      "Led FS and Model Development for BCM features (Interior/Exterior Lighting, TPMS, ESCL)",
      "Implemented AUTOSAR and Non-AUTOSAR architecture solutions",
      "Established CI/CD pipeline with MAB Guidelines, Polyspace, and SonarCube integration",
      "Delivered FUSA (Functional Safety) compliant feature implementations"
    ],
    technologies: ["MATLAB", "Simulink", "AUTOSAR", "CI/CD", "Functional Safety", "Model-Based Development"]
  },
  {
    id: "tcs-lucid-2021",
    company: "Tata Consultancy Services",
    position: "Senior Developer - Automation Architecture", 
    location: "Pune, India",
    duration: "February 2021 - July 2021",
    type: "Full-time",
    client: "Lucid Motors",
    description: "Designed and implemented complete automation architecture for Lucid's infotainment testing systems.",
    achievements: [
      "Built end-to-end automation framework using NI hardware and LabVIEW",
      "Developed HMI screen verification, OCR validation, and audio testing capabilities",
      "Implemented external device connection/disconnection automation",
      "Integrated Python-based testing framework with Test Stand"
    ],
    technologies: ["LabVIEW", "Python", "NI Hardware", "Test Stand", "Automation Framework"]
  }
];

export const mockProjects = [
  {
    id: "ford-bcm-development",
    title: "Ford Body Control Module Development",
    category: "Model-Based Development",
    description: "Led comprehensive development of Body Control Module features for Ford vehicles including Interior/Exterior Lighting, TPMS, and Electric Steering Column Lock systems.",
    longDescription: "Spearheaded the complete development lifecycle of critical Body Control Module features for Ford's Vehicle Controls division. The project involved creating behavioral models, functional specifications, and implementing AUTOSAR-compliant software components.",
    technologies: ["MATLAB", "Simulink", "AUTOSAR", "Functional Safety", "CI/CD"],
    features: [
      "Interior and Exterior Lighting Control Systems",
      "Tire Pressure Monitoring System (TPMS) Implementation", 
      "Electric Steering Column Lock (ESCL) Development",
      "FUSA-compliant feature implementation",
      "Automated CI/CD pipeline with quality gates"
    ],
    status: "Completed",
    timeline: "2021 - 2025",
    client: "Ford Motor Company",
    impact: "Delivered mission-critical safety features for multiple Ford vehicle platforms, ensuring compliance with automotive functional safety standards.",
    image: "https://images.unsplash.com/photo-1593720083103-e7118f71cad2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHw0fHxhdXRvbW90aXZlJTIwZGVzaWdufGVufDB8fHx8MTc1NjkzNTA1OXww&ixlib=rb-4.1.0&q=85"
  },
  {
    id: "stellantis-powertrain-validation",
    title: "Stellantis Powertrain HIL Validation",
    category: "Test Automation",
    description: "Developed comprehensive Hardware-in-the-Loop validation framework for Stellantis powertrain systems with advanced diagnostics capabilities.",
    longDescription: "Created a robust HIL validation system for powertrain control modules, implementing end-of-line testing protocols that significantly improved testing efficiency and accuracy.",
    technologies: ["HIL Testing", "Diagnostics", "Test Automation", "CAN Protocols"],
    features: [
      "Automated HIL test execution framework",
      "Advanced diagnostics validation protocols",
      "End-of-line testing optimization",
      "Real-time data analysis and reporting"
    ],
    status: "Ongoing",
    timeline: "2021 - Present",
    client: "Stellantis",
    impact: "Reduced testing time by 40% while improving diagnostic accuracy and reliability for powertrain systems.",
    image: "https://images.unsplash.com/photo-1676288176918-232f7caadfee?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYXV0b21vdGl2ZXxlbnwwfHx8fDE3NTY5MzUwNjl8MA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: "lucid-automation-architecture",
    title: "Lucid Motors Infotainment Test Automation",
    category: "Automation Framework",
    description: "Designed and implemented complete automation architecture for Lucid's next-generation infotainment system testing using advanced NI hardware solutions.",
    longDescription: "Built a comprehensive testing framework from ground up for Lucid Motors' innovative infotainment systems, incorporating cutting-edge automation techniques for HMI validation and audio testing.",
    technologies: ["LabVIEW", "Python", "NI Hardware", "Test Stand", "OCR"],
    features: [
      "HMI screen verification and validation",
      "Optical Character Recognition (OCR) testing",
      "Audio frequency and amplitude validation",
      "Automated external device connection testing"
    ],
    status: "Completed",
    timeline: "February 2021 - July 2021", 
    client: "Lucid Motors",
    impact: "Enabled comprehensive automated testing of luxury EV infotainment systems, supporting Lucid's premium vehicle development.",
    image: "https://images.unsplash.com/photo-1606138369223-fb3a260d9b99?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwY2FyfGVufDB8fHx8MTc1NjkzNTA2NHww&ixlib=rb-4.1.0&q=85"
  },
  {
    id: "jlr-automation-suite",
    title: "Jaguar Land Rover Test Automation Suite",
    category: "Test Automation",
    description: "Managed and expanded comprehensive test automation suite covering 5000+ test cases across multiple Jaguar Land Rover vehicle platforms.",
    longDescription: "Led the development and maintenance of extensive automation infrastructure supporting multiple vehicle platforms with advanced feature stability testing and regression automation.",
    technologies: ["LabVIEW", "Test Stand", "CAN/LIN Simulation", "HMI Testing"],
    features: [
      "5000+ automated test case execution",
      "Feature stability testing with overnight execution",
      "CAN and LIN network simulation",
      "Camera verification and cluster testing"
    ],
    status: "Completed",
    timeline: "2017 - 2020",
    client: "Jaguar Land Rover", 
    impact: "Dramatically improved testing efficiency and coverage across JLR's luxury vehicle portfolio, enabling faster time-to-market.",
    image: "https://images.unsplash.com/photo-1679833186754-249abd3028dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHx0ZWNoJTIwYXV0b21vdGl2ZXxlbnwwfHx8fDE3NTY5MzUwNjl8MA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: "automotive-diagnostics-framework",
    title: "Advanced Automotive Diagnostics Framework",
    category: "Diagnostics",
    description: "Developed sophisticated diagnostics testing framework supporting UDS protocols and advanced connectivity features for premium automotive brands.",
    longDescription: "Created comprehensive diagnostics validation system supporting Ford Sync Gen 3, Mercedes NTG systems, and VW Group platforms with advanced connectivity testing capabilities.",
    technologies: ["UDS Protocols", "Apple CarPlay", "Android Auto", "CAN Analysis"],
    features: [
      "UDS (Unified Diagnostic Services) protocol testing",
      "Apple CarPlay and Android Auto validation",
      "Dual phone handling capabilities",
      "Baidu app testing for Asian markets"
    ],
    status: "Completed", 
    timeline: "2011 - 2017",
    client: "Multiple OEMs (Ford, Mercedes, VW Group)",
    impact: "Established robust diagnostics testing standards adopted across multiple premium automotive brands.",
    image: "https://images.unsplash.com/photo-1707449910500-0508059b9caf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxhdXRvbW90aXZlJTIwZGVzaWdufGVufDB8fHx8MTc1NjkzNTA1OXww&ixlib=rb-4.1.0&q=85"
  },
  {
    id: "thesis-can-automation",
    title: "CAN-Based Automotive Validation Automation",
    category: "Research",
    description: "Master's thesis project focusing on end-to-end automation for CAN-based automotive embedded systems validation.",
    longDescription: "Research and development of cost-effective automated validation solutions for CAN-based vehicle environments, addressing the need for error-free, fast, and time-bounded testing.",
    technologies: ["CAN Protocols", "Embedded Systems", "Test Automation", "Vehicle Simulation"],
    features: [
      "End-to-end automation framework for automotive validation",
      "Cost-effective testing solution design",
      "CAN-based vehicle environment simulation",
      "Overnight execution capabilities for multiple test cycles"
    ],
    status: "Completed",
    timeline: "2016",
    client: "Academic Research",
    impact: "Contributed to advancement of automotive testing methodologies and cost-effective validation solutions.",
    image: "https://images.unsplash.com/photo-1667123057116-40cbf20e5a9d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxmdXR1cmlzdGljJTIwY2FyfGVufDB8fHx8MTc1NjkzNTA2NHww&ixlib=rb-4.1.0&q=85"
  }
];

export const mockTestimonials = [
  {
    id: "testimonial-1",
    name: "Herta Llusho",
    position: "L6 Manager",
    company: "Ford Motor Company",
    content: "Prasanth's dedication and technical expertise in our Body Control Module development has been exceptional. His ability to deliver critical customer requirements while maintaining highest quality standards makes him a valuable asset to any automotive engineering team.",
    rating: 5,
    date: "2025",
    approved: true
  },
  {
    id: "testimonial-2", 
    name: "Purushottam Shirodkar",
    position: "Delivery Head NAG Michigan",
    company: "Tata Consultancy Services",
    content: "Prasanth's excellence and brilliance have consistently delivered stunning performance. His energy and enthusiasm set the benchmark for our Ford account. There seems to be no technical problem he can't solve with his automotive expertise.",
    rating: 5,
    date: "2024",
    approved: true
  },
  {
    id: "testimonial-3",
    name: "Rajendra Saindane",
    position: "Project Manager",
    company: "Tata Consultancy Services", 
    content: "Working with Prasanth on the Stellantis powertrain validation project has been remarkable. His deep understanding of HIL testing and diagnostics, combined with his mentoring abilities, has elevated our entire team's capabilities.",
    rating: 5,
    date: "2023",
    approved: true
  },
  {
    id: "testimonial-4",
    name: "Neeraj Chaudhary",
    position: "Technical Lead",
    company: "Tata Consultancy Services",
    content: "Prasanth's leadership in model-based development and AUTOSAR implementation has been instrumental in our Ford BCM project success. His technical guidance and process improvements have set new standards for our development practices.",
    rating: 5, 
    date: "2023",
    approved: true
  }
];

export const mockCertifications = [
  {
    id: "cert-1",
    title: "Functional Safety According to ISO 26262",
    issuer: "Udemy",
    date: "2021",
    description: "Comprehensive certification in automotive functional safety standards and implementation practices.",
    category: "Safety"
  },
  {
    id: "cert-2", 
    title: "Model Based Development for Automotive using Simulink",
    issuer: "Udemy",
    date: "2021",
    description: "Advanced certification in automotive model-based development using MATLAB Simulink platform.",
    category: "Technical"
  },
  {
    id: "cert-3",
    title: "MATLAB Onramp",
    issuer: "MathWorks",
    date: "2021",
    description: "Official MathWorks certification demonstrating proficiency in MATLAB programming and analysis.",
    category: "Technical"
  },
  {
    id: "cert-4",
    title: "Simulink Onramp", 
    issuer: "MathWorks",
    date: "2021",
    description: "Official MathWorks certification in Simulink modeling and simulation techniques.",
    category: "Technical"
  },
  {
    id: "cert-5",
    title: "Stateflow Onramp",
    issuer: "MathWorks", 
    date: "2021",
    description: "MathWorks certification in Stateflow for modeling and simulating decision logic using state machines.",
    category: "Technical"
  },
  {
    id: "cert-6",
    title: "Scrum Master Certification",
    issuer: "TCS",
    date: "2023",
    description: "Certified Scrum Master with expertise in agile project management and team leadership.",
    category: "Management"
  },
  {
    id: "cert-7",
    title: "Generative AI Mastermind",
    issuer: "OutSkill",
    date: "2025", 
    description: "Advanced certification in generative AI technologies and their applications in automotive development.",
    category: "AI/ML"
  }
];

export const mockAwards = [
  {
    id: "award-1",
    title: "Certificate of Appreciation - Ford Customer Recognition",
    organization: "Ford Motor Company / TCS",
    year: "2025",
    description: "Received critical customer appreciation from Ford L6 Manager for going extra mile to deliver exceptional results despite ever-changing project factors."
  },
  {
    id: "award-2",
    title: "Special Initiative Award",
    organization: "Tata Consultancy Services",
    year: "2025", 
    description: "Recognized for outstanding contribution to the organization and inspiring role model performance for colleagues."
  },
  {
    id: "award-3",
    title: "Certificate of Appreciation - Delivery Excellence",
    organization: "TCS NAG Michigan",
    year: "2024",
    description: "Acknowledged for excellence and brilliance in Ford Account performance, bringing permanent value as individual and team contributor."
  },
  {
    id: "award-4",
    title: "Applause Award",
    organization: "Tata Consultancy Services",
    year: "2023",
    description: "Awarded by Executive VP & Global Head Human Resources for outstanding organizational contribution and inspiring role model behavior."
  }
];

export const mockStats = {
  yearsExperience: 13,
  projectsCompleted: 25,
  clientsSatisfied: 8,
  testCasesAutomated: 5000,
  successRate: 99,
  criticalIssuesResolved: 150,
  efficiencyImprovement: 40
};