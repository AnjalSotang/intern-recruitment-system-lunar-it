import React from 'react'
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
    handleDuplicatePosition,
    handleDeletePosition

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
                            {filteredPositions.map((position) => (
                                <TableRow key={position.id}>
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
                                            <div>{position.currentApplications} applications</div>
                                            <div className="text-muted-foreground">{position.acceptedCandidates} accepted</div>
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
                                                <DropdownMenuItem onClick={() => handleDuplicatePosition(position)}>
                                                    <Copy className="mr-2 h-4 w-4" />
                                                    Duplicate
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Share className="mr-2 h-4 w-4" />
                                                    Share Position
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDeletePosition(position)} className="text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default PositionTable
