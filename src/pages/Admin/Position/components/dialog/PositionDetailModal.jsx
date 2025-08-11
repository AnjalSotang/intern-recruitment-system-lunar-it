import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Briefcase,
    MapPin,
    Calendar,
    Clock,
    Users,
    DollarSign,
    Building2,
    Star,
    CheckCircle,
    Share,
    Edit,
    Copy,
} from "lucide-react"
import EditPositionModal from "./EditPositionModal"

const PositionDetailsModal = ({ open, onOpenChange, position, handleEditPosition
 }) => {
    if (!position) return null
    // console.log(position)

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
            "Full-time": "bg-blue-100 text-blue-800 hover:bg-blue-100",
            "Part-time": "bg-purple-100 text-purple-800 hover:bg-purple-100",
            "Remote": "bg-green-100 text-green-800 hover:bg-green-100",
            "Hybrid": "bg-orange-100 text-orange-800 hover:bg-orange-100",
        }

        const labels = {
            "Full-time": "Full-time",
            "Part-time": "Part-time",
            "Remote": "Remote",
            "Hybrid": "Hybrid",
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
            low: "bg-blue-100 text-gray-800 hover:bg-gray-100",
        }

        return (
            <Badge variant="outline" className={colors[priority]}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
        )
    }

    return (
         <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        {position.title}
                    </DialogTitle>
                    <DialogDescription>
                        {position.department} • {position.location}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Position Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Position Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {getStatusBadge(position.status)}
                                    {getTypeBadge(position.type)}
                                    {getPriorityBadge(position.priority)}
                                    <Badge variant="outline">{position.experienceLevel} Level</Badge>
                                </div>

                                <p className="text-sm leading-relaxed text-muted-foreground">{position.description}</p>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{position.department}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{position.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{position.duration}</span>
                                    </div>
                                    {position.salary && (
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{position.salary}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Requirements */}
                        {position.requirements.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Technical Requirements</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {position.requirements.map((req) => (
                                            <Badge key={req} variant="secondary">
                                                {req}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* If both are empty */}
                        {position.responsibilities.length === 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Responsibilities Not Available</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500">
                                        This position has no listed qualifications at the moment.
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                          {position.qualifications.length === 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Qualification Not Available</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500">
                                        This position has no listed qualifications at the moment.
                                    </p>
                                </CardContent>
                            </Card>
                        )}


                        {/* Responsibilities */}
                        {position.responsibilities.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Key Responsibilities</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {position.responsibilities.map((resp, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm">{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* Qualifications */}
                        {position.qualifications.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Required Qualifications</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {position.qualifications.map((qual, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <Star className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm">{qual}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* Benefits */}
                        {position.optional.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Benefits & Perks</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-2">
                                        {position.optional.map((benefit) => (
                                            <div key={benefit} className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                                <span className="text-sm">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column - Sidebar Info */}
                    <div className="space-y-4">
                        {/* Application Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Application Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Current Applications:</span>
                                        <Badge variant="outline">{position.currentApplications ?? 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Accepted Candidates:</span>
                                        <Badge variant="outline">{position.acceptedCandidates ?? 0}</Badge>
                                    </div>
                                    {position.maxApplications && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Max Applications:</span>
                                            <Badge variant="outline">{position.maxApplications ?? 0}</Badge>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Important Dates */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Important Dates</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Application Deadline</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(position.applicationDeadline).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Start Date</p>
                                        <p className="text-sm text-muted-foreground">{new Date(position.startDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">End Date</p>
                                        <p className="text-sm text-muted-foreground">{new Date(position.endDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tags */}
                        {position.tags.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Tags</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {position.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Position Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Position Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium">Created By</p>
                                    <p className="text-sm text-muted-foreground">{position.createdBy}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Created Date</p>
                                    <p className="text-sm text-muted-foreground">{new Date(position.createdDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Last Modified</p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(position.lastModified).toLocaleDateString()}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button className="w-full justify-start bg-transparent" variant="outline"
                                    onClick={() => handleEditPosition(position)}
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Position
                                </Button>
                                {/* 
                                <Button className="w-full justify-start bg-transparent" variant="outline">
                                    <Share className="mr-2 h-4 w-4" />
                                    Share Position
                                </Button> */}
                                <Button className="w-full justify-start bg-transparent" variant="outline"

                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    View Applications
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

           </>
    )
}

export default PositionDetailsModal;
