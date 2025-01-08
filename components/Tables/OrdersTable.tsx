import React, { useState } from "react"
import { RxCaretSort, RxCross2, RxDotsVertical } from "react-icons/rx"
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"
import { PiShieldChevronFill, PiShieldPlusFill } from "react-icons/pi"
import Image from "next/image"
import { IoMdFunnel } from "react-icons/io"
import { IoFunnelOutline } from "react-icons/io5"

type SortOrder = "asc" | "desc" | null
type Order = {
  orderId: string
  customer: string
  doorModel: string
  units: number
  payment30: string
  payment70: string
  orderStatus: string
  date: string
}

const OrdersTable = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [searchText, setSearchText] = useState("")

  const [orders, setOrders] = useState([
    {
      orderId: "#ORD12345",
      customer: "Robert Fox",
      doorModel: "Alima Core",
      units: 200,
      payment30: "Paid",
      payment70: "Pending",
      orderStatus: "Confirmed",
      date: "2024-12-19",
    },
    {
      orderId: "#ORD12346",
      customer: "Robert Lee",
      doorModel: "Alima Elite",
      units: 210,
      payment30: "Paid",
      payment70: "Paid",
      orderStatus: "Completed",
      date: "2024-12-20",
    },
    {
      orderId: "#ORD12347",
      customer: "Robert Chang",
      doorModel: "Alima Core",
      units: 500,
      payment30: "Not Paid",
      payment70: "Not Paid",
      orderStatus: "Cancelled",
      date: "2024-12-20",
    },
    {
      orderId: "#ORD12348",
      customer: "Robert Lee",
      doorModel: "Alima Elite",
      units: 1200,
      payment30: "Paid",
      payment70: "Pending",
      orderStatus: "Delivered",
      date: "2024-12-20",
    },
    {
      orderId: "#ORD12349",
      customer: "Robert Lee",
      doorModel: "Alima Core",
      units: 210,
      payment30: "Pending",
      payment70: "Pending",
      orderStatus: "Pending",
      date: "2024-12-20",
    },
  ])

  const doorModelIcons: Record<string, React.ReactNode> = {
    "Alima Core": <PiShieldChevronFill className="size-5" />,
    "Alima Elite": <PiShieldPlusFill className="size-5" />,
  }

  const getPaymentStyle = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "Paid":
        return { backgroundColor: "#EEF5F0", color: "#589E67" }
      case "Completed":
        return { backgroundColor: "#EEF5F0", color: "#589E67" }
      case "Pending":
        return { backgroundColor: "#FBF4EC", color: "#D28E3D" }
      case "Not Paid":
        return { backgroundColor: "#F7EDED", color: "#AF4B4B" }
      case "Confirmed":
        return { backgroundColor: "#EDF2FE", color: "#4976F4" }
      case "Delivered":
        return { backgroundColor: "#F4EDF7", color: "#954BAF" }
      case "Cancelled":
        return { backgroundColor: "#F7EDED", color: "#AF4B4B" }
      default:
        return {}
    }
  }

  const dotStyle = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "Paid":
        return { backgroundColor: "#589E67" }
      case "Pending":
        return { backgroundColor: "#D28E3D" }
      case "Not Paid":
        return { backgroundColor: "#AF4B4B" }
      case "Completed":
        return { backgroundColor: "#589E67" }
      case "Confirmed":
        return { backgroundColor: "#4976F4" }
      case "Delivered":
        return { backgroundColor: "#954BAF" }
      case "Cancelled":
        return { backgroundColor: "#AF4B4B" }
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

  return (
    <div className="flex-3 mt-5 flex flex-col rounded-md border p-5">
      <div className="flex items-center justify-between border-b py-4">
        <p className="text-2xl font-medium">Latest Pre-Orders</p>
        <div className="flex gap-4">
          <div className="flex h-[37px] w-[380px] items-center justify-between gap-3 rounded-md border px-3 py-1 text-[#707070]">
            <Image src="/DashboardImages/Search.svg" width={16} height={16} alt="Search Icon" />
            <input
              type="text"
              id="search"
              placeholder="Search"
              className="h-[50px] w-full bg-transparent outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && <RxCross2 onClick={handleCancelSearch} style={{ cursor: "pointer" }} />}
          </div>
          <button className="button-oulined" type="button">
            <IoMdFunnel />
            <p>Sort By</p>
          </button>
          <button className="button-oulined" type="button">
            <IoFunnelOutline />
            <p>Filter</p>
          </button>
          <button className="button-oulined" type="button">
            <p>View All Pre-orders</p>
          </button>
        </div>
      </div>
      <div className="w-full overflow-x-auto border">
        <table className="w-full min-w-[800px] border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th
                className="flex cursor-pointer items-center gap-2 whitespace-nowrap border-b p-4 text-sm"
                onClick={() => toggleSort("orderId")}
              >
                <MdOutlineCheckBoxOutlineBlank className="text-lg" />
                Order ID <RxCaretSort />
              </th>
              <th
                className="cursor-pointer whitespace-nowrap border-b border-l p-4 text-sm"
                onClick={() => toggleSort("customer")}
              >
                <p className="flex items-center gap-2">
                  Customer <RxCaretSort />
                </p>
              </th>
              <th
                className="cursor-pointer whitespace-nowrap border-b border-l p-4 text-sm"
                onClick={() => toggleSort("doorModel")}
              >
                <p className="flex items-center gap-2">
                  Door Model <RxCaretSort />
                </p>
              </th>
              <th
                className="cursor-pointer whitespace-nowrap border-b border-l p-4 text-sm"
                onClick={() => toggleSort("units")}
              >
                <p className="flex items-center gap-2">
                  Unit Ordered <RxCaretSort />
                </p>
              </th>
              <th
                className="cursor-pointer whitespace-nowrap border-b border-l p-4 text-sm"
                onClick={() => toggleSort("payment30")}
              >
                <p className="flex items-center gap-2">
                  Payment (30%) <RxCaretSort />
                </p>
              </th>
              <th
                className="cursor-pointer whitespace-nowrap border-b border-l p-4 text-sm"
                onClick={() => toggleSort("payment70")}
              >
                <p className="flex items-center gap-2">
                  Payment (70%) <RxCaretSort />
                </p>
              </th>
              <th
                className="cursor-pointer whitespace-nowrap border-b border-l p-4 text-sm"
                onClick={() => toggleSort("orderStatus")}
              >
                <p className="flex items-center gap-2">
                  Order Status <RxCaretSort />
                </p>
              </th>
              <th
                className="cursor-pointer whitespace-nowrap border-b border-l p-4 text-sm"
                onClick={() => toggleSort("date")}
              >
                <p className="flex items-center gap-2">
                  Date <RxCaretSort />
                </p>
              </th>
              <th className="whitespace-nowrap border-b border-l p-4 text-sm">
                <p className="flex items-center gap-2">Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap border-b px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MdOutlineCheckBoxOutlineBlank className="text-lg" />
                    {order.orderId}
                  </div>
                </td>
                <td className="whitespace-nowrap border-b border-l px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <img src="/DashboardImages/UserCircle.png" alt="dekalo" className="icon-style" />
                    <img src="/DashboardImages/UserCircle-dark.png" alt="dekalo" className="dark-icon-style " />
                    {order.customer}
                  </div>
                </td>
                <td className="whitespace-nowrap border-b border-l px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    {doorModelIcons[order.doorModel]}
                    {order.doorModel}
                  </div>
                </td>
                <td className="whitespace-nowrap border-b border-l px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <img src="/DashboardImages/Package.png" alt="dekalo" className="icon-style" />
                    <img src="/DashboardImages/Package-dark.png" alt="dekalo" className="dark-icon-style " />
                    {order.units}
                  </div>
                </td>
                <td className="whitespace-nowrap border-b border-l px-4 py-3 text-sm">
                  <div className="flex">
                    <div
                      style={getPaymentStyle(order.payment30)}
                      className="flex items-center justify-center gap-1   rounded-full px-2 py-1"
                    >
                      <span className="size-2 rounded-full" style={dotStyle(order.payment30)}></span>

                      {order.payment30}
                    </div>
                  </div>
                </td>
                <td className="flex whitespace-nowrap border-b border-l px-4 py-3 text-sm">
                  <div
                    style={getPaymentStyle(order.payment70)}
                    className="flex items-center justify-center gap-1   rounded-full px-2 py-1"
                  >
                    <span className="size-2 rounded-full" style={dotStyle(order.payment70)}></span>
                    {order.payment70}
                  </div>
                </td>
                <td className="whitespace-nowrap border-b border-l px-4 py-3 text-sm">
                  <div className="flex">
                    <div
                      style={getPaymentStyle(order.orderStatus)}
                      className="flex items-center justify-center gap-1   rounded-full px-2 py-1"
                    >
                      <span className="size-2 rounded-full" style={dotStyle(order.orderStatus)}></span>
                      {order.orderStatus}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap border-b border-l px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <img src="/DashboardImages/Calendar.png" alt="dekalo" />
                    {order.date}
                  </div>
                </td>
                <td className="whitespace-nowrap border-b border-l px-4 py-1 text-sm">
                  <div className="flex items-center gap-2">
                    <button className="button-oulined" type="button">
                      <img src="/DashboardImages/Eye.png" alt="dekalo" className="icon-style" />
                      <img src="/DashboardImages/Eye-dark.png" alt="dekalo" className="dark-icon-style" />
                      <p className="text-xs">View Details </p>
                    </button>
                    <RxDotsVertical />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersTable
