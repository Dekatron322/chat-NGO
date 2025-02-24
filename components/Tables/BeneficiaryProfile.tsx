import React from "react"
import { RxDotsVertical } from "react-icons/rx"
import clsx from "clsx"

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
interface BeneProfileProps {
  beneficiary?: Beneficiary
}

const BeneProfile: React.FC<BeneProfileProps> = ({ beneficiary }) => {
  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-md xl:w-[400px]">
      <p className="text-center text-sm font-bold">Personal Details</p>

      <div className="mt-3  flex w-full flex-col items-center gap-2 rounded-lg border border-[#53DB92] p-3">
        <img src="/DashboardImages/Avatar copy 4.png" />
        <div className="flex items-center gap-3">
          <p className="font-semibold text-[#25396F]">
            {beneficiary?.first_name} {beneficiary?.last_name}
          </p>
          <img src="/DashboardImages/verify.png" />
        </div>
        <p className="text-[#25396F]">ID: {beneficiary?.beneficiary_id}</p>
        <div className="flex w-full items-center justify-between rounded-[24px]  bg-[#FAFAFA] px-4 py-2">
          <p className="text-sm text-[#25396F]">Gender</p>
          <p className="text-sm text-[#25396F]">{beneficiary?.gender}</p>
        </div>

        <div className="flex w-full items-center justify-between rounded-[24px]  bg-[#FAFAFA] px-4 py-2">
          <p className="text-sm text-[#25396F]">DOB</p>
          <p className="text-sm text-[#25396F]">{beneficiary?.dob}</p>
        </div>
        <div className="flex w-full items-center justify-between rounded-[24px]  bg-[#FAFAFA] px-4 py-2">
          <p className="text-sm text-[#25396F]">Status</p>
          <p className="text-sm text-[#25396F]">Verified</p>
        </div>
      </div>
    </div>
  )
}

export default BeneProfile
