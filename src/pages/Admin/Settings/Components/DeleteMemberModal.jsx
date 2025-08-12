import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Trash2, AlertTriangle, Loader2 } from "lucide-react"
import { useMemberStore } from "../../../../store/MemberStore"

export default function DeleteMemberModal({ open, onOpenChange, member }) {
  const deleteMember = useMemberStore(state => state.deleteMember)
  const loading = useMemberStore(state => state.loading)
  const [confirmationText, setConfirmationText] = useState("")

  const handleDelete = async () => {
    if (!member) return
    console.log(member._id)
    deleteMember(member._id)
    setConfirmationText("")
    onOpenChange(false)

  }

  const isConfirmationValid = confirmationText === member?.name

  if (!member) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Remove Team Member
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently remove the team member from your organization.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Warning:</strong> Removing this team member will:
              <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                <li>Revoke their access to the system immediately</li>
                <li>Remove them from all assigned interviews and applications</li>
                <li>Delete their activity history and notes</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="rounded-lg border p-4 space-y-2">
            <h4 className="font-medium">Team Member Details:</h4>
            <div className="text-sm space-y-1">
              <p>
                <strong>Name:</strong> {member.name}
              </p>
              <p>
                <strong>Email:</strong> {member.email}
              </p>
              <p>
                <strong>Role:</strong> {member.role}
              </p>
              <p>
                <strong>Status:</strong> {member.status}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmation">
              Type <strong>{member.name}</strong> to confirm deletion:
            </Label>
            <Input
              id="confirmation"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder={`Type "${member.name}" here`}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setConfirmationText("")
              onOpenChange(false)
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading || !isConfirmationValid}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Remove Member
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
