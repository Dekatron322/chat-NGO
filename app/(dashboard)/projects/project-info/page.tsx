"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import { Dash } from "utils"

import ProjectInfo from "components/Tables/ProjectInfo"
import { useRouter } from "next/navigation"
import ProjectSummary from "components/Tables/ProjectSummary"
import TabTable from "app/(order)/orders/orders-by-model/page"
import TransactionsInfo from "components/Tables/TransactionsInfo"
import Link from "next/link"

interface PaymentAccount {
  id: number
  src: any
  name: string
  balance: string
  action: string
  link: string
}

export default function PreOrder() {
  const router = useRouter()

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
            <div className="max-sm-my-4 flex w-full gap-6 max-md:flex-col max-md:px-0">
              <div className="flex w-full items-start gap-6">
                <div className="flex w-full flex-col">
                  <div className="flex w-full gap-6 max-lg:grid max-lg:grid-cols-2">
                    {Dash.map((account: PaymentAccount) => (
                      <div key={account.id} className="flex w-full cursor-pointer gap-2">
                        <div className="small-card rounded-md bg-white p-2 shadow-md transition duration-500">
                          <h5 className="mb-4 font-medium text-[#727272]">{account.name}</h5>
                          <div className="flex items-end justify-between">
                            <div className="w-full border-b pb-2">
                              <h5 className="text-3xl font-medium max-sm:text-lg">{account.balance}</h5>
                            </div>
                          </div>

                          <div className="mt-5 flex w-full items-center justify-end gap-4">
                            <Link
                              href={account.link}
                              className="flex items-center justify-center gap-3 rounded-md border-2 border-[#17CE89] px-4 py-2 text-[#17CE89]"
                            >
                              <img src="/DashboardImages/user-tag.png" />
                              <p className="text-sm">{account.action}</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <ProjectInfo />
                  <TabTable />
                  <TransactionsInfo />
                </div>

                {/* Sticky ProjectSummary */}
                {/* <div className="sticky top-16 h-fit"> */}
                <ProjectSummary />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
