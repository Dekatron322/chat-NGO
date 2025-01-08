"use client"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { RxCross2 } from "react-icons/rx"
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft"
import { motion } from "framer-motion"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import { GoMoon } from "react-icons/go"

const DashboardNav = () => {
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState("")
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isUtilitiesOpen, setIsUtilitiesOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  setTimeout(() => setLoading(false), 3000)

  const handleCancelSearch = () => {
    setSearchText("")
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  const toggleUtilities = () => {
    setIsUtilitiesOpen(!isUtilitiesOpen)
  }

  const pathname = usePathname()

  const getNavLinkClass = (path: string) => {
    return pathname === path ? "text-[#EEC202]" : "text-white"
  }

  const getNavImageSrc = (path: string, defaultSrc: string, activeSrc: string) => {
    return pathname === path ? activeSrc : defaultSrc
  }

  return (
    <>
      <nav className="containerbg  hidden  border-b px-16  py-4 max-sm:px-3 md:block">
        <div className="flexBetween">
          <p className="text-[28px] font-semibold text-[#25396F]">Projects</p>
          {/* <div className="flex content-center gap-32">
            <div className="flex h-[45px] w-[380px] items-center justify-between gap-3 rounded-lg border px-3 py-1 text-[#707070]">
              <Image src="/DashboardImages/Search.svg" width={16} height={16} alt="dekalo" />
              <input
                type="text"
                id="search"
                placeholder="Search"
                className="h-[50px] w-full bg-transparent outline-none focus:outline-none"
                style={{ width: "100%", height: "50px" }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && <RxCross2 onClick={handleCancelSearch} style={{ cursor: "pointer" }} />}
            </div>
          </div> */}

          <div className="flex gap-2">
            <div className="flex content-center items-center justify-center gap-2">
              <img src="/DashboardImages/Icon container.png" alt="avatar" />
              <img src="/DashboardImages/Icon container (1).png" alt="avatar" />
              <Image src="/DashboardImages/Avatar.png" width={48} height={48} alt="avatar" />
            </div>
          </div>
        </div>
      </nav>

      <nav className="block border-b bg-[#F2F6FD] px-16 py-4 max-md:px-3 md:hidden">
        <div className="flex items-center justify-between">
          <FormatAlignLeftIcon onClick={toggleNav} style={{ cursor: "pointer" }} />
          <Link href="/" className="content-center">
            <Image src="/AuthImages/amd-logo.png" width={150} height={43} alt="dekalo" />
          </Link>
          <div className="flex h-[50px] items-center justify-center gap-1 rounded-full bg-[#EDF2F7] px-1">
            <Image src="/DashboardImages/User.svg" width={40} height={40} alt="avatar" />
            <Image className="mr-4" src="/DashboardImages/dropdown.svg" width={15.68} height={15.68} alt="avatar" />
          </div>
        </div>

        <div
          className={`fixed left-0 top-0 z-50 h-full w-[250px] bg-[#044982] transition-transform duration-300 ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-end p-4">
            <RxCross2 className="text-white" onClick={toggleNav} style={{ cursor: "pointer" }} />
          </div>
          <div className="mt-4 flex flex-col items-start space-y-2 p-4">
            <Link href="/dashboard" className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/dashboard")}`}>
              <Image
                src={getNavImageSrc("/dashboard", "/Icons/Graph.svg", "/Icons/Graph-active.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Dashboard</p>
            </Link>

            <Link href="/estates" className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/estates")}`}>
              <Image
                src={getNavImageSrc("/estates", "/Icons/Estates.svg", "/Icons/Estates-active.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Estates</p>
            </Link>
            <Link href="/rents" className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/rents")}`}>
              <Image
                src={getNavImageSrc("/rents", "/Icons/Home.svg", "/Icons/Home-active.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Rents</p>
            </Link>
            <Link href="/properties" className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/properties")}`}>
              <Image
                src={getNavImageSrc("/properties", "/Icons/Property.svg", "/Icons/Property-active.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Properties</p>
            </Link>
            <div
              className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/utilities")}`}
              onClick={toggleUtilities}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={getNavImageSrc("/utilities", "/Icons/Utility.svg", "/Icons/Utility-active.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Utilities</p>
            </div>
            {isUtilitiesOpen && (
              <div className="ml-4 flex flex-col items-start space-y-2">
                <Link
                  href="/utilities/power"
                  className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/utilities/power")}`}
                >
                  <p className="mt-1">Power</p>
                </Link>
                <Link
                  href="/utilities/water"
                  className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/utilities/water")}`}
                >
                  <p className="mt-1">Water</p>
                </Link>
                <Link
                  href="/utilities/gas"
                  className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/utilities/gas")}`}
                >
                  <p className="mt-1">Gas</p>
                </Link>
              </div>
            )}
            <Link href="/chats" className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/chats")}`}>
              <Image
                src={getNavImageSrc("/chats", "/Icons/Chat.svg", "/Icons/Chat-active.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Chats</p>
            </Link>

            <Link
              href="/service-charge"
              className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/service-charge")}`}
            >
              <Image
                src={getNavImageSrc("/service-charge", "/Icons/Utility.svg", "/Icons/Utility-active.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Service Charge</p>
            </Link>

            <Link
              href="/visitors-management"
              className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/visitors-management")}`}
            >
              <Image
                src={getNavImageSrc("/visitors-management", "/Icons/Visitor.svg", "/Icons/Visitor-active.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Visitors Management</p>
            </Link>

            <Link href="/admin" className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/admin")}`}>
              <Image
                src={getNavImageSrc("/admin", "/Icons/Admin.svg", "/Icons/Admin-active.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Admin</p>
            </Link>

            <Link href="/logout" className="fixed bottom-2 mt-10 flex items-center gap-2 pb-4 text-white">
              <Image src="/Icons/Logout.svg" width={20} height={20} alt="logout" />
              <p className="mt-1">Logout</p>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default DashboardNav
