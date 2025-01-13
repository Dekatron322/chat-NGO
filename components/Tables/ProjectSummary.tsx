import React, { useEffect, useState } from "react"
import { RxDotsVertical } from "react-icons/rx"
import axios from "axios"

const ProjectSummary = () => {
  const [projectData, setProjectData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Retrieve project ID from localStorage
    const projectId = localStorage.getItem("projectId")

    if (projectId) {
      // Fetch project information based on the stored ID
      const fetchProjectData = async () => {
        try {
          const response = await axios.get(`https://api.shalomescort.org/project/project/${projectId}/`)
          setProjectData(response.data)
          setLoading(false)
        } catch (err) {
          setError("Failed to fetch project data")
          setLoading(false)
        }
      }

      fetchProjectData()
    } else {
      setError("No project ID found in localStorage")
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="w-full rounded-lg bg-white p-4 shadow-md xl:w-[400px]">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (!projectData) {
    return <p>No project data available</p>
  }

  const formatDate = (isoDate: string | null | undefined) => {
    if (!isoDate) return "Invalid date" // Handle null or undefined
    const date = new Date(isoDate)

    if (isNaN(date.getTime())) return "Invalid date" // Handle invalid date strings

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const calculateBeneficiaryShare = () => {
    const { budget, beneficiarys } = projectData
    if (!budget || !beneficiarys?.length) return "N/A" // Handle missing data
    return `N${(budget / beneficiarys.length).toFixed(2)}`
  }

  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-md xl:w-[400px]">
      <p className="text-sm font-bold">Project Summary</p>

      <div className="mt-3 gap-2 rounded-lg border border-[#53DB92] p-3">
        <div className="mt-1 flex items-center justify-between">
          <p className="font-semibold text-[#25396F]">{projectData.title}</p>
          <div className="rounded-full bg-[#F5F6F8] p-2">
            <RxDotsVertical />
          </div>
        </div>
        <div className="mb-5 mt-1 flex items-center gap-2">
          <img src="/DashboardImages/Vector.png" />
          <p className="text-[#707FA3]">{projectData.beneficiarys?.length || 0} Beneficiaries</p>
        </div>
        <div className="flex w-full items-start justify-between gap-2 border-b py-2">
          <p className="text-sm text-[#25396F]">SDG</p>
          <p className="text-sm text-[#25396F]">{projectData.sdg}</p>
        </div>

        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Project Currency</p>
          <p className="text-sm text-[#25396F]">{projectData.currency}</p>
        </div>

        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Budget</p>
          <p className="text-sm text-[#25396F]">N{projectData.budget || "N/A"}</p>
        </div>

        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Beneficiary Share</p>
          <p className="text-sm text-[#25396F]">{calculateBeneficiaryShare()}</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Description</p>
          <p className="text-sm text-[#25396F]">{projectData.description || "N/A"}</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Start date</p>
          <p className="text-sm text-[#25396F]">{formatDate(projectData.start_date) || "N/A"}</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">End date</p>
          <p className="text-sm text-[#25396F]">{formatDate(projectData.end_date) || "N/A"}</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Country</p>
          <p className="text-sm text-[#25396F]">{projectData.country || "N/A"}</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Location</p>
          <p className="text-sm text-[#25396F]">{projectData.state || "N/A"}</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Created</p>
          <p className="text-sm text-[#25396F]">{formatDate(projectData.pub_date)}</p>
        </div>
      </div>
      <div className="my-5 flex items-center gap-3">
        <p className="text-[#17CE89]">Project version history</p>
        <img src="/DashboardImages/Vector copy.png" />
      </div>
      <div className="mt-3 gap-2 rounded-lg border border-[#53DB92] p-3">
        <div className="flex w-full items-center justify-between py-2">
          <p className="text-sm text-[#25396F]">Amount Unspent:</p>
          <p className="text-sm text-[#25396F]">NGN180,000.00</p>
        </div>

        <button className="mt-2 w-full rounded-md border border-[#17CE89] p-2 text-[#17CE89]">Withdraw Funds</button>
      </div>
    </div>
  )
}

export default ProjectSummary
