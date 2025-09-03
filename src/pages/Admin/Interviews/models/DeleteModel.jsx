import React, { useCallback, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Loader } from "lucide-react"

const DeleteConfirmationModal = ({
    open,
    onOpenChange,
    onConfirm,
    item,
    loading,
    status
}) => {

    useEffect(() => {
        if (status >= 200 && status < 300) {
            onOpenChange(false)
        }
    }, [status])

    const handleConfirm = useCallback(() => {
        if (item?.id) {
            onConfirm(item.id)
            // Remove the automatic modal close timeout - let the parent handle this
            // The parent should handle closing the modal after successful deletion
        }
    }, [onConfirm, item?.id])

    const handleCancel = useCallback(() => {
        onOpenChange(false)
    }, [onOpenChange])

    // Don't render if no item is provided
    if (!item) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-5 w-5" />
                        Delete Confirmation
                    </DialogTitle>
                    <DialogDescription className="pt-2">
                        Are you sure you want to delete interview schedule for <strong>{item.candidateName}</strong>? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button 
                        variant="outline" 
                        onClick={handleCancel}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button 
                        variant="destructive"
                        disabled={loading}
                        onClick={handleConfirm}
                    >
                        {loading ? (
                            <span className="flex items-center space-x-2">
                                <Loader className="animate-spin h-4 w-4" />
                                <span>Deleting...</span>
                            </span>
                        ) : (
                            "Delete"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteConfirmationModal