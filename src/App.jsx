import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Cash from "./Pages/Cash"
import { Toaster } from "react-hot-toast"
import Wishes from "./Pages/Wishes"
import Admin from "./Pages/Admin"

const App = () => {
  return (
    <>
      <Toaster position="top-center"/>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/cash" element={<Cash/>} />
        <Route path="/wishes" element={<Wishes/>} />
        <Route path="/admin" element={<Admin/>} />
    </Routes>
    </>
  )
}

export default App