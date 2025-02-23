"use client"
import { useState } from "react"
import { RiArrowDownSLine } from "react-icons/ri"
import Approved from "./Approved"
import Pending from "./Pending"
import Rejected from "./Rejected"
import VendorTable from "./VendorTable"

export default function Vendors() {
  const [activeTab, setActiveTab] = useState("core")

  return (
    <section className="my-6 h-full w-full rounded-lg shadow-md">
      <div className="flex-col rounded-lg bg-white p-6">
        <div className="flex  w-full flex-col">
          <div className="flex flex-col">
            <div className="max-sm-my-4 flex w-full gap-6 max-md:flex-col max-md:px-0 ">
              {activeTab === "core" && (
                <div className="w-full">
                  <VendorTable />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
