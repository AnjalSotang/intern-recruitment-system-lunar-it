import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {

  Clock,
  DollarSign,
  Search,
  Filter,
  Calendar,
  Users,
  Code,
  Palette,
  BarChart,
  Megaphone,
  Upload,
} from "lucide-react"
import React from 'react'
import { useNavigate } from 'react-router-dom';

const InternshipCard = ({ internship }) => {
  const navigate = useNavigate()
  const getDepartmentIcon = (department) => {
    switch (department) {
      case "Engineering":
        return <Code className="h-5 w-5" />
      case "Design":
        return <Palette className="h-5 w-5" />
      case "Analytics":
        return <BarChart className="h-5 w-5" />
      case "Marketing":
        return <Megaphone className="h-5 w-5" />
      default:
        return <Users className="h-5 w-5" />
    }
  }
  const handleApply = (id) => {
    navigate(`/Details/${id}`)
  }
  return (
    <Card

      className="hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden"
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              {getDepartmentIcon(internship.department)}
            </div>
            <Badge variant={internship.type === "Remote" ? "default" : "secondary"} className="rounded-full">
              {internship.type}
            </Badge>
          </div>
          <Badge variant="outline" className="rounded-full text-xs">
            {internship.maxApplications} spot{internship.maxApplications !== 1 ? "s" : ""} left
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 mb-2">{internship.title}</CardTitle>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {internship.location}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {internship.duration}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(internship.startDate).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-600 mb-4 line-clamp-3">{internship.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {internship.requirements.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs rounded-full bg-blue-100 text-blue-700">
              {skill}
            </Badge>
          ))}
          {internship.requirements.length > 3 && (
            <Badge variant="secondary" className="text-xs rounded-full bg-gray-100 text-gray-600">
              +{internship.requirements.length - 3} more
            </Badge>
          )}
        </div>
        <Button
          onClick={() => handleApply(internship._id)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-2 font-medium transition-all duration-300"
        >
          Apply Now
        </Button>
      </CardContent>
    </Card>

    // <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    //     {/* <div className={`h-3 ${internship.color}`}></div> */}
    //     <div className="p-6">
    //         <div className="flex justify-between items-start mb-4">
    //             <h3 className="text-xl font-semibold text-gray-900">{internship.title}</h3>
    //             {/* <span className={`px-3 py-1 ${internship.color === 'bg-violet-700' ? 'bg-violet-100 text-violet-700' : 'bg-teal-100 text-teal-600'} text-xs rounded-full font-medium`}> */}
    //             {internship.duration ?? "Three"} Months
    //             {/* </span> */}
    //         </div>

    //         <div className="flex items-center text-gray-500 text-sm mb-4">
    //             <MapPin className="w-4 h-4 mr-2" />
    //             <span>{internship.location}</span>
    //         </div>
    //         <p className="text-gray-600 mb-6">{internship.description}</p>
    //         <div className="mb-4">
    //             <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
    //             <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
    //                 {internship?.requirements?.length > 0
    //                     ? internship.requirements.map((req, index) => (
    //                         <li key={index}>{req}</li>
    //                     ))
    //                     : <li className="text-gray-400 italic">No requirements listed</li>
    //                 }
    //             </ul>

    //         </div>
    //         <div className="mb-4">
    //             <h4 className="text-sm font-medium text-gray-900 mb-2">Application Deadline:</h4>
    //             <p className="text-sm text-gray-600">
    //                 {internship?.deadline
    //                     ? new Date(internship.deadline).toLocaleDateString('en-US', {
    //                         year: 'numeric',
    //                         month: 'long',
    //                         day: 'numeric',
    //                     })
    //                     : 'No deadline specified'}
    //             </p>

    //         </div>
    //         <div className="flex flex-wrap gap-2 mb-6">
    //             {internship?.skills?.length > 0
    //                 ? internship.skills.map((skill, index) => (
    //                     <span
    //                         key={index}
    //                         className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
    //                     >
    //                         {skill}
    //                     </span>
    //                 ))
    //                 : <span className="text-gray-400 italic">No skills listed</span>
    //             }

    //         </div>

    //         {/* <button className={`block w-full text-center px-4 py-2 ${internship.color} text-white rounded shadow-sm hover:opacity-90 transition-opacity`}> */}
    //         <button className={'block w-full text-center px-4 py-2 bg-violet-700 text-white rounded shadow-sm hover:opacity-90 transition-opacity'}>
    //             Apply Now
    //         </button>
    //     </div>
    // </div>
  )
};

export default InternshipCard
