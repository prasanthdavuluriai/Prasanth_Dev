# Default data for the portfolio when database is empty

def get_default_skills():
    return {
        "technical": [
            {"name": "MATLAB/Simulink", "level": 95, "category": "Development"},
            {"name": "Stateflow", "level": 90, "category": "Development"},
            {"name": "AUTOSAR", "level": 88, "category": "Architecture"},
            {"name": "Embedded C", "level": 92, "category": "Programming"},
            {"name": "ISO 26262", "level": 85, "category": "Safety"},
            {"name": "Model-Based Development", "level": 95, "category": "Methodology"},
            {"name": "Git/Version Control", "level": 90, "category": "Tools"},
            {"name": "Jenkins/CI-CD", "level": 82, "category": "DevOps"},
            {"name": "Robot Framework", "level": 80, "category": "Testing"},
            {"name": "CAN Protocol", "level": 88, "category": "Communication"},
            {"name": "dSPACE HIL", "level": 78, "category": "Testing"},
            {"name": "JIRA/Agile", "level": 85, "category": "Management"}
        ],
        "domains": [
            {"name": "Chassis Control Systems", "expertise": "Expert"},
            {"name": "Body Control Module (BCM)", "expertise": "Expert"},
            {"name": "Tire Pressure Monitoring (TPMS)", "expertise": "Advanced"},
            {"name": "Battery Management Systems", "expertise": "Advanced"},
            {"name": "Software Defined Vehicles (SDV)", "expertise": "Intermediate"},
            {"name": "Functional Safety (ASIL)", "expertise": "Expert"}
        ]
    }

def get_default_experience():
    return [
        {
            "company": "KPIT Technologies",
            "position": "Senior Software Engineer",
            "duration": "July 2023 - Jan 2025",
            "location": "India",
            "type": "Full-time",
            "description": "Led advanced engineering projects in Chassis Development for SDV, specializing in Model-Based Development and CI/CD implementation.",
            "achievements": [
                "Pioneered Software-in-Loop (SIL) testing using Matrix framework, earning \"Star of the Sprint\" award",
                "Successfully rectified Polyspace and SonarQube compliance issues, improving code quality by 40%",
                "Led defect analysis initiatives, reducing critical bugs by 35% through systematic root cause analysis",
                "Managed end-to-end CI/CD pipeline implementation using Jenkins and Robot Framework"
            ],
            "technologies": ["MATLAB/Simulink", "Robot Framework", "Jenkins", "Git", "JIRA", "Code Beamer"],
            "order": 1
        },
        {
            "company": "Tata Consultancy Services",
            "position": "Developer",
            "duration": "June 2021 - July 2023",
            "location": "India",
            "type": "Full-time",
            "description": "Developed and validated embedded software for Body Control Module (BCM) with focus on TPMS and Battery Management Systems.",
            "achievements": [
                "Designed comprehensive Functional Specification documents for TPMS and BMS features",
                "Achieved 95% pass rate in MIL/SIL testing through rigorous test case development",
                "Implemented ISO 26262-compliant safety measures ensuring ASIL-B compliance",
                "Delivered multiple releases with zero critical defects, earning \"Best Team\" award"
            ],
            "technologies": ["AUTOSAR", "Simulink/Stateflow", "ISO 26262", "MISRA", "CAN Protocol"],
            "order": 2
        },
        {
            "company": "Conneqt Business Solutions",
            "position": "Engineer",
            "duration": "Nov 2018 - June 2021",
            "location": "India",
            "type": "Full-time",
            "description": "Focused on Chassis and BCM model development, validation, and quality assurance processes.",
            "achievements": [
                "Developed robust Simulink/Stateflow models compliant with MAAB guidelines",
                "Implemented comprehensive unit-level testing using Model-in-the-Loop techniques",
                "Conducted thorough IQA and EQA reviews, ensuring 100% compliance with standards",
                "Established efficient CAN protocol configurations for in-vehicle communication"
            ],
            "technologies": ["MATLAB/Simulink", "MAAB Guidelines", "CAN Protocol", "Git", "JIRA"],
            "order": 3
        }
    ]

def get_default_projects():
    return [
        {
            "title": "Chassis Control System Development",
            "category": "Model-Based Development",
            "description": "Advanced Chassis Control system for Software Defined Vehicles (SDV) with comprehensive Model-Based Development approach.",
            "technologies": ["MATLAB/Simulink", "Stateflow", "AUTOSAR", "ISO 26262"],
            "features": [
                "Finite State Machine (FSM) implementation for chassis control logic",
                "ASIL-compliant safety mechanisms integration",
                "Real-time validation using MIL/SIL testing",
                "CI/CD pipeline integration for automated testing"
            ],
            "status": "Production",
            "timeline": "8 months",
            "impact": "Reduced system response time by 25% while maintaining safety compliance",
            "featured": True,
            "order": 1
        },
        {
            "title": "Body Control Module (BCM) Enhancement",
            "category": "Embedded Systems",
            "description": "Comprehensive BCM development focusing on TPMS and Battery Management Systems with AUTOSAR compliance.",
            "technologies": ["AUTOSAR", "Embedded C", "CAN Protocol", "Simulink Test"],
            "features": [
                "TPMS integration with real-time monitoring capabilities",
                "Battery Management System optimization",
                "CAN communication protocol implementation",
                "Comprehensive unit and integration testing"
            ],
            "status": "Completed",
            "timeline": "12 months",
            "impact": "95% test validation success rate with zero critical defects in production",
            "featured": True,
            "order": 2
        },
        {
            "title": "CI/CD Pipeline Automation",
            "category": "DevOps & Testing",
            "description": "End-to-end CI/CD pipeline implementation for automotive software validation using Robot Framework and Jenkins.",
            "technologies": ["Jenkins", "Robot Framework", "Python", "Git", "Matrix Tool"],
            "features": [
                "Automated SIL testing framework development",
                "Integration with Code Beamer for requirement traceability",
                "Polyspace and SonarQube compliance automation",
                "Custom test reporting and analytics dashboard"
            ],
            "status": "Ongoing",
            "timeline": "6 months",
            "impact": "Reduced manual testing effort by 60% and improved defect detection by 40%",
            "featured": False,
            "order": 3
        },
        {
            "title": "Functional Safety Implementation",
            "category": "Safety & Compliance",
            "description": "ISO 26262 compliant safety mechanisms implementation for ASIL-B automotive systems.",
            "technologies": ["ISO 26262", "ASIL-B", "Safety Mechanisms", "V-Model"],
            "features": [
                "Safety requirement analysis and decomposition",
                "ASIL-B compliant software architecture design",
                "Safety mechanism implementation and validation",
                "Comprehensive safety case documentation"
            ],
            "status": "Completed",
            "timeline": "10 months",
            "impact": "Achieved full ISO 26262 compliance with zero safety-related incidents",
            "featured": False,
            "order": 4
        }
    ]

def get_default_testimonials():
    return [
        {
            "name": "Rajesh Kumar",
            "position": "Technical Lead",
            "company": "KPIT Technologies",
            "content": "Bhavyasri's expertise in Model-Based Development is exceptional. Her innovative approach to SIL testing using Matrix framework was a game-changer for our team. She consistently delivers high-quality solutions while mentoring junior developers.",
            "rating": 5,
            "approved": True,
            "order": 1
        },
        {
            "name": "Priya Sharma",
            "position": "Project Manager",
            "company": "Tata Consultancy Services",
            "content": "Working with Bhavyasri was a pleasure. Her attention to detail in functional specifications and her ability to achieve 95% test success rates made our BCM project a huge success. She's a true professional who goes above and beyond.",
            "rating": 5,
            "approved": True,
            "order": 2
        },
        {
            "name": "Dr. Anand Patel",
            "position": "Solutions Architect",
            "company": "Automotive R&D",
            "content": "Bhavyasri's deep understanding of ISO 26262 and functional safety is remarkable. Her ASIL-B compliant implementations are thorough and well-documented. She's one of the most knowledgeable engineers I've worked with in automotive safety.",
            "rating": 5,
            "approved": True,
            "order": 3
        }
    ]

def get_default_awards():
    return [
        {
            "title": "Client Champion Award",
            "organization": "KPIT Technologies",
            "year": "2024",
            "description": "Recognized for consistently providing outstanding support and building trusted partnerships with clients, contributing to project success and customer satisfaction.",
            "order": 1
        },
        {
            "title": "Star of the Sprint",
            "organization": "KPIT Technologies",
            "year": "2024",
            "description": "First team member to implement Software-in-the-Loop (SIL) testing using Matrix framework, significantly enhancing automated validation capabilities.",
            "order": 2
        },
        {
            "title": "Best Team Award",
            "organization": "Tata Consultancy Services",
            "year": "2022",
            "description": "Team recognition for completing unexpected deliverables with defect-free artifacts, demonstrating exceptional accuracy and efficiency.",
            "order": 3
        }
    ]