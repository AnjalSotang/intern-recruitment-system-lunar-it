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
import { useApplicationStore } from '../../../../store/AppliactionStore'
import { useEffect } from "react"

const DeleteConfirmationModal = ({
    open,
    onOpenChange,
    onConfirm,
    title = "Delete Application",
    description,
    itemName,
}) => {

    const {loading, status} = useApplicationStore();

    useEffect(() => {
        if (status >= 200 && status < 300) {
            onOpenChange(false);
        }
    }, [status, onOpenChange]);
    const handleConfirm = () => {
        onConfirm()

    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-5 w-5" />
                        {title}
                    </DialogTitle>
                    <DialogDescription className="pt-2">
                        {description ||
                            `Are you sure you want to delete ${itemName ? `"${itemName}"` : "this application"}? This action cannot be undone.`}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>

                    <Button variant="destructive"
                        disabled={loading}
                        onClick={handleConfirm}>
                        {loading ? (
                            <span className="flex items-center space-x-2">
                                <Loader className="animate-spin h-4 w-4" />
                                <span>XOXO...</span>
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

export default DeleteConfirmationModal;
