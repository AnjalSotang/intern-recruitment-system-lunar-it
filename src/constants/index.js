export const requiredSkills = [
    "HTML/CSS",
    "JavaScript",
    "React",
    "TypeScript",
    "Git",
    "Responsive Design",
];

export const niceToHaveSkills = [
    "Node.js",
    "Python",
    "SQL",
    "AWS",
    "Docker",
    "GraphQL",
    "Vue.js",
    "Angular",
];

export const responsibilities = [
    "Develop and maintain responsive web applications using React and TypeScript",
    "Collaborate with senior developers on feature implementation and code reviews",
    "Participate in daily standups and sprint planning meetings",
    "Write clean, maintainable, and well-documented code",
    "Assist in debugging and troubleshooting existing applications",
    "Learn and implement modern frontend development best practices",
    "Contribute to UI/UX improvements and user experience optimization",
    "Work with design team to implement pixel-perfect interfaces",
];

export const qualifications = [
    "Currently pursuing or recently completed degree in Computer Science, Web Development, or related field",
    "Strong foundation in HTML, CSS, and JavaScript",
    "Basic understanding of React framework and component-based architecture",
    "Familiarity with version control systems (Git)",
    "Understanding of responsive web design principles",
    "Strong problem-solving skills and attention to detail",
    "Excellent communication and teamwork abilities",
    "Eagerness to learn and adapt to new technologies",
];

export const benefits = [
    "Comprehensive mentorship program with experienced developers",
    "Hands-on experience with real-world projects and cutting-edge technologies",
    "Flexible remote/hybrid work arrangements",
    "Competitive stipend of $2,000 per month",
    "Access to premium learning resources and online courses",
    "Networking opportunities with industry professionals",
    "Potential for full-time employment upon successful completion",
    "Professional development workshops and tech talks",
];

export const applicationSteps = [
    {
        step: "1",
        title: "Submit Application",
        description:
            "Complete the online application form with your details and portfolio",
    },
    {
        step: "2",
        title: "Initial Review",
        description:
            "Our team reviews your application and portfolio (3-5 business days)",
    },
    {
        step: "3",
        title: "Technical Assessment",
        description: "Complete a coding challenge to demonstrate your skills",
    },
    {
        step: "4",
        title: "Interview Process",
        description:
            "Virtual interviews with team members and technical discussion",
    },
    {
        step: "5",
        title: "Final Decision",
        description:
            "Receive notification and onboarding information if selected",
    },
];


export const applications = [
    {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@university.edu',
        position: 'Software Engineer Intern',
        university: 'Stanford University',
        experience: '2 years',
        status: 'new',
        date: '2024-01-15',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20young%20woman%20headshot%20portrait%20with%20clean%20white%20background%20modern%20business%20style&width=40&height=40&seq=1&orientation=squarish',
        phone: '+1 (555) 123-4567',
        gpa: '3.8',
        major: 'Computer Science',
        year: 'Junior',
        skills: ['JavaScript', 'React', 'Python', 'Node.js'],
        coverLetter: 'I am excited to apply for the Software Engineer Intern position. My passion for technology and strong academic background make me an ideal candidate...',
        resume: 'sarah_johnson_resume.pdf',
        portfolio: 'https://sarahjohnson.dev',
        notes: [
            { admin: 'John Smith', date: '2024-01-16', content: 'Strong technical background, good portfolio' }
        ]
    },
    {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.chen@tech.edu',
        position: 'Data Science Intern',
        experience: '5 years',
        university: 'MIT',
        status: 'shortlisted',
        date: '2024-01-14',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20young%20asian%20man%20headshot%20portrait%20with%20clean%20white%20background%20modern%20business%20style&width=40&height=40&seq=2&orientation=squarish',
        phone: '+1 (555) 234-5678',
        gpa: '3.9',
        major: 'Data Science',
        year: 'Senior',
        skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
        coverLetter: 'As a Data Science major with hands-on experience in machine learning projects, I am eager to contribute to your data team...',
        resume: 'michael_chen_resume.pdf',
        portfolio: 'https://michaelchen.ml',
        notes: [
            { admin: 'Jane Doe', date: '2024-01-15', content: 'Excellent ML projects, recommend for interview' }
        ]
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@college.edu',
        position: 'UX Design Intern',
        university: 'UC Berkeley',
        experience: '10 years',
        status: 'rejected',
        date: '2024-01-13',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20young%20latina%20woman%20headshot%20portrait%20with%20clean%20white%20background%20modern%20business%20style&width=40&height=40&seq=3&orientation=squarish',
        phone: '+1 (555) 345-6789',
        gpa: '3.7',
        major: 'Design',
        year: 'Sophomore',
        skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
        coverLetter: 'I am passionate about creating user-centered designs that solve real problems. My portfolio demonstrates my ability to...',
        resume: 'emily_rodriguez_resume.pdf',
        portfolio: 'https://emilydesigns.com',
        notes: [
            { admin: 'John Smith', date: '2024-01-14', content: 'Portfolio needs more depth, not ready for this level' }
        ]
    }
];

export const internPositions = [
    {
        id: 1,
        position: 'Frontend Developer Intern',
        department: 'Engineering',
        location: 'San Francisco, CA',
        duration: '3 months',
        salary: '$4,000/month',
        jobOverview: 'Join our dynamic engineering team to build cutting-edge web applications.',
        keyResponsibilities: ['Develop responsive web applications', 'Collaborate with design team'],
        requiredQualifications: ['Strong foundation in HTML, CSS, JavaScript', 'Understanding of responsive design'],
        requiredSkills: ['HTML/CSS', 'JavaScript', 'React'],
        niceToHaveSkills: ['TypeScript', 'Node.js']
    },
    {
        id: 2,
        position: 'Data Science Intern',
        department: 'Analytics',
        location: 'New York, NY',
        duration: '6 months',
        salary: '$4,500/month',
        jobOverview: 'Work with our data team to analyze user behavior and business metrics.',
        keyResponsibilities: ['Analyze large datasets', 'Create data visualizations'],
        requiredQualifications: ['Knowledge of statistics', 'Experience with Python'],
        requiredSkills: ['Python', 'SQL', 'Pandas'],
        niceToHaveSkills: ['Machine Learning', 'R', 'Tableau']
    },
    {
        id: 3,
        position: 'UX Design Intern',
        department: 'Design',
        location: 'Remote',
        duration: '4 months',
        salary: '$3,500/month',
        jobOverview: 'Create intuitive user experiences for our digital products.',
        keyResponsibilities: ['Design user interfaces', 'Conduct user research'],
        requiredQualifications: ['Portfolio of design work', 'Understanding of design principles'],
        requiredSkills: ['Figma', 'Sketch', 'Prototyping'],
        niceToHaveSkills: ['Adobe Creative Suite', 'HTML/CSS', 'User Research']
    }
];


   // Mock internship data
    export const internships = [
        {
            id: 1,
            title: "Frontend Developer",
            role: "frontend",
            duration: "3",
            location: "remote",
            locationText: "Remote (with occasional office visits)",
            description: "Join our UI/UX team to create responsive, user-friendly interfaces using React, TypeScript, and modern CSS frameworks. You'll work on real client projects and collaborate with designers and backend developers.",
            requirements: [
                "Strong knowledge of HTML, CSS, and JavaScript",
                "Experience with React or similar framework",
                "Understanding of responsive design principles",
                "Basic knowledge of version control (Git)"
            ],
            deadline: "August 15, 2025",
            skills: ["React", "TypeScript", "Tailwind CSS", "Figma"],
            color: "bg-violet-700"
        },
        {
            id: 2,
            title: "Backend Engineer",
            role: "backend",
            duration: "6",
            location: "hybrid",
            locationText: "Hybrid (3 days in office)",
            description: "Develop robust APIs and microservices using Node.js, Express, and MongoDB while learning best practices in backend architecture. You'll be involved in designing, implementing, and testing server-side applications.",
            requirements: [
                "Knowledge of JavaScript and Node.js",
                "Basic understanding of databases (SQL or NoSQL)",
                "Familiarity with RESTful API design",
                "Interest in server architecture and performance"
            ],
            deadline: "September 1, 2025",
            skills: ["Node.js", "Express", "MongoDB", "REST API"],
            color: "bg-teal-600"
        },
        {
            id: 3,
            title: "Data Scientist",
            role: "data",
            duration: "4",
            location: "onsite",
            locationText: "On-site (London Office)",
            description: "Analyze complex datasets and build predictive models to help our clients make data-driven decisions using Python and ML frameworks. You'll work on real-world data science problems and develop solutions with business impact.",
            requirements: [
                "Strong Python programming skills",
                "Knowledge of statistical analysis",
                "Experience with data manipulation libraries",
                "Understanding of machine learning concepts"
            ],
            deadline: "August 30, 2025",
            skills: ["Python", "TensorFlow", "SQL", "Data Visualization"],
            color: "bg-violet-700"
        },
        {
            id: 4,
            title: "UI/UX Designer",
            role: "design",
            duration: "3",
            location: "remote",
            locationText: "Remote (weekly team meetings)",
            description: "Create user-centered designs by understanding business requirements, user feedback, and usability principles. You'll work on wireframes, visual designs, and prototypes for web and mobile applications.",
            requirements: [
                "Design portfolio demonstrating UI/UX skills",
                "Proficiency with design tools (Figma, Sketch)",
                "Understanding of user-centered design principles",
                "Basic knowledge of HTML/CSS is a plus"
            ],
            deadline: "August 20, 2025",
            skills: ["Figma", "Wireframing", "Prototyping", "User Research"],
            color: "bg-teal-600"
        },
        {
            id: 5,
            title: "Product Management",
            role: "product",
            duration: "6",
            location: "hybrid",
            locationText: "Hybrid (2 days in office)",
            description: "Assist in managing the entire product lifecycle from strategic planning to tactical activities. You'll help gather user requirements, define product vision, and work with development teams to deliver solutions.",
            requirements: [
                "Strong analytical and problem-solving skills",
                "Excellent communication abilities",
                "Basic understanding of software development",
                "Interest in market research and user experience"
            ],
            deadline: "September 10, 2025",
            skills: ["Product Strategy", "User Stories", "Market Analysis", "Agile"],
            color: "bg-violet-700"
        },
        {
            id: 6,
            title: "DevOps Engineer",
            role: "devops",
            duration: "4",
            location: "onsite",
            locationText: "On-site (Manchester Office)",
            description: "Learn to build and maintain the infrastructure necessary for software development and deployment. You'll work with CI/CD pipelines, cloud services, and automation tools to improve development workflows.",
            requirements: [
                "Basic knowledge of Linux systems",
                "Understanding of networking concepts",
                "Familiarity with scripting languages",
                "Interest in cloud technologies (AWS, Azure, GCP)"
            ],
            deadline: "August 25, 2025",
            skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
            color: "bg-teal-600"
        },
        {
            id: 7,
            title: "Mobile App Developer",
            role: "frontend",
            duration: "4",
            location: "hybrid",
            locationText: "Hybrid (flexible schedule)",
            description: "Develop cross-platform mobile applications using React Native or Flutter. You'll work on UI implementation, state management, and integration with backend services for both iOS and Android platforms.",
            requirements: [
                "Experience with JavaScript or Dart",
                "Understanding of mobile UI/UX principles",
                "Knowledge of React or Flutter basics",
                "Familiarity with mobile development concepts"
            ],
            deadline: "September 5, 2025",
            skills: ["React Native", "Flutter", "Mobile UI", "API Integration"],
            color: "bg-violet-700"
        },
        {
            id: 8,
            title: "Business Intelligence Analyst",
            role: "data",
            duration: "6",
            location: "remote",
            locationText: "Remote (global team)",
            description: "Transform raw data into actionable insights through data visualization and reporting. You'll work with BI tools to create dashboards and reports that help stakeholders make informed business decisions.",
            requirements: [
                "Strong analytical and critical thinking skills",
                "Experience with SQL and data manipulation",
                "Knowledge of data visualization principles",
                "Understanding of business metrics and KPIs"
            ],
            deadline: "September 15, 2025",
            skills: ["SQL", "Tableau", "Power BI", "Data Analysis"],
            color: "bg-teal-600"
        },
        {
            id: 9,
            title: "QA Engineer",
            role: "backend",
            duration: "3",
            location: "onsite",
            locationText: "On-site (Edinburgh Office)",
            description: "Ensure software quality through manual and automated testing. You'll design test cases, identify bugs, and work with development teams to improve product quality and user experience.",
            requirements: [
                "Attention to detail and analytical mindset",
                "Basic understanding of software testing principles",
                "Interest in automation testing",
                "Good communication and documentation skills"
            ],
            deadline: "August 18, 2025",
            skills: ["Test Planning", "Selenium", "JIRA", "Bug Tracking"],
            color: "bg-violet-700"
        },
        {
            id: 10,
            title: "Content Designer",
            role: "design",
            duration: "4",
            location: "hybrid",
            locationText: "Hybrid (1 day in office)",
            description: "Create engaging visual content for digital platforms including social media, websites, and marketing materials. You'll work with the marketing team to develop a consistent brand identity across all channels.",
            requirements: [
                "Creative portfolio demonstrating design skills",
                "Proficiency with Adobe Creative Suite",
                "Understanding of design principles and typography",
                "Knowledge of social media platforms and formats"
            ],
            deadline: "August 22, 2025",
            skills: ["Photoshop", "Illustrator", "Social Media", "Brand Design"],
            color: "bg-teal-600"
        },
        {
            id: 11,
            title: "Digital Marketing",
            role: "product",
            duration: "3",
            location: "remote",
            locationText: "Remote (UK-based)",
            description: "Assist in planning and executing digital marketing campaigns across various channels. You'll help with content creation, social media management, SEO optimization, and performance analysis.",
            requirements: [
                "Strong written communication skills",
                "Basic understanding of digital marketing concepts",
                "Familiarity with social media platforms",
                "Interest in analytics and data-driven marketing"
            ],
            deadline: "August 28, 2025",
            skills: ["SEO", "Content Marketing", "Google Analytics", "Social Media"],
            color: "bg-violet-700"
        },
        {
            id: 12,
            title: "Cybersecurity Analyst",
            role: "devops",
            duration: "6",
            location: "onsite",
            locationText: "On-site (Bristol Office)",
            description: "Assist in monitoring and improving security systems to protect against cyber threats. You'll learn about vulnerability assessments, security protocols, and incident response procedures.",
            requirements: [
                "Understanding of basic security concepts",
                "Knowledge of networking fundamentals",
                "Interest in ethical hacking and penetration testing",
                "Analytical mindset and attention to detail"
            ],
            deadline: "September 20, 2025",
            skills: ["Network Security", "Vulnerability Assessment", "Security Tools", "Incident Response"],
            color: "bg-teal-600"
        }
    ];

    export const filterOptions = {
        roles: [
            { value: 'frontend', label: 'Frontend Development' },
            { value: 'backend', label: 'Backend Engineering' },
            { value: 'data', label: 'Data Science' },
            { value: 'design', label: 'UI/UX Design' },
            { value: 'product', label: 'Product Management' },
            { value: 'devops', label: 'DevOps' }
        ],
        durations: [
            { value: '3', label: '3 Months' },
            { value: '4', label: '4 Months' },
            { value: '6', label: '6 Months' }
        ],
        locations: [
            { value: 'Full-time', label: 'Full Time' },
            { value: 'Part-time', label: 'Part-time' },
            { value: 'Remote', label: 'Remote' },
            { value: 'Hybrid', label: 'Hybrid' },
        ]
    };
