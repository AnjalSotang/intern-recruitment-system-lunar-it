import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useAuthStore } from "../../../../store/Auth"
import { Eye, EyeOff, Shield, ShieldCheck, Smartphone, AlertTriangle } from "lucide-react"
import { toast } from "react-toastify"

const ChangePassword = () => {
    const loading = useAuthStore(state => state.loading)
    const status = useAuthStore(state => state.status)
    const error = useAuthStore(state => state.error)
    const message = useAuthStore(state => state.message)
    const changePassword = useAuthStore(state => state.changePassword)
    
    // 2FA related state from store
    const twoFAStatus = useAuthStore(state => state.twoFAStatus)
    const qrCode = useAuthStore(state => state.qrCode)
    const twoFASecret = useAuthStore(state => state.twoFASecret)
    const get2FAStatus = useAuthStore(state => state.get2FAStatus)
    const enable2FA = useAuthStore(state => state.enable2FA)
    const verify2FASetup = useAuthStore(state => state.verify2FASetup)
    const disable2FA = useAuthStore(state => state.disable2FA)
    
    // Clear functions from the store
    const clearMessage = useAuthStore(state => state.clearMessage)
    const clearError = useAuthStore(state => state.clearError)
    const clear2FAState = useAuthStore(state => state.clear2FAState)

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
        disable2FA: false
    });

    // 2FA related local state
    const [show2FASetupDialog, setShow2FASetupDialog] = useState(false)
    const [show2FADisableDialog, setShow2FADisableDialog] = useState(false)
    const [setupOTPCode, setSetupOTPCode] = useState("")
    const [disable2FAData, setDisable2FAData] = useState({
        password: "",
        token: ""
    })
    const [setupStep, setSetupStep] = useState(1) // 1: QR Code, 2: Verify OTP

    // Toggle function
    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    // Load 2FA status on component mount
    useEffect(() => {
        get2FAStatus()
    }, [get2FAStatus])

    // Handle success message and clear it after showing
    useEffect(() => {
        if (message) {
            toast.success(message)
            clearMessage()
            
            // Handle specific success scenarios
            if (message.includes("2FA has been successfully enabled")) {
                setShow2FASetupDialog(false)
                setSetupStep(1)
                setSetupOTPCode("")
                clear2FAState()
            }
            
            if (message.includes("2FA has been disabled")) {
                setShow2FADisableDialog(false)
                setDisable2FAData({ password: "", token: "" })
            }
        }
    }, [message, clearMessage, clear2FAState])

    // Handle error message and clear it after showing
    useEffect(() => {
        if (error) {
            toast.error(error)
            clearError()
        }
    }, [error, clearError])

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }))
        setErrors((prev) => ({
            ...prev,
            [id]: "", // Clear error as user types
        }))
    }

    const validateForm = () => {
        let newErrors = {}

        if (!formData.currentPassword.trim()) {
            newErrors.currentPassword = "Current password is required"
        }

        if (!formData.newPassword.trim()) {
            newErrors.newPassword = "New password is required"
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = "Password must be at least 8 characters"
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Please confirm your new password"
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm Passwords do not match"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateForm()) return
        changePassword(formData)
    }

    // 2FA Functions
    const handleEnable2FA = async () => {
        setSetupStep(1)
        setSetupOTPCode("")
        clear2FAState()
        await enable2FA()
        setShow2FASetupDialog(true)
    }

    const handleVerify2FASetup = async () => {
        if (!setupOTPCode.trim()) {
            toast.error("Please enter the OTP code")
            return
        }
        await verify2FASetup(setupOTPCode)
    }

    const handleDisable2FA = async () => {
        if (!disable2FAData.password.trim() || !disable2FAData.token.trim()) {
            toast.error("Password and current OTP code are required")
            return
        }
        await disable2FA(disable2FAData)
    }

    const handle2FADialogClose = () => {
        setShow2FASetupDialog(false)
        setSetupStep(1)
        setSetupOTPCode("")
        clear2FAState()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {/* Password Change Section */}
                    <div>
                        <Label className="text-base font-medium">Change Password</Label>
                        <p className="text-sm text-muted-foreground mb-4">
                            Update your password to keep your account secure
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="space-y-2 relative">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input
                                    id="currentPassword"
                                    type={showPassword.current ? "text" : "password"}
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                />
                                <span
                                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                                    onClick={() => togglePasswordVisibility("current")}
                                >
                                    {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                                {errors.currentPassword && (
                                    <p className="text-sm text-red-500">{errors.currentPassword}</p>
                                )}
                            </div>

                            <div className="space-y-2 relative">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type={showPassword.new ? "text" : "password"}
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                <span
                                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                                    onClick={() => togglePasswordVisibility("new")}
                                >
                                    {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                                {errors.newPassword && (
                                    <p className="text-sm text-red-500">{errors.newPassword}</p>
                                )}
                            </div>

                            <div className="space-y-2 relative">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type={showPassword.confirm ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <span
                                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                                    onClick={() => togglePasswordVisibility("confirm")}
                                >
                                    {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                                )}
                            </div>

                            <Button type="submit" disabled={loading}>
                                {loading ? "Updating..." : "Update Password"}
                            </Button>
                        </form>
                    </div>

                    <Separator />

                    {/* Two-Factor Authentication Section */}
                    <div>
                        <Label className="text-base font-medium">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground mb-4">
                            Add an extra layer of security to your account
                        </p>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                                {twoFAStatus ? (
                                    <ShieldCheck className="h-5 w-5 text-green-600" />
                                ) : (
                                    <Shield className="h-5 w-5 text-gray-500" />
                                )}
                                <div>
                                    <p className="font-medium">
                                        {twoFAStatus ? "2FA Enabled" : "Enable 2FA"}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {twoFAStatus 
                                            ? "Your account is protected with two-factor authentication" 
                                            : "Use an authenticator app to secure your account"
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="space-x-2">
                                {twoFAStatus ? (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm">
                                                Disable 2FA
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="flex items-center gap-2">
                                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                                    Disable Two-Factor Authentication
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will remove the extra security layer from your account. 
                                                    You'll need to provide your password and current OTP code to confirm.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <div className="space-y-4">
                                                <div className="space-y-2 relative">
                                                    <Label htmlFor="disable2FAPassword">Current Password</Label>
                                                    <Input
                                                        id="disable2FAPassword"
                                                        type={showPassword.disable2FA ? "text" : "password"}
                                                        value={disable2FAData.password}
                                                        onChange={(e) => setDisable2FAData(prev => ({
                                                            ...prev, 
                                                            password: e.target.value
                                                        }))}
                                                        placeholder="Enter your current password"
                                                    />
                                                    <span
                                                        className="absolute right-3 top-9 cursor-pointer text-gray-500"
                                                        onClick={() => togglePasswordVisibility("disable2FA")}
                                                    >
                                                        {showPassword.disable2FA ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </span>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="disable2FAOTP">Current OTP Code</Label>
                                                    <Input
                                                        id="disable2FAOTP"
                                                        type="text"
                                                        value={disable2FAData.token}
                                                        onChange={(e) => setDisable2FAData(prev => ({
                                                            ...prev, 
                                                            token: e.target.value
                                                        }))}
                                                        placeholder="000000"
                                                        maxLength={6}
                                                    />
                                                </div>
                                            </div>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel 
                                                    onClick={() => setDisable2FAData({ password: "", token: "" })}
                                                >
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={handleDisable2FA}
                                                    disabled={loading}
                                                    className="bg-red-600 hover:bg-red-700"
                                                >
                                                    {loading ? "Disabling..." : "Disable 2FA"}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                ) : (
                                    <Button onClick={handleEnable2FA} disabled={loading} size="sm">
                                        {loading ? "Setting up..." : "Setup 2FA"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Session Management Section */}
                    <div>
                        <Label className="text-base font-medium">Session Management</Label>
                        <p className="text-sm text-muted-foreground mb-4">Manage your active sessions</p>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <p className="font-medium">Current Session</p>
                                    <p className="text-sm text-muted-foreground">Chrome on macOS • San Francisco, CA</p>
                                </div>
                                <Badge>Active</Badge>
                            </div>
                            <Button variant="outline" className="w-full bg-transparent">
                                Sign Out All Other Sessions
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>

            {/* 2FA Setup Dialog */}
            <Dialog open={show2FASetupDialog} onOpenChange={handle2FADialogClose}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Smartphone className="h-5 w-5" />
                            Setup Two-Factor Authentication
                        </DialogTitle>
                        <DialogDescription>
                            {setupStep === 1 
                                ? "Scan the QR code with your authenticator app"
                                : "Enter the verification code from your authenticator app"
                            }
                        </DialogDescription>
                    </DialogHeader>

                    {setupStep === 1 && qrCode && (
                        <div className="space-y-4">
                            <div className="flex justify-center p-4 bg-white rounded-lg">
                                <img 
                                    src={qrCode} 
                                    alt="2FA QR Code" 
                                    className="w-48 h-48"
                                />
                            </div>
                            <div className="text-center space-y-2">
                                <p className="text-sm font-medium">Can't scan the QR code?</p>
                                <p className="text-xs text-muted-foreground">
                                    Enter this code manually: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{twoFASecret}</code>
                                </p>
                            </div>
                            <Button 
                                onClick={() => setSetupStep(2)} 
                                className="w-full"
                            >
                                I've Added the Account
                            </Button>
                        </div>
                    )}

                    {setupStep === 2 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="setupOTP">Verification Code</Label>
                                <Input
                                    id="setupOTP"
                                    type="text"
                                    value={setupOTPCode}
                                    onChange={(e) => setSetupOTPCode(e.target.value)}
                                    placeholder="000000"
                                    maxLength={6}
                                    className="text-center text-lg tracking-widest"
                                />
                                <p className="text-xs text-muted-foreground text-center">
                                    Enter the 6-digit code from your authenticator app
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setSetupStep(1)}
                                    className="flex-1"
                                >
                                    Back
                                </Button>
                                <Button 
                                    onClick={handleVerify2FASetup}
                                    disabled={loading || setupOTPCode.length !== 6}
                                    className="flex-1"
                                >
                                    {loading ? "Verifying..." : "Verify & Enable"}
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default ChangePassword