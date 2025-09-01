import React, { useEffect } from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Mail } from "lucide-react"
import { useContactStore } from "../../../../store/MessagesStore"

export function ReplyMessageModal({ open, onOpenChange, message, loading }) {
  const {sendReplyMessage, status} = useContactStore()
  const [replyText, setReplyText] = useState("")
    useEffect(() => {
    if (status === 200) {
      onOpenChange(false)
      setReplyText("")
    }}
  , [status])

  if (!message) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!replyText.trim()) return
    sendReplyMessage(message._id, replyText)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Reply to Message
          </DialogTitle>
          <DialogDescription>
            Send a reply to {message.firstName} {message.lastName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipient Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {message.firstName[0]}
                    {message.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {message.firstName} {message.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {message.email}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Original Message */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Original Message:</h4>
              <div className="bg-muted p-3 rounded text-sm">
                <p className="line-clamp-3">{message.message}</p>
              </div>
            </CardContent>
          </Card>

          {/* Reply Text */}
          <div className="space-y-2">
            <Label htmlFor="reply">Your Reply</Label>
            <Textarea
              id="reply"
              placeholder="Type your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={6}
              required
            />
            <div className="text-xs text-muted-foreground text-right">{replyText.length}/1000 characters</div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={!replyText.trim() || loading}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
