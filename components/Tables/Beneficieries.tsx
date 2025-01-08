"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import AltimaCoreOrders from "components/Tables/AltimaCoreOrders"
import AltimaEliteOrders from "components/Tables/AltimaEliteOrders"
import CompletedOrders from "components/Tables/CompletedOrders"
import { useState } from "react"
import { PiTableDuotone } from "react-icons/pi"
import { RiArrowDownSLine } from "react-icons/ri"
import Approved from "./Approved"
import Pending from "./Pending"
import Rejected from "./Rejected"

export default function Beneficieries() {
  const [activeTab, setActiveTab] = useState("elite")

  return (
    <section className="my-6 h-full w-full rounded-lg shadow-md">
      <div className="flex-col rounded-lg bg-white">
        <div className="flex w-full items-center justify-between p-4">
          <p className=" text-lg font-semibold text-[#25396F]">Project Beneficieries</p>
          <div className="flex items-center gap-3">
            <p className="text-sm">Filter by:</p>

            <p className="text-sm">Today</p>
            <RiArrowDownSLine />
          </div>
        </div>

        <div className="flex items-center justify-between  px-4 pt-3">
          <div className="flex gap-5">
            <div
              className={`flex cursor-pointer items-center gap-1 ${
                activeTab === "core" ? " border-b-2 border-[#17CE89] px-3 pb-1 font-semibold" : ""
              }`}
              onClick={() => setActiveTab("core")}
            >
              <p className="bottom-bar">Approved</p>
            </div>

            <div
              className={`flex cursor-pointer items-center gap-1 ${
                activeTab === "elite" ? "border-b-2 border-[#17CE89] px-3 pb-1 font-semibold" : ""
              }`}
              onClick={() => setActiveTab("elite")}
            >
              <p className="bottom-bar">Pending</p>
            </div>
            <div
              className={`flex cursor-pointer items-center gap-1 ${
                activeTab === "rejected" ? "border-b-2 border-[#17CE89] px-3 pb-1 font-semibold" : ""
              }`}
              onClick={() => setActiveTab("rejected")}
            >
              <p className="bottom-bar">Rejected</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-md border border-[#17CE89] px-4 py-2 text-sm text-[#17CE89]">
              <img src="/DashboardImages/Cloud Import.png" />
              Import Beneficiaries
            </button>
            <button className="flex items-center gap-2 rounded-md border border-[#17CE89] bg-[#17CE89] px-4 py-2 text-sm text-[#ffffff]">
              <img src="/DashboardImages/excel-file copy.png" />
              Export
            </button>
          </div>
        </div>
        <div className="flex  w-full flex-col">
          <div className="flex flex-col">
            <div className="max-sm-my-4 flex w-full gap-6 max-md:flex-col max-md:px-0 ">
              {activeTab === "core" && (
                <div className="w-full">
                  <Approved />
                </div>
              )}
              {activeTab === "elite" && (
                <div className="w-full">
                  <Pending />
                </div>
              )}
              {activeTab === "rejected" && (
                <div className="w-full">
                  <Rejected />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
