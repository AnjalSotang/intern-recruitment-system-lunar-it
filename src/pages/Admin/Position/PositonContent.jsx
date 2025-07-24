import React, { useState } from 'react'
import Header from './components/Header'
import CreatePositionModal from './components/dialog/CreatePositionModal'
import StatsCard from './components/StatsCard'
import PositionTable from './components/PositionTable'
import { Badge } from "@/components/ui/badge"
// import { toast } from "@/components/ui/toast";



const mockPositions = [
    {
        id: "1",
        title: "Frontend Developer Intern",
        department: "Engineering",
        location: "San Francisco, CA",
        type: "full-time",
        status: "active",
        description: "Join our frontend team to build amazing user experiences using React and TypeScript.",
        requirements: ["React", "TypeScript", "CSS", "Git"],
        responsibilities: [
            "Develop user-facing features",
            "Collaborate with design team",
            "Write clean, maintainable code",
            "Participate in code reviews",
        ],
        qualifications: [
            "Currently pursuing Computer Science degree",
            "2+ years of React experience",
            "Strong problem-solving skills",
        ],
        benefits: ["Health insurance", "Flexible hours", "Learning budget", "Mentorship program"],
        salary: "$4,000 - $6,000/month",
        duration: "3 months",
        startDate: "2024-06-01",
        endDate: "2024-08-31",
        applicationDeadline: "2024-05-15",
        maxApplications: 100,
        currentApplications: 45,
        acceptedCandidates: 2,
        createdDate: "2024-01-15",
        lastModified: "2024-01-20",
        createdBy: "John Smith",
        tags: ["React", "Frontend", "JavaScript"],
        priority: "high",
        remote: false,
        experienceLevel: "mid",
    },
    {
        id: "2",
        title: "Backend Developer Intern",
        department: "Engineering",
        location: "Remote",
        type: "remote",
        status: "active",
        description: "Work on scalable backend systems using Node.js and Python.",
        requirements: ["Node.js", "Python", "SQL", "REST APIs"],
        responsibilities: [
            "Build and maintain APIs",
            "Database design and optimization",
            "Write unit tests",
            "Monitor system performance",
        ],
        qualifications: [
            "Computer Science or related field",
            "Experience with backend technologies",
            "Understanding of databases",
        ],
        benefits: ["Remote work", "Health insurance", "Professional development", "Stock options"],
        salary: "$3,500 - $5,500/month",
        duration: "6 months",
        startDate: "2024-07-01",
        endDate: "2024-12-31",
        applicationDeadline: "2024-06-01",
        maxApplications: 75,
        currentApplications: 28,
        acceptedCandidates: 1,
        createdDate: "2024-01-10",
        lastModified: "2024-01-18",
        createdBy: "Sarah Davis",
        tags: ["Backend", "Node.js", "Python"],
        priority: "high",
        remote: true,
        experienceLevel: "mid",
    },
    {
        id: "3",
        title: "UI/UX Designer Intern",
        department: "Design",
        location: "New York, NY",
        type: "hybrid",
        status: "active",
        description: "Create beautiful and intuitive user interfaces for our products.",
        requirements: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
        responsibilities: [
            "Design user interfaces",
            "Create prototypes",
            "Conduct user research",
            "Collaborate with developers",
        ],
        qualifications: [
            "Design degree or equivalent experience",
            "Portfolio of design work",
            "Understanding of UX principles",
        ],
        benefits: ["Hybrid work", "Design tools budget", "Conference attendance", "Mentorship"],
        salary: "$3,000 - $4,500/month",
        duration: "4 months",
        startDate: "2024-05-15",
        endDate: "2024-09-15",
        applicationDeadline: "2024-04-30",
        maxApplications: 50,
        currentApplications: 32,
        acceptedCandidates: 1,
        createdDate: "2024-01-08",
        lastModified: "2024-01-22",
        createdBy: "Mike Johnson",
        tags: ["Design", "UI", "UX", "Figma"],
        priority: "medium",
        remote: false,
        experienceLevel: "entry",
    },
    {
        id: "4",
        title: "Data Science Intern",
        department: "Analytics",
        location: "Boston, MA",
        type: "full-time",
        status: "paused",
        description: "Analyze data to drive business insights and build machine learning models.",
        requirements: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
        responsibilities: [
            "Analyze large datasets",
            "Build predictive models",
            "Create data visualizations",
            "Present findings to stakeholders",
        ],
        qualifications: ["Statistics or Data Science background", "Experience with Python/R", "Strong analytical skills"],
        benefits: ["Learning opportunities", "Health insurance", "Flexible schedule", "Research budget"],
        salary: "$4,500 - $6,500/month",
        duration: "6 months",
        startDate: "2024-08-01",
        endDate: "2024-01-31",
        applicationDeadline: "2024-07-01",
        maxApplications: 30,
        currentApplications: 15,
        acceptedCandidates: 0,
        createdDate: "2024-01-05",
        lastModified: "2024-01-25",
        createdBy: "Emily Chen",
        tags: ["Data Science", "Python", "ML"],
        priority: "medium",
        remote: false,
        experienceLevel: "mid",
    },
    {
        id: "5",
        title: "DevOps Intern",
        department: "Infrastructure",
        location: "Seattle, WA",
        type: "full-time",
        status: "closed",
        description: "Learn about cloud infrastructure and deployment automation.",
        requirements: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
        responsibilities: [
            "Manage cloud infrastructure",
            "Automate deployment processes",
            "Monitor system health",
            "Implement security best practices",
        ],
        qualifications: [
            "Computer Science background",
            "Experience with cloud platforms",
            "Understanding of DevOps practices",
        ],
        benefits: ["Cloud certifications", "Health insurance", "Learning budget", "Flexible hours"],
        salary: "$4,000 - $6,000/month",
        duration: "3 months",
        startDate: "2024-03-01",
        endDate: "2024-05-31",
        applicationDeadline: "2024-02-15",
        maxApplications: 25,
        currentApplications: 25,
        acceptedCandidates: 2,
        createdDate: "2023-12-20",
        lastModified: "2024-01-10",
        createdBy: "Tom Anderson",
        tags: ["DevOps", "AWS", "Docker"],
        priority: "low",
        remote: false,
        experienceLevel: "senior",
    },
]


const PositonContent = () => {
    const [positions, setPositions] = useState(mockPositions)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [departmentFilter, setDepartmentFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [sortField, setSortField] = useState("createdDate")
    const [sortDirection, setSortDirection] = useState("desc")
    const [activeTab, setActiveTab] = useState("all")
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedPosition, setSelectedPosition] = useState (null)
    const [editingPosition, setEditingPosition] = useState (null)
    const [deletingPosition, setDeletingPosition] = useState(null)
    // const { toast } = useToast()

    const getStatusBadge = (status) => {
        const colors = {
            active: "bg-green-100 text-green-800 hover:bg-green-100",
            paused: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
            closed: "bg-red-100 text-red-800 hover:bg-red-100",
            draft: "bg-gray-100 text-gray-800 hover:bg-gray-100",
        }

        return <Badge className={colors[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
    }

    const getTypeBadge = (type) => {
        const colors = {
            "full-time": "bg-blue-100 text-blue-800 hover:bg-blue-100",
            "part-time": "bg-purple-100 text-purple-800 hover:bg-purple-100",
            remote: "bg-green-100 text-green-800 hover:bg-green-100",
            hybrid: "bg-orange-100 text-orange-800 hover:bg-orange-100",
        }

        const labels = {
            "full-time": "Full-time",
            "part-time": "Part-time",
            remote: "Remote",
            hybrid: "Hybrid",
        }

        return (
            <Badge variant="outline" className={colors[type]}>
                {labels[type]}
            </Badge>
        )
    }

    const getPriorityBadge = (priority) => {
        const colors = {
            high: "bg-red-100 text-red-800 hover:bg-red-100",
            medium: "bg-orange-100 text-orange-800 hover:bg-orange-100",
            low: "bg-gray-100 text-gray-800 hover:bg-gray-100",
        }

        return (
            <Badge variant="outline" className={colors[priority]}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
        )
    }

    const handleViewPosition = (position) => {
        setSelectedPosition(position)
        setShowDetailsModal(true)
    }

    const handleEditPosition = (position) => {
        setEditingPosition(position)
        setShowEditModal(true)
    }

    const handleDeletePosition = (position) => {
        setDeletingPosition(position)
        setShowDeleteModal(true)
    }

    const confirmDeletePosition = () => {
        if (deletingPosition) {
            setPositions(positions.filter((pos) => pos.id !== deletingPosition.id))
            toast({
                title: "Position deleted",
                description: "The position has been successfully deleted.",
            })
            setDeletingPosition(null)
        }
    }


    const handleUpdatePosition = (updatedData) => {
        if (!editingPosition) return

        const updatedPositions = positions.map((pos) =>
            pos.id === editingPosition.id
                ? { ...pos, ...updatedData, lastModified: new Date().toISOString().split("T")[0] }
                : pos,
        )

        setPositions(updatedPositions)
        setEditingPosition(null)
        toast({
            title: "Position updated",
            description: "Position has been successfully updated.",
        })
    }

    const handleDuplicatePosition = (position) => {
        const duplicatedPosition = {
            ...position,
            id: Date.now().toString(),
            title: `${position.title} (Copy)`,
            status: "draft",
            currentApplications: 0,
            acceptedCandidates: 0,
            createdDate: new Date().toISOString().split("T")[0],
            lastModified: new Date().toISOString().split("T")[0],
            createdBy: "Current User",
        }

        setPositions([duplicatedPosition, ...positions])
        toast({
            title: "Position duplicated",
            description: "Position has been successfully duplicated.",
        })
    }




    const handleCreatePosition = (positionData) => {
        const newPosition = {
            id: Date.now().toString(),
            title: positionData.title || "",
            department: positionData.department || "",
            location: positionData.location || "",
            type: positionData.type || "full-time",
            status: "draft",
            description: positionData.description || "",
            requirements: positionData.requirements || [],
            responsibilities: positionData.responsibilities || [],
            qualifications: positionData.qualifications || [],
            benefits: positionData.benefits || [],
            salary: positionData.salary,
            duration: positionData.duration || "",
            startDate: positionData.startDate || "",
            endDate: positionData.endDate || "",
            applicationDeadline: positionData.applicationDeadline || "",
            maxApplications: positionData.maxApplications,
            currentApplications: 0,
            acceptedCandidates: 0,
            createdDate: new Date().toISOString().split("T")[0],
            lastModified: new Date().toISOString().split("T")[0],
            createdBy: "Current User",
            tags: positionData.tags || [],
            priority: positionData.priority || "medium",
            remote: positionData.remote || false,
            experienceLevel: positionData.experienceLevel || "entry",
        }

        setPositions([newPosition, ...positions])
        toast({
            title: "Position created",
            description: "New position has been successfully created.",
        })
    }


    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const filteredPositions = positions
        .filter((pos) => {
            const matchesSearch =
                pos.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pos.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pos.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pos.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

            const matchesStatus = statusFilter === "all" || pos.status === statusFilter
            const matchesDepartment = departmentFilter === "all" || pos.department === departmentFilter
            const matchesType = typeFilter === "all" || pos.type === typeFilter
            const matchesTab = activeTab === "all" || pos.status === activeTab

            return matchesSearch && matchesStatus && matchesDepartment && matchesType && matchesTab
        })
        .sort((a, b) => {
            const aValue = a[sortField]
            const bValue = b[sortField]
            const direction = sortDirection === "asc" ? 1 : -1

            if (aValue < bValue) return -1 * direction
            if (aValue > bValue) return 1 * direction
            return 0
        })

    const getTabCount = (status) => {
        if (status === "all") return positions.length
        return positions.filter((pos) => pos.status === status).length
    }






    return (
        <div className='space-y-6'>
            <Header setShowCreateModal={setShowCreateModal} />
            <StatsCard />
            <CreatePositionModal open={showCreateModal} onOpenChange={setShowCreateModal} onSubmit={handleCreatePosition} />
            <PositionTable
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter}
                typeFilter={typeFilter} setTypeFilter={setTypeFilter}
                handleSort= {handleSort} filteredPositions= {filteredPositions}

                getTypeBadge={getTypeBadge} getStatusBadge={getStatusBadge}
                getPriorityBadge={getPriorityBadge} 
                handleViewPosition={handleViewPosition}
                handleEditPosition={handleEditPosition}
                handleDuplicatePosition={handleDuplicatePosition}
                handleDeletePosition={handleDeletePosition}
            />
        </div>


    )
}

export default PositonContent
