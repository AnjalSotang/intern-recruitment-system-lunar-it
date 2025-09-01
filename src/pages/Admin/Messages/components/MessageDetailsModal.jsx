import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Calendar, Reply, Archive, MessageSquare, CheckCircle } from "lucide-react"

// interface MessageDetailsModalProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   message: any
//   onReply: () => void
//   onArchive: () => void
// }

const subjectLabels = {
  internship: "Internship Inquiry",
  partnership: "Partnership Opportunity",
  services: "Service Information",
  careers: "Career Opportunities",
  general: "General Inquiry",
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  read: "bg-gray-100 text-gray-800",
  replied: "bg-green-100 text-green-800",
  archived: "bg-purple-100 text-purple-800",
}

export function MessageDetailsModal({ open, onOpenChange, message, onReply, onArchive }) {
  if (!message) return null

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message Details
          </DialogTitle>
          <DialogDescription>View and manage contact form submission</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sender Information */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-lg">
                    {message.firstName[0]}
                    {message.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">
                      {message.firstName} {message.lastName}
                    </h3>
                    <Badge className={priorityColors[message.priority]}>
                      {message.priority} priority
                    </Badge>
                    <Badge className={statusColors[message.status]}>
                      {message.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${message.email}`} className="hover:underline">
                        {message.email}
                      </a>
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${message.phone}`} className="hover:underline">
                          {message.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Information */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Subject</h4>
                <Badge variant="outline">{subjectLabels[message.subject]}</Badge>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Message</h4>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-blue-100 rounded-full">
                    <Calendar className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Received:</span> {formatDateTime(message.createdAt)}
                  </div>
                </div>

                {message.readAt && (
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-gray-100 rounded-full">
                      <CheckCircle className="h-3 w-3 text-gray-600" />
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Read:</span> {formatDateTime(message.readAt)}
                    </div>
                  </div>
                )}

                {message.repliedAt && (
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-green-100 rounded-full">
                      <Reply className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Replied:</span> {formatDateTime(message.repliedAt)}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={onReply} className="flex-1">
              <Reply className="h-4 w-4 mr-2" />
              Reply to Message
            </Button>
            <Button variant="outline" onClick={onArchive} className="flex-1 bg-transparent">
              <Archive className="h-4 w-4 mr-2" />
              Archive Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
