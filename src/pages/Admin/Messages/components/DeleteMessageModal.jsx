"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { useToast } from "@/hooks/use-toast"
import { Trash2, AlertTriangle } from "lucide-react"
import { useContactStore } from "../../../../store/MessagesStore"


// interface DeleteMessageModalProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   message: any
//   onDelete: (messageId: number) => void
// }

export function DeleteMessageModal({ open, onOpenChange, message }) {
  const { deleteMessage } = useContactStore()
  const [confirmText, setConfirmText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  // const { toast } = useToast()

  if (!message) return null

  const expectedText = `${message.firstName} ${message.lastName}`
  const canDelete = confirmText === expectedText

  const handleDelete = async () => {
    if (!canDelete) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    deleteMessage(message._id)
    setConfirmText("")
    setIsLoading(false)
    onOpenChange(false)

    // toast({
    //   title: "Message deleted",
    //   description: `Message from ${message.firstName} ${message.lastName} has been permanently deleted`,
    //   variant: "destructive",
    // })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Delete Message
          </DialogTitle>
          <DialogDescription>This action cannot be undone. The message will be permanently deleted.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Warning */}
          <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="text-sm text-red-800">
              <p className="font-medium">Warning: This action is irreversible</p>
              <p>Once deleted, this message cannot be recovered.</p>
            </div>
          </div>

          {/* Message Preview */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {message.firstName[0]}
                    {message.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">
                    {message.firstName} {message.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">{message.email}</div>
                  <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{message.message}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confirmation */}
          <div className="space-y-2">
            <Label htmlFor="confirm">
              Type <span className="font-mono font-bold">{expectedText}</span> to confirm deletion:
            </Label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={expectedText}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setConfirmText("")
                onOpenChange(false)
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={!canDelete || isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Message
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
