import React from 'react'
import SkeletonRows from "./SkeletonRows";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowUpDown, Calendar, Copy, Edit, Eye, Filter, MapPin, MoreHorizontal, Share, Trash2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"





const PositionTable = ({ searchTerm, setSearchTerm,
    statusFilter, setStatusFilter,
    departmentFilter, setDepartmentFilter,
    typeFilter, setTypeFilter,
    handleSort, filteredPositions,
    getTypeBadge, getStatusBadge,
    getPriorityBadge,
    handleViewPosition,
    handleEditPosition,
    handleDeletePosition,
    loading,
    error,
    positions

}) => {

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>All Positions</CardTitle>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 items-center">

                        <Input
                            placeholder="Search positions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />


                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="paused">Paused</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                        </Select>


                        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="Engineering">Engineering</SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Analytics">Analytics</SelectItem>
                                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                            </SelectContent>
                        </Select>


                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="full-time">Full-time</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                            </SelectContent>
                        </Select>


                    </div>
                </CardHeader>

                <CardContent>
                    {error ? (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error loading positions</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    ) : positions.length === 0 ? (
                        <div className="py-16 flex flex-col text-center text-gray-600">
                            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-gray-100 rounded-full text-gray-400">
                                {/* Optional icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 17v-2a4 4 0 014-4h4M9 9h.01M21 21H3a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v9a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-medium">No positions found</h3>
                            <p className="mt-2">Try adjusting your filters or add new positions.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <Button variant="ghost" onClick={() => handleSort("title")} className="h-auto p-0 font-semibold">
                                            Position Title
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>
                                        <Button variant="ghost" onClick={() => handleSort("status")} className="h-auto p-0 font-semibold">
                                            Status
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead>Applications</TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleSort("applicationDeadline")}
                                            className="h-auto p-0 font-semibold"
                                        >
                                            Deadline
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <SkeletonRows rows={5} />
                                ) : (
                                    filteredPositions?.map((position) => (
                                        <TableRow key={position._id}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{position.title}</p>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        {position.tags.slice(0, 2).map((tag) => (
                                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                                {tag}
                                                            </Badge>
                                                        ))}


                                                        {position.tags.length > 2 && (
                                                            <Badge variant="secondary" className="text-xs">
                                                                +{position.tags.length - 2}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{position.department}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3 text-muted-foreground" />
                                                    <h1 className="text-sm">{position.location}</h1>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getTypeBadge(position.type)}</TableCell>
                                            <TableCell>{getStatusBadge(position.status)}</TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div>{position.currentApplications ?? 0} applications</div>
                                                    <div className="text-muted-foreground">{position.acceptedCandidates ?? 0} accepted </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-sm">{new Date(position.applicationDeadline).toLocaleDateString()}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getPriorityBadge(position.priority)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleViewPosition(position)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleEditPosition(position)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit Position
                                                        </DropdownMenuItem>

                                                        {/* <DropdownMenuItem>
                                                    <Share className="mr-2 h-4 w-4" />
                                                    Share Position
                                                </DropdownMenuItem> */}
                                                        <DropdownMenuItem onClick={() => handleDeletePosition(position)} className="text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>))
                                )}
                            </TableBody>
                        </Table>
                    )}


                </CardContent>
            </Card>
        </div>
    )
}

export default PositionTable
