import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import { useState } from 'react';
import './App.css'

// import Apply from "./pages/Apply";
// import ViewDetails from "./pages/ViewDetails";
// import Internship from "./pages/Internship";
// import About from "./pages/About";
// import ContactUs from "./pages/ContactUs";
// import Login from "./pages/Login";
import HomePage from "./pages/User/Home/HomePage";
import About from "./pages/User/About/About";
import ViewDetails from "./pages/User/Details/ViewDetails";
import ContactUs from "./pages/User/Contact/ContactUs";
import Apply from "./pages/User/Apply/Apply";
import AdminApplication from "./pages/Admin/Application/Applications";
import Internship from "./pages/Admin/Internship/Internship";
import UI from "./pages/Admin/Internship/UI";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Interview from "./pages/Admin/Interviews/Interview";
import Settings from "./pages/Admin/Settings/Settings"



function App() {



  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route path="/landing" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/Details/:id" element={<ViewDetails />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/Apply" element={<Apply />} />
        <Route path="/admin/Internship" element={<Internship />} />
        <Route path="/admin/Application" element={<AdminApplication />} />
        <Route path="/admin/UI" element={<UI />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/Interviews" element={<Interview />} />
        <Route path="/admin/settings" element={<Settings />} />
        {/* <Route path="/Internship" element={<Internship/>}></Route> */}

        {/* <Route path="/Login" element={<Login/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
