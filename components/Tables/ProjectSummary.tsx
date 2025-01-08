import React from "react"
import { RxDotsVertical } from "react-icons/rx"
import clsx from "clsx"

const ProjectSummary = () => {
  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-md xl:w-[400px]">
      <p className="text-center text-sm font-bold">Personal Details</p>

      <div className="mt-1 flex items-center justify-between">
        <p className="font-semibold text-[#25396F]">Feed the Poor</p>
        <div className="rounded-full bg-[#F5F6F8] p-2">
          <RxDotsVertical />
        </div>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <img src="/DashboardImages/Vector.png" />
        <p className="text-[#707FA3]">284 Beneficiaries</p>
      </div>
      <div className="mt-3  gap-2 rounded-lg border border-[#53DB92] p-3">
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">SDG</p>
          <p className="text-sm text-[#25396F]">1,2,3,8</p>
        </div>

        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Project Currency</p>
          <p className="text-sm text-[#25396F]">Naira</p>
        </div>

        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Budget</p>
          <p className="text-sm text-[#25396F]">N5,000,000.00</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Amount Funded</p>
          <p className="text-sm text-[#25396F]">N1,500,000.00</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Criteria</p>
          <p className="text-sm text-[#25396F]">Equally</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Description</p>
          <p className="text-sm text-[#25396F]">Short description</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Start date</p>
          <p className="text-sm text-[#25396F]">12 Dec, 2020</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">End date</p>
          <p className="text-sm text-[#25396F]">12 Dec, 2020</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Country</p>
          <p className="text-sm text-[#25396F]">Nigeria</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Location</p>
          <p className="text-sm text-[#25396F]">Ikeja, Lagos, Nigeria</p>
        </div>
        <div className="flex w-full items-center justify-between border-b py-2">
          <p className="text-sm text-[#25396F]">Created</p>
          <p className="text-sm text-[#25396F]">12 Dec, 2020</p>
        </div>
      </div>
      <div className="my-5 flex items-center gap-3">
        <p className="text-[#17CE89]">Project version history</p>
        <img src="/DashboardImages/Vector copy.png" />
      </div>
      <div className="mt-3  gap-2 rounded-lg border border-[#53DB92] p-3">
        <div className="flex w-full items-center justify-between  py-2">
          <p className="text-sm text-[#25396F]">Amount Unspent:</p>
          <p className="text-sm text-[#25396F]">NGN180,000.00</p>
        </div>

        <button className="mt-2 w-full rounded-md border border-[#17CE89] p-2 text-[#17CE89]">Withdraw Funds</button>
      </div>
    </div>
  )
}

export default ProjectSummary
