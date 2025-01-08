"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import { Dash } from "utils"

import ProjectInfo from "components/Tables/ProjectInfo"
import { useRouter } from "next/navigation"
import ProjectSummary from "components/Tables/ProjectSummary"
import TabTable from "app/(order)/orders/orders-by-model/page"
import TransactionsInfo from "components/Tables/TransactionsInfo"
import Beneficieries from "components/Tables/Beneficieries"
import Image from "next/image"
import { IoFunnelOutline } from "react-icons/io5"
import { IoMdFunnel } from "react-icons/io"
import { RxCross2 } from "react-icons/rx"
import { useState } from "react"

interface PaymentAccount {
  id: number
  src: any
  name: string
  balance: string
  action: string
}

export default function PreOrder() {
  const [searchText, setSearchText] = useState("")
  const router = useRouter()

  const handleCancelSearch = () => {
    setSearchText("")
  }

  const confirmStatusChange = () => {
    console.log("Order canceled")
  }

  const handleGoBack = () => {
    router.back()
  }
  return (
    <section className="h-full w-full">
      <div className="flex min-h-screen w-full">
        <div className="flex w-full flex-col">
          <DashboardNav />

          <div className="flex flex-col px-16 max-sm:px-3">
            <button onClick={handleGoBack} className="flex items-center gap-2 md:my-8">
              <img src="/DashboardImages/Group.png" />
              <p className="text-sm">Go back</p>
            </button>

            <div className="flex gap-4">
              <div className="flex h-[48px] w-[380px] items-center justify-between gap-3 rounded-md border border-[#707FA3] px-3 py-1 text-[#707070]">
                <Image src="/DashboardImages/Search.svg" width={16} height={16} alt="Search Icon" />
                <input
                  type="text"
                  id="search"
                  placeholder="Search"
                  className="h-[46px] w-full bg-transparent outline-none"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                {searchText && <RxCross2 onClick={handleCancelSearch} style={{ cursor: "pointer" }} />}
              </div>
              <button className="button-oulined border-[#707FA3]" type="button">
                <IoMdFunnel />
                <p>Sort By</p>
              </button>
              <button onClick={confirmStatusChange} className="button-oulined border-[#707FA3]" type="button">
                <IoFunnelOutline />
                <p>Filter</p>
              </button>
            </div>
            <div className="max-sm-my-4 flex w-full gap-6 max-md:flex-col max-md:px-0">
              <div className="flex w-full items-start gap-6">
                <div className="flex w-full flex-col">
                  <Beneficieries />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
