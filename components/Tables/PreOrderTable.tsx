import React, { useState } from "react"
import { RxCaretSort, RxCross2 } from "react-icons/rx"
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
  name: string
  total_funded: string
  amount_disbursed: string
  amount_spent: string
  date: string
  status: string
}

type OptionType = {
  value: string
  label: string
}

const options: OptionType[] = [
  { value: "1", label: "Abia" },
  { value: "2", label: "Adamawa" },
  { value: "3", label: "Benuw" },
  { value: "4", label: "Gombe" },
  { value: "5", label: "Edo" },
  { value: "6", label: "Ekiti" },
  { value: "7", label: "Zamfara" },
  { value: "8", label: "Yola" },
  { value: "9", label: "FCT" },
  { value: "10", label: "Kogi" },
  { value: "11", label: "Kaduna" },
  { value: "12", label: "Lagos" },
  { value: "13", label: "Kwara" },
  { value: "14", label: "Plateau" },
  { value: "15", label: "Rivers" },
  { value: "16", label: "Sokoto" },
]

const PreOrderTable = () => {
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
      name: "Feed the Poor",
      total_funded: "$10,050,000",
      amount_disbursed: "$10,050,000",
      amount_spent: "$10,050,000",
      date: "12 Dec, 2022",
      status: "Ongoing",
    },
    {
      name: "Feed the Poor",
      total_funded: "$10,050,000",
      amount_disbursed: "$10,050,000",
      amount_spent: "$10,050,000",
      date: "12 Dec, 2022",
      status: "Ended",
    },
    {
      name: "Feed the Poor",
      total_funded: "$10,050,000",
      amount_disbursed: "$10,050,000",
      amount_spent: "$10,050,000",
      date: "12 Dec, 2022",
      status: "Active",
    },
    {
      name: "Feed the Poor",
      total_funded: "$10,050,000",
      amount_disbursed: "$10,050,000",
      amount_spent: "$10,050,000",
      date: "12 Dec, 2022",
      status: "Ended",
    },
    {
      name: "Feed the Poor",
      total_funded: "$10,050,000",
      amount_disbursed: "$10,050,000",
      amount_spent: "$10,050,000",
      date: "12 Dec, 2022",
      status: "Pause",
    },
    {
      name: "Feed the Poor",
      total_funded: "$10,050,000",
      amount_disbursed: "$10,050,000",
      amount_spent: "$10,050,000",
      date: "12 Dec, 2022",
      status: "Ended",
    },
  ])

  const doorModelIcons: Record<string, React.ReactNode> = {
    "Alima Core": <PiShieldChevronFill className="size-5" />,
    "Alima Elite": <PiShieldPlusFill className="size-5" />,
  }

  const getPaymentStyle = (status: string) => {
    switch (status) {
      case "Ongoing":
        return { backgroundColor: "#E2F1FD", color: "#53A6EB" }
      case "Ended":
        return { backgroundColor: "#FAE8EE", color: "#E42C66" }
      case "Active":
        return { backgroundColor: "#EEFCF6", color: "#35C78A" }
      case "Pause":
        return { backgroundColor: "#E2F1FD", color: "#53A6EB" }

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
  const [selectedOption, setSelectedOption] = useState<string[]>([])
  const [selectedCurrency, setSelectedCurrency] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string[]>([])
  const [isDropdownOpen, setDropdownOpen] = React.useState<boolean>(false)
  const [isCurDropdownOpen, setIsCurDropdownOpen] = React.useState<boolean>(false)
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = React.useState<boolean>(false)

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
    <div className="flex-3 relative  flex flex-col rounded-md ">
      <div className="flex items-center justify-between ">
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
        <button className="button-primary-two gap-2" type="button" onClick={handleCancelReminderOrder}>
          <img src="/DashboardImages/Group (1).png" alt="Search Icon" />
          <p>Create Project</p>
        </button>
      </div>
      <div className="my-8  w-40 border-b-4 border-b-[#17CE89] pb-2 text-center text-[#17CE89]">
        <h1 className="text-lg font-semibold">Cash Project</h1>
      </div>
      <div className="w-full overflow-x-auto rounded-[10px] bg-white shadow-md">
        <div className="flex items-center justify-between px-5 py-4 text-[#25396F]">
          <p className="text-lg">Projects</p>
          <div className="flex items-center gap-3">
            <p className="text-sm">Filter by:</p>

            <p className="text-sm">Today</p>
            <RiArrowDownSLine />
          </div>
        </div>
        <table className="w-full min-w-[1000px] border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th
                className="flex cursor-pointer items-center gap-2 whitespace-nowrap  bg-[#F7F7F7] p-4 text-sm"
                onClick={() => toggleSort("name")}
              >
                Name <RxCaretSort />
              </th>
              <th
                className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                onClick={() => toggleSort("total_funded")}
              >
                <p className="flex items-center gap-2">
                  Total Funded <RxCaretSort />
                </p>
              </th>
              <th
                className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                onClick={() => toggleSort("amount_disbursed")}
              >
                <p className="flex items-center gap-2">
                  Amount Disbursed <RxCaretSort />
                </p>
              </th>
              <th
                className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                onClick={() => toggleSort("amount_spent")}
              >
                <p className="flex items-center gap-2">
                  Amount Spent <RxCaretSort />
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
              <th
                className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                onClick={() => toggleSort("status")}
              >
                <p className="flex items-center gap-2">
                  Status <RxCaretSort />
                </p>
              </th>
              <th className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"></th>
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
                  <div className="flex items-center gap-2">{order.name}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <div className="flex items-center gap-2 pr-4">{order.total_funded}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">{order.amount_disbursed}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">{order.amount_spent}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">{order.date}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <div className="flex">
                    <div
                      style={getPaymentStyle(order.status)}
                      className="flex items-center justify-center gap-1 rounded-full px-2 py-1"
                    >
                      {order.status}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-1 text-sm">
                  <div className="flex items-center gap-6">
                    <img src="/DashboardImages/archive-in-svgrepo-com 1.png" alt="dekalo" />
                    <img src="/DashboardImages/pause-circle.png" alt="dekalo" />
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-1 text-sm">
                  <Link href="/projects/project-info" className="flex items-center gap-2 text-[#17CE89] underline">
                    View
                  </Link>
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

      {isModalReminderOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-[#25396F]">
          <div className="modal-style rounded-md shadow-md sm:w-[620px] ">
            <div className="flex w-full justify-end px-4 pt-4">
              <LiaTimesSolid onClick={closeReminderModal} className="cursor-pointer" />{" "}
            </div>

            <div className="flex w-full justify-center border-b ">
              <h2 className="mb-4 text-center text-lg font-medium">New Cash Project </h2>
            </div>
            <div className="flex flex-col gap-3 p-4">
              <label>
                Project name
                <input
                  type="text"
                  id="search"
                  placeholder="Enter name of Project"
                  className="h-[46px] w-full rounded-md border bg-transparent px-4 outline-none transition-all duration-300 ease-in-out hover:border-[#17CE89] focus:border-[#17CE89] active:border-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </label>

              <Dropdown
                label="SDG"
                options={[
                  "No Poverty",
                  "Zero Hunger",
                  "Good Health and well-being",
                  "Quality Education",
                  "Gender Equality",
                  "Clean Water and Sanitation",
                  "Affordable and clean energy",
                  "Decent work and Economic Growth",
                ]}
                value={selectedOption}
                onSelect={setSelectedOption}
                isOpen={isDropdownOpen}
                toggleDropdown={() => setDropdownOpen(!isDropdownOpen)}
                isMultiSelect={true} // Use checkboxes for multi-selection
              />

              <label className="text-sm">
                Description
                <textarea
                  className="h-[120px] w-full rounded-md border  bg-transparent  p-2 px-2 text-sm outline-none focus:outline-none"
                  placeholder="Enter Your Message Here"
                ></textarea>
              </label>

              <Dropdown
                label="Project Currency"
                options={["Naira", "Dollar", "Euro", "Kuwait Dinar"]}
                value={selectedCurrency}
                onSelect={setSelectedCurrency}
                isOpen={isCurDropdownOpen}
                toggleDropdown={() => setIsCurDropdownOpen(!isCurDropdownOpen)}
                isMultiSelect={true} // Use checkboxes for multi-selection
              />

              <label>
                Budget
                <input
                  type="number"
                  id="search"
                  placeholder="Enter Budget"
                  className="h-[46px] w-full rounded-md border bg-transparent px-4 outline-none transition-all duration-300 ease-in-out hover:border-[#17CE89] focus:border-[#17CE89] active:border-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </label>
              <div className="grid w-full grid-cols-2 gap-2">
                <label>
                  Start date
                  <input
                    type="date"
                    id="search"
                    placeholder="Start date"
                    className="h-[46px] w-full rounded-md border bg-transparent px-4 outline-none transition-all duration-300 ease-in-out hover:border-[#17CE89] focus:border-[#17CE89] active:border-2"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </label>
                <label>
                  End date
                  <input
                    type="date"
                    id="search"
                    placeholder="Enter Budget"
                    className="h-[46px] w-full rounded-md border bg-transparent px-4 outline-none transition-all duration-300 ease-in-out hover:border-[#17CE89] focus:border-[#17CE89] active:border-2"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </label>
              </div>
              <Dropdown
                label="Country"
                options={["Nigeria", "Ghana", "China", "Rwanda", "Sychelles", "United Kingdom"]}
                value={selectedCountry}
                onSelect={setSelectedCountry}
                isOpen={isCountryDropdownOpen}
                toggleDropdown={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                isMultiSelect={true} // Use checkboxes for multi-selection
              />
              <div className=" my-2 w-full">
                <label>
                  Select State
                  <Select
                    options={options}
                    isMulti
                    className="search-bg text-xs text-black"
                    value={selectedOptions}
                    onChange={(selected) => setSelectedOptions(selected as OptionType[])}
                    placeholder="Select State"
                  />
                </label>
                <p className="text-xs text-[#707FA3]">You can add multiple states/regions</p>
              </div>
            </div>

            <div className="flex w-full justify-between gap-3 px-4 pb-4">
              <button className="button__primary flex w-full" onClick={confirmReminder}>
                <p>Create Project</p>
              </button>
              <button className="w-full rounded-md border" onClick={closeReminderModal}>
                <p>Cancel</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {isStatusModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-style rounded-md shadow-md sm:w-[620px]">
            <div className="flex justify-between border-b px-4 pt-4">
              <h2 className="mb-4 text-lg font-medium">Update Status</h2>
              <LiaTimesSolid onClick={closeStatusModal} className="cursor-pointer" />
            </div>
            <div className="p-4">
              <Dropdown
                label=""
                options={["Pending", "Confirmed", "Delivered", "Cancelled"]} // Replace with your dynamic options if needed
                value={selectedOption} // The state for the selected dropdown value
                onSelect={setSelectedOption} // The function to update the selected value
                isOpen={isDropdownOpen} // The state controlling whether the dropdown is open
                toggleDropdown={() => setDropdownOpen(!isDropdownOpen)} // The function to toggle dropdown open/close
                disabled={false} // Adjust as needed
              />
            </div>
            <div className="flex w-full justify-between gap-3 px-4 pb-4">
              <button className="button__secondary w-full" onClick={confirmStatusChange}>
                <p>Cancel</p>
              </button>
              <button className="button__black flex w-full" onClick={closeStatusModal}>
                <p>Send</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PreOrderTable
