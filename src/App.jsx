import { BrowserRouter, Routes, Route } from "react-router-dom";
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


function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/Details/:id" element={<ViewDetails />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/Apply" element={<Apply/>} />
        <Route path="/admin/Internship" element={<Internship/>} />
        <Route path="/admin/Application" element={<AdminApplication/>} />
        <Route path="/admin/UI" element={<UI/>} />
        {/* <Route path="/Internship" element={<Internship/>}></Route> */}

        {/* <Route path="/Login" element={<Login/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
