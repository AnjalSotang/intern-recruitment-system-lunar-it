import { useEffect } from "react";
import { useAuthStore } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

export default function LoutPage () {
    const { logout } = useAuthStore()
    const redirect = useNavigate()
    useEffect(() => {
        logout()
        redirect("/login")
    }, [])
    return <div className="h-screen grid place-content-center">
        <Loader className="animate-spin duration-200" />
    </div>
}