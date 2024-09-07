import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Cash from "./Pages/Cash"
import { Toaster } from "react-hot-toast"
import Wishes from "./Pages/Wishes"

const App = () => {
  return (
    <>
      <Toaster position="top-center"/>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/cash" element={<Cash/>} />
        <Route path="/wishes" element={<Wishes/>} />
    </Routes>
    </>
  )
}

export default App