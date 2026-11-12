// import Navbar from "@/components"

import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* navbar */}
      <div className="mt-16 flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
