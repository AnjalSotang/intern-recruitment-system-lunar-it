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

