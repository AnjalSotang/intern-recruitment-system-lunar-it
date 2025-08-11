import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
// import useStore from "./store";
import { useEffect, useState } from 'react';
import './App.css'
import { ProtectedAdmin, ProtectedUser } from './Protected.jsx';
import HomePage from "./pages/User/Home/HomePage";
import About from "./pages/User/About/About";
import ViewDetails from "./pages/User/Details/ViewDetails";
import ContactUs from "./pages/User/Contact/ContactUs";
import Apply from "./pages/User/Apply/Apply";
import AdminApplication from "./pages/Admin/Applicants/Applicants";
// import Internship from "./pages/Admin/Internship/Internship";
import InternshipListings from "./pages/User/InternListing/InternListing";
// import UI from "./pages/Admin/Internship/UI";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Interview from "./pages/Admin/Interviews/Interview";
import Settings from "./pages/Admin/Settings/Settings"
import Position from "./pages/Admin/Position/Position";
import { DarkModeProvider } from "../contexts/DarkModeContext";
import Login from "./pages/Login/Login";



function App() {


  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/Details/:id" element={<ViewDetails />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/Apply" element={<Apply />} />
          <Route path="/Internship" element={<InternshipListings />} />
          {/* <Route path="/admin/internship" element={<ProtectedAdmin><Internship /></ProtectedAdmin>} /> */}
          <Route path="/admin/applications" element={<ProtectedAdmin><AdminApplication /></ProtectedAdmin>} />
          {/* <Route path="/admin/UI" element={<ProtectedAdmin><UI /></ProtectedAdmin>} /> */}
          <Route path="/admin/dashboards" element={<ProtectedAdmin><Dashboard /></ProtectedAdmin>} />
          <Route path="/admin/interviews" element={<ProtectedAdmin><Interview /></ProtectedAdmin>} />
          <Route path="/admin/settings" element={<ProtectedAdmin><Settings /></ProtectedAdmin>} />
          <Route path="/admin/positions" element={<ProtectedAdmin><Position /></ProtectedAdmin>} />
          {/* <Route path="/Internship" element={<Internship/>}></Route> */}

          {/* <Route path="/Login" element={<Login/>} /> */}
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>

  );
}

export default App
