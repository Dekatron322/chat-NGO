import React, { useState } from "react"
import { RxCaretSort, RxCross2, RxDotsVertical } from "react-icons/rx"
import { PiShieldChevronFill, PiShieldPlusFill } from "react-icons/pi"
import Image from "next/image"
import { IoMdFunnel } from "react-icons/io"
import { IoFunnelOutline } from "react-icons/io5"
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6"
import Select from "react-select"

import { LiaTimesSolid } from "react-icons/lia"
import { FiXCircle } from "react-icons/fi"
import { FaRegCheckCircle } from "react-icons/fa"
import Dropdown from "components/Dropdown/Dropdown"
import { RiArrowDownSLine } from "react-icons/ri"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import Link from "next/link"

type SortOrder = "asc" | "desc" | null
type Order = {
  beneficiary: string
  image: any
  amount: string
  status: string

  date: string
  vendor: string
}

type OptionType = {
  value: string
  label: string
}

const TransactionsInfo = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([])

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  const router = useRouter() // Initialize the router

  const handleView = async (event: React.FormEvent<HTMLFormElement>) => {
    // Redirect to the success page
    router.push("/projects/project-info")
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [isModalReminderOpen, setIsModalReminderOpen] = useState(false)

  const handleCancelOrder = () => {
    setIsModalOpen(true)
  }

  const handleStatusOrder = () => {
    setIsStatusModalOpen(true)
  }

  const confirmStatusChange = () => {
    console.log("Order canceled")
    setIsStatusModalOpen(false)
  }

  const confirmCancellation = () => {
    console.log("Order canceled")
    setIsModalOpen(false)
  }

  const closeReminderModal = () => {
    setIsModalReminderOpen(false)
  }

  const handleCancelReminderOrder = () => {
    setIsModalReminderOpen(true)
  }

  const confirmReminder = () => {
    console.log("Reminder Sent")
    setIsModalReminderOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const closeStatusModal = () => {
    setIsStatusModalOpen(false)
  }

  const [orders, setOrders] = useState<Order[]>([
    {
      beneficiary: "Janet Woodpecker",
      image: "/DashboardImages/Avatar copy 2.png",
      vendor: "Mutiu Adepoju",
      amount: "NGN25,000",
      status: "Completed",

      date: "Dec 3, 2020 | 12:45 pm",
    },
    {
      beneficiary: "Janet Woodpecker",
      image: "/DashboardImages/Avatar copy 2.png",
      vendor: "Mutiu Adepoju",
      amount: "NGN25,000",
      status: "Pending",

      date: "Dec 3, 2020 | 12:45 pm",
    },
    {
      beneficiary: "Janet Woodpecker",
      image: "/DashboardImages/Avatar copy 2.png",
      vendor: "Mutiu Adepoju",
      amount: "NGN25,000",
      status: "Completed",

      date: "Dec 3, 2020 | 12:45 pm",
    },
    {
      beneficiary: "Janet Woodpecker",
      image: "/DashboardImages/Avatar copy 2.png",
      vendor: "Mutiu Adepoju",
      amount: "NGN25,000",
      status: "Failed",

      date: "Dec 3, 2020 | 12:45 pm",
    },
  ])

  const doorModelIcons: Record<string, React.ReactNode> = {
    "Alima Core": <PiShieldChevronFill className="size-5" />,
    "Alima Elite": <PiShieldPlusFill className="size-5" />,
  }

  const getPaymentStyle = (tag: string) => {
    switch (tag) {
      case "Completed":
        return { backgroundColor: "#EEFCF6", color: "#35C78A" }
      case "Pending":
        return { backgroundColor: "#FFFDED", color: "#F2994A" }
      case "Failed":
        return { backgroundColor: "#FAE8EE", color: "#E42C66" }
      default:
        return {}
    }
  }

  const dotStyle = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "Completed":
        return { backgroundColor: "#35C78A" }
      case "Pending":
        return { backgroundColor: "#F2994A" }
      case "Failed":
        return { backgroundColor: "#E42C66" }
      default:
        return {}
    }
  }

  const toggleSort = (column: keyof Order) => {
    const isAscending = sortColumn === column && sortOrder === "asc"
    setSortOrder(isAscending ? "desc" : "asc")
    setSortColumn(column) // Now correctly typed to accept `string`

    const sortedOrders = [...orders].sort((a, b) => {
      if (a[column] < b[column]) return isAscending ? 1 : -1
      if (a[column] > b[column]) return isAscending ? -1 : 1
      return 0
    })

    setOrders(sortedOrders) // Ensure `setOrders` is also correctly typed
  }

  const handleCancelSearch = () => {
    setSearchText("")
  }

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase()))
  )

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = filteredOrders.slice(indexOfFirstRow, indexOfLastRow)

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage)

  const changePage = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page)
  }

  // Handle row selection
  const handleRowsChange = (event: { target: { value: any } }) => {
    setRowsPerPage(Number(event.target.value))
    setCurrentPage(1) // Reset to the first page
  }

  return (
    <div className="flex-3 relative  mb-10 flex flex-col rounded-md">
      <div className=" w-full overflow-x-auto rounded-[10px] bg-white shadow-md">
        <div className="flex items-center justify-between px-5 py-4 text-[#25396F]">
          <p className="text-lg font-semibold">Project Transactions </p>
          <div className="flex items-center gap-3">
            <p className="text-sm">Filter by:</p>

            <p className="text-sm">Today</p>
            <RiArrowDownSLine />
            <button className="flex items-center gap-2 rounded-md border border-[#17CE89] px-4 py-2">
              <img src="/DashboardImages/excel-file.png" />
              <p className="text-[#17CE89]">Excel </p>
            </button>
          </div>
        </div>
        <table className="w-full min-w-[1000px] border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th
                className="flex cursor-pointer items-center gap-2 whitespace-nowrap  bg-[#F7F7F7] p-4 text-sm"
                onClick={() => toggleSort("beneficiary")}
              >
                Name <RxCaretSort />
              </th>

              <th
                className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                onClick={() => toggleSort("vendor")}
              >
                <p className="flex items-center gap-2">
                  Vendor <RxCaretSort />
                </p>
              </th>
              <th
                className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                onClick={() => toggleSort("amount")}
              >
                <p className="flex items-center gap-2">
                  Amount (NGN) <RxCaretSort />
                </p>
              </th>
              <th
                className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                onClick={() => toggleSort("status")}
              >
                <p className="flex items-center gap-2">
                  Status <RxCaretSort />
                </p>
              </th>
              <th
                className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                onClick={() => toggleSort("date")}
              >
                <p className="flex items-center gap-2">
                  Date <RxCaretSort />
                </p>
              </th>

              <th className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"></th>
            </tr>
          </thead>
          <tbody className="text-[#25396F]">
            {currentRows.map((order, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-[#FCFCFE]"} // Alternating row colors
              >
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <img src={order.image} />
                    {order.beneficiary}
                  </div>
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <div className="flex items-center gap-2 pr-4">{order.vendor}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">{order.amount}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <div className="flex">
                    <div
                      style={getPaymentStyle(order.status)}
                      className="flex items-center justify-center gap-1 rounded-full px-2 py-1"
                    >
                      <span className="pr-l size-2 rounded-full" style={dotStyle(order.status)}></span>
                      {order.status}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">{order.date}</div>
                </td>

                <td className="whitespace-nowrap px-4 py-1 text-sm">
                  <div className="flex items-center gap-2">
                    <RxDotsVertical />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-1">
            <p>Items</p>
            <select value={rowsPerPage} onChange={handleRowsChange} className=" border bg-[#F2F2F2] p-1">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center ">
            <button
              className={`px-2 ${currentPage === 1 ? "cursor-not-allowed text-gray-400" : "text-[#000000]"}`}
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaCircleChevronLeft />
            </button>

            {/* <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`flex h-[27px] w-[30px] items-center justify-center rounded-md ${
                    currentPage === index + 1 ? "bg-[#000000] text-white" : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div> */}

            <p>
              Showing {currentPage} of {totalPages}
            </p>

            <button
              className={`px-2  ${currentPage === totalPages ? "cursor-not-allowed text-gray-400" : "text-[#000000]"}`}
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaCircleChevronRight />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-style w-80 rounded-md p-4 shadow-md">
            <div className="flex justify-between">
              <h2 className="mb-4 text-lg font-medium">Cancel Order</h2>
              <LiaTimesSolid onClick={closeModal} className="cursor-pointer" />
            </div>
            <div className="my-3 flex w-full items-center justify-center">
              <img src="/DashboardImages/WarningCircle.png" alt="" />
            </div>
            <p className="mb-4 text-center text-xl font-medium">Are you sure you want to cancel this Order</p>
            <div className="flex w-full justify-between gap-3">
              <button className="button__primary flex w-full" onClick={confirmCancellation}>
                <FaRegCheckCircle />
                <p className="text-sm">Yes, Cancel</p>
              </button>
              <button className="button__danger w-full" onClick={closeModal}>
                <FiXCircle />
                <p className="text-sm">No, Leave</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionsInfo