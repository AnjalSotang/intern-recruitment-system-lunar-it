import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "react-toastify"



const RescheduleInterviewModal = ({
    open,
    onOpenChange,
    interview,
    onReschedule,
    loading,
    status
}) => {
    console.log(interview)
    const [date, setDate] = useState()
    const [time, setTime] = useState("")
    const [reason, setReason] = useState("")

    useEffect(() => {
        if(status>= 200 && status < 300){
           onOpenChange(false)
        setDate(undefined)
        setTime("")
        setReason("")
            }
         }, [status])


    const handleReschedule = () => {
        if (!interview || !date || !time) {
            toast.error("eroor")
            return
        }

        onReschedule(interview, interview.id, date.toISOString(), time, reason)
    
    }

    if (!interview) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Reschedule Interview</DialogTitle>
                    <DialogDescription>Reschedule the interview with {interview.candidateName}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Current Schedule</h4>
                        <p className="text-sm text-muted-foreground">
                            {format(new Date(interview.date), "PPP")} at {interview.time}
                        </p>
                    </div>

                    <div>
                        <Label>New Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a new date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div>
                        <Label htmlFor="time">New Time</Label>
                        <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>

                    <div>
                        <Label htmlFor="reason">Reason for Rescheduling (Optional)</Label>
                        <Textarea
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Provide a reason for rescheduling..."
                            rows={3}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleReschedule}
                    disabled={loading}> {loading ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="animate-spin h-4 w-4" />
                  <span>Rescheduling Interview...</span>
                </span>
              ) : (
                "Reschedule Interview"
              )}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RescheduleInterviewModal


