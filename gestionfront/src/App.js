import { BrowserRouter, Routes, Route, Router } from "react-router";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import CreatePost from "./pages/CreatePost";

export  default function App(){
  return (
    <>
    <Navbar/>

   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
  

    
    </>
  )
}