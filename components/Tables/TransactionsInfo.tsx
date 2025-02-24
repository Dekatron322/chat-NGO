import React, { useEffect, useState } from "react"
import { RxCaretSort } from "react-icons/rx"
import { RiArrowDownSLine } from "react-icons/ri"
import { useRouter } from "next/navigation"
import { IoMdArrowDropdown } from "react-icons/io"

type SortOrder = "asc" | "desc" | null

type Beneficiary = {
  id: string
  beneficiary_id: string
  first_name: string
  last_name: string
  gender: string
  dob: string
  age: string
  location: string
  status: boolean
  pub_date: string
}

type Product = {
  name: string
  amount: string
  quantity: string
}

type Payment = {
  id: string
  beneficiarys: Beneficiary[]
  products: Product[]
  vendor_name: string
  amount: string
  status: boolean
  date: string
}

type Project = {
  id: string
  title: string
  sdg: string
  payments: Payment[]
}

type Order = {
  beneficiary: string
  last_name: string
  image: string
  vendor: string
  amount: string
  status: string
  date: string
  products: Product[] // Ensure that products are included
}

const TransactionsInfo = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  const toggleRow = (index: number) => {
    setExpandedRow((prev) => (prev === index ? null : index))
  }

  const router = useRouter()

  useEffect(() => {
    const projectId = localStorage.getItem("projectId")

    if (projectId) {
      fetch(`https://api.donorsrec.chats.cash/project/project/${projectId}/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch project data")
          }
          return response.json()
        })
        .then((data) => {
          const projectData = data as Project
          const uniqueNames = new Set<string>()
          const formattedOrders: Order[] = projectData.payments
            .map((payment) => {
              const beneficiary =
                payment.beneficiarys && payment.beneficiarys.length > 0 ? payment.beneficiarys[0] : null
              const fullName =
                beneficiary && beneficiary.first_name === beneficiary.last_name
                  ? beneficiary.first_name
                  : `${beneficiary?.first_name} ${beneficiary?.last_name}`

              if (fullName !== "N/A" && uniqueNames.has(fullName)) {
                return null
              }

              uniqueNames.add(fullName)
              const formattedDate = payment.date ? new Date(payment.date).toLocaleDateString() : "N/A"

              return {
                beneficiary: fullName,
                last_name: beneficiary?.last_name || "N/A",
                image: "/path/to/default-avatar.png",
                vendor: payment.vendor_name || "N/A",
                amount: `NGN${payment.amount || "0.00"}`,
                status: payment.status ? "Completed" : "Pending",
                date: formattedDate,
                products: payment.products || [],
              }
            })
            .filter((order) => order !== null) as Order[]

          setOrders(formattedOrders)
        })
        .catch((error) => {
          setError("Error fetching project payments")
          console.error("Fetch error:", error)
        })
        .finally(() => setLoading(false))
    } else {
      setError("Project ID not found in localStorage")
      setLoading(false)
    }
  }, [])

  const exportToCSV = () => {
    const headers = ["Beneficiary", "Vendor", "Amount (NGN)", "Status", "Date", "Products"]
    const rows = orders.map((order) => {
      const products = order.products
        .map((product) => `${product.name} (Qty: ${product.quantity}, Cost: ${product.amount})`)
        .join("; ")
      return [order.beneficiary, order.vendor, order.amount, order.status, order.date, products]
    })

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "transactions.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  const toggleSort = (column: keyof Order) => {
    const isAscending = sortColumn === column && sortOrder === "asc"
    setSortOrder(isAscending ? "desc" : "asc")
    setSortColumn(column)

    const sortedOrders = [...orders].sort((a, b) => {
      if (a[column] < b[column]) return isAscending ? 1 : -1
      if (a[column] > b[column]) return isAscending ? -1 : 1
      return 0
    })

    setOrders(sortedOrders)
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

  const handleRowsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <div className="flex-3 relative mb-10 mt-6 flex flex-col rounded-md">
      <div className="w-full overflow-x-auto rounded-[10px] bg-white shadow-md">
        <div className="flex items-center justify-between px-5 py-4 text-[#25396F]">
          <p className="text-lg font-semibold">Project Transactions</p>
          <div className="flex items-center gap-3">
            <p className="text-sm">Filter by:</p>
            <p className="text-sm">Today</p>
            <RiArrowDownSLine />
            <button onClick={exportToCSV} className="button-primary-two ml-4 rounded px-4 py-2">
              Export to CSV
            </button>
          </div>
        </div>
        <table className="w-full min-w-[800px] border-separate border-spacing-0 text-left">
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
          <tbody>
            {currentRows.map((order, index) => (
              <React.Fragment key={index}>
                <tr className={index % 2 === 0 ? "bg-white" : "bg-[#FCFCFE]"}>
                  <td className="whitespace-nowrap px-4 py-2 text-sm">
                    <div className="flex items-center gap-2">{order.beneficiary}</div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-sm">
                    <div className="flex items-center gap-2 pr-4">{order.vendor}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm">
                    <div className="flex items-center gap-2">{order.amount.toLocaleString()}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <div className="flex">
                      <div className="flex items-center justify-center gap-2 rounded-full bg-[#EEFCF6] px-2 py-1 text-[#35C78A]">
                        <span className="pr-l size-2 h-2 w-2 rounded-full bg-[#35C78A]"></span>
                        Success
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm">
                    <div className="flex items-center gap-2">{order.date}</div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-1 text-sm">
                    <div className="flex cursor-pointer items-center gap-2" onClick={() => toggleRow(index)}>
                      <IoMdArrowDropdown
                        className={`transition-transform ${expandedRow === index ? "rotate-180" : ""}`}
                      />
                    </div>
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr className=" bg-[#F7F7F7]">
                    <td colSpan={6} className="p-4 text-sm ">
                      <div className="flex flex-col justify-between gap-4 rounded-lg border border-dashed bg-gray-100 p-4">
                        <div className="flex w-full justify-between gap-10">
                          <p className="w-1/3 font-semibold">Items/Product</p>
                          <p className="w-1/3 font-semibold">Quantity</p>
                          <p className="w-1/3 font-semibold">Unit Cost</p>
                        </div>
                        <div>
                          {order.products && order.products.length > 0 ? (
                            order.products.map((product, productIndex) => (
                              <div className="flex w-full justify-between gap-10" key={productIndex}>
                                <p className="w-1/3">{product.name}</p>
                                <p className="w-1/3">{product.quantity}</p>
                                <p className="w-1/3">{product.amount}</p>
                              </div>
                            ))
                          ) : (
                            <p>No products available</p>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <select value={rowsPerPage} onChange={handleRowsChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={30}>30</option>
              <option value={100}>100</option>
            </select>
            <p className="text-sm">Rows per page</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </button>
            <p>
              {currentPage} of {totalPages}
            </p>
            <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsInfo
