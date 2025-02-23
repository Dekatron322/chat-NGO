"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import { Dash } from "utils"
import ProjectInfo from "components/Tables/ProjectInfo"
import { useRouter } from "next/navigation"
import ProjectSummary from "components/Tables/ProjectSummary"
import TabTable from "app/(order)/orders/orders-by-model/page"
import TransactionsInfo from "components/Tables/TransactionsInfo"
import BeneProfile from "components/Tables/BeneficiaryProfile"
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs"
import BeneficiaryTransactionInfo from "components/Tables/BeneficiaryTransactionInfo"
import { useEffect, useState } from "react"

interface Beneficiary {
  id: string
  beneficiary_id: string
  beneficiary_type: string
  first_name: string
  last_name: string
  gender: string
  dob: string
  age: string
  age2: string
  category: string
  location: string // JSON string; can be parsed into an object
  created_at: string
  status: boolean
  pub_date: string
}

export default function BeneficiaryProfile() {
  const router = useRouter()
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Retrieve the beneficiary ID from localStorage
    const beneficiaryId = localStorage.getItem("beneficiaryId")

    if (beneficiaryId) {
      // Fetch beneficiary data from the API
      fetch(`https://api.shalomescort.org/beneficiary/beneficiary/${beneficiaryId}/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch beneficiary data")
          }
          return response.json()
        })
        .then((data) => {
          setBeneficiary(data as any) // Set the fetched beneficiary data
        })
        .catch((error) => {
          setError("Error fetching beneficiary data")
          console.error("Error:", error)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setError("Beneficiary ID not found in localStorage")
      setLoading(false)
    }
  }, [])

  const handleGoBack = () => {
    router.back()
  }

  if (loading) {
    return <p className="text-center">Loading beneficiary data...</p>
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }

  if (!beneficiary) {
    return <p className="text-center">No beneficiary data found.</p>
  }

  return (
    <section className="h-full w-full">
      <div className="flex min-h-screen w-full">
        <div className="flex w-full flex-col">
          <DashboardNav />

          <div className="flex flex-col px-16 max-2xl:px-6 max-sm:px-3">
            <button onClick={handleGoBack} className="flex items-center gap-2 md:my-8">
              <img src="/DashboardImages/Group.png" />
              <p className="text-sm">Go back</p>
            </button>
            <div className="max-sm-my-4 flex w-full gap-6 max-md:px-0 ">
              <div className="flex w-full items-start gap-6">
                <div className="flex flex-col md:w-[70%] 2xl:w-full">
                  <div className="flex w-full gap-6 max-lg:grid max-lg:grid-cols-2">
                    <div className="flex w-full cursor-pointer gap-4 max-xl:flex-col">
                      <div className="small-card flex w-1/3 items-start gap-2 rounded-md bg-white  shadow-md transition duration-500">
                        <img src="/DashboardImages/Group 7843.png" className="max-2xl:h-10 max-2xl:w-10" />

                        <div className="flex w-full items-start justify-between">
                          <div className="w-full  pb-2">
                            <h5 className="mb-2 font-medium text-[#727272] max-2xl:text-sm">Total Received</h5>
                            <h5 className="text-xl font-medium max-2xl:text-lg">N50,000.00</h5>
                          </div>
                          <div className="flex items-start text-[#24B29F]">
                            <p>12%</p>
                            <BsArrowUpShort />
                          </div>
                        </div>
                      </div>
                      <div className="small-card flex w-1/3 items-start gap-2 rounded-md bg-white p-2 shadow-md transition duration-500">
                        <img src="/DashboardImages/Group 7844.png" className="max-2xl:h-10 max-2xl:w-10" />
                        <div className="flex w-full items-start justify-between">
                          <div className="w-full  pb-2">
                            <h5 className="mb-2 font-medium text-[#727272] max-2xl:text-sm">Total Spent</h5>
                            <h5 className="text-xl font-medium max-2xl:text-lg">N45,000.00</h5>
                          </div>
                          <div className="flex items-start  text-[#24B29F]">
                            <p>12%</p>
                            <BsArrowUpShort />
                          </div>
                        </div>
                      </div>
                      <div className="small-card flex w-1/3 items-start gap-2 rounded-md bg-white p-2 shadow-md transition duration-500">
                        <img src="/DashboardImages/Group 7844 copy.png" className="max-2xl:h-10 max-2xl:w-10" />

                        <div className="flex w-full items-start justify-between">
                          <div className="w-full  pb-2">
                            <h5 className="mb-2 font-medium text-[#727272] max-2xl:text-sm">Total Balance</h5>
                            <h5 className="text-xl font-medium max-2xl:text-lg">N5,000.00</h5>
                          </div>
                          <div className="flex items-start  text-[#FF725E]">
                            <p>12%</p>
                            <BsArrowDownShort />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <ProjectInfo /> */}

                  <BeneficiaryTransactionInfo />
                </div>

                {/* Pass the beneficiary data to the BeneProfile component */}
                <BeneProfile beneficiary={beneficiary} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
