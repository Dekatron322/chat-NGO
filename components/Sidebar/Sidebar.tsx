"use client"
import Link from "next/link"
import React, { useState } from "react"
import { Links } from "./Links"
import { CollapsedLogoIcon, LogoIcon } from "./Icons"

import clsx from "clsx"

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(false)}
      className={clsx("sidebar flex h-full flex-col justify-between border-r border-[#E4E4E4] max-sm:hidden", {
        "w-20": isCollapsed,
        "w-64": !isCollapsed,
      })}
    >
      <div className="h-full justify-between border-0 border-red-700 lg:mt-6 lg:h-auto lg:space-y-4">
        <div className=" px-7 transition-opacity lg:block">
          <Link href="/">{isCollapsed ? <CollapsedLogoIcon /> : <LogoIcon />}</Link>
        </div>

        <div className="mb-2 h-full  border-[#E4E4E4] lg:h-auto lg:space-y-1">
          <Links isCollapsed={isCollapsed} />
        </div>
        {/* <div className="h-full border-b border-[#E4E4E4] lg:h-auto lg:space-y-1">
          <SecondLinks isCollapsed={isCollapsed} />
        </div> */}
      </div>
      <div className="my-6  flex h-auto flex-col  justify-between border-t  px-6">
        <div className="flex items-center space-x-2 border-0 border-black pt-5 text-[#707FA3] ">
          <img src="/DashboardImages/Vector (1).png" />
          <p className=" hidden text-xs font-semibold lg:block 2xl:text-base">Settings</p>
        </div>
        <div className="flex items-center space-x-2 border-0 border-black pt-5 text-[#E42C66] ">
          <img src="/DashboardImages/Group (2).png" />
          <p className=" hidden text-xs font-semibold lg:block 2xl:text-base">Log Out</p>
        </div>
      </div>
    </div>
  )
}

export default SideBar
