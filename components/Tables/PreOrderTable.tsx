import React, { useEffect, useState } from "react"
import { RxCaretSort, RxCheck, RxCross2 } from "react-icons/rx"
import { PiShieldChevronFill, PiShieldPlusFill } from "react-icons/pi"
import Image from "next/image"
import { IoMdFunnel } from "react-icons/io"
import { IoFunnelOutline } from "react-icons/io5"
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6"
import Select from "react-select"

import { RiArrowDownSLine } from "react-icons/ri"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import Link from "next/link"
import CreatProjectModal from "components/Modals/CreateProject"

type SortOrder = "asc" | "desc" | null
type Order = {
  id: string
  name: string
  total_funded: string
  amount_disbursed: string
  amount_spent: string
  budget: string
  date: string
  status: string
}

const PreOrderTable = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const router = useRouter() // Initialize the router

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://api.shalomescort.org/project/project/")
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        const data = (await response.json()) as Order[]
        const formattedOrders = data.map((project: any) => ({
          id: project.id,
          budget: project.budget,
          name: project.title,
          total_funded: project.total_funded || "N/A",
          amount_disbursed: project.amount_disbursed || "N/A",
          amount_spent: project.amount_spent || "N/A",
          date: new Date(project.pub_date).toLocaleDateString(),
          status: project.status,
        }))

        // Update state only if there are changes
        if (JSON.stringify(formattedOrders) !== JSON.stringify(orders)) {
          setOrders(formattedOrders)
        }
      } catch (error: any) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    // Initial fetch
    fetchProjects()
  }, [orders])

  const [isModalReminderOpen, setIsModalReminderOpen] = useState(false)

  const handleCancelReminderOrder = () => {
    setIsModalReminderOpen(true)
  }

  const confirmReminder = () => {
    console.log("Reminder Sent")
    setIsModalReminderOpen(false)
  }

  const getPaymentStyle = (status: string) => {
    switch (status) {
      case "ONGOING":
        return { backgroundColor: "#E2F1FD", color: "#53A6EB" }
      case "ENDED":
        return { backgroundColor: "#FAE8EE", color: "#E42C66" }
      case "ACTIVE":
        return { backgroundColor: "#EEFCF6", color: "#35C78A" }
      case "PAUSE":
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

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

  const handleViewProject = (projectId: string) => {
    // Store project ID in localStorage
    localStorage.setItem("projectId", projectId)

    // Redirect to /projects/project-info
    router.push("/projects/project-info")
  }

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev)
  }

  const handleSort = (order: "asc" | "desc") => {
    setSortOrder(order)
    const sortedOrders = [...orders].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return order === "asc" ? dateA - dateB : dateB - dateA
    })
    setOrders(sortedOrders)
    setDropdownOpen(false) // Close the dropdown after selecting
  }

  return (
    <div className="flex-3 relative  flex flex-col rounded-md ">
      <div className="flex items-center justify-between ">
        <div className="flex gap-4">
          <div className="flex h-[42px] w-[380px] items-center justify-between gap-3 rounded-md border border-[#707FA3] px-3 py-1 text-[#707070] max-2xl:w-[300px]">
            <Image src="/DashboardImages/Search.svg" width={16} height={16} alt="Search Icon" />
            <input
              type="text"
              id="search"
              placeholder="Search"
              className="h-[42px] w-full bg-transparent outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && <RxCross2 onClick={handleCancelSearch} style={{ cursor: "pointer" }} />}
          </div>
          <div className="relative">
            <button
              className="button-oulined flex h-12 items-center gap-2 border-[#707FA3]"
              type="button"
              onClick={toggleDropdown}
            >
              <IoMdFunnel />
              <p>Sort By</p>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-full z-10 mt-2 w-40 rounded-md border border-[#707FA3] bg-white shadow-md">
                <button
                  className={`flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100 ${
                    sortOrder === "asc" ? "bg-gray-100 font-semibold" : ""
                  }`}
                  onClick={() => handleSort("asc")}
                >
                  Old to New
                  {sortOrder === "asc" && <RxCheck className="text-lg" />}
                </button>
                <button
                  className={`flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100 ${
                    sortOrder === "desc" ? "bg-gray-100 font-semibold" : ""
                  }`}
                  onClick={() => handleSort("desc")}
                >
                  New to Old
                  {sortOrder === "desc" && <RxCheck className="text-lg" />}
                </button>
              </div>
            )}
          </div>
          <button className="button-oulined border-[#707FA3]" type="button">
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
        <table className="w-full min-w-[800px] border-separate border-spacing-0 text-left">
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
                key={order.id}
                className={index % 2 === 0 ? "bg-white" : "bg-[#FCFCFE]"} // Alternating row colors
              >
                <td className="px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">{order.name}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <div className="flex items-center gap-2 pr-4">₦{Number(order.budget).toLocaleString("en-NG")}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">₦{Number(order.budget).toLocaleString("en-NG")}</div>
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
                  <button
                    onClick={() => handleViewProject(order.id)}
                    className="flex items-center gap-2 text-[#17CE89] underline"
                  >
                    View
                  </button>
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

      {isModalReminderOpen && (
        <CreatProjectModal isOpen={isModalReminderOpen} closeModal={() => setIsModalReminderOpen(false)} />
      )}
    </div>
  )
}

export default PreOrderTable
