import { useState } from "react";

const OrdersPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const orders = [
    {
      id: "#ORD-7829",
      customer: "John Smith",
      date: "Feb 28, 2025",
      product: "Apple iPhone 15 Pro Max",
      amount: "1199.90",
      status: "Delivered",
    },
    {
      id: "#ORD-7830",
      customer: "Sarah Johnson",
      date: "Feb 27, 2025",
      product: "Samsung Galaxy S24 Ultra",
      amount: "1099.90",
      status: "Processing",
    },
    {
      id: "#ORD-7831",
      customer: "Michael Brown",
      date: "Feb 27, 2025",
      product: "Apple Pencil 2",
      amount: "199.90",
      status: "Shipped",
    },
    {
      id: "#ORD-7832",
      customer: "Emma Wilson",
      date: "Feb 26, 2025",
      product: "Sony WH-1000XM5",
      amount: "349.90",
      status: "Delivered",
    },
    {
      id: "#ORD-7833",
      customer: "Robert Davis",
      date: "Feb 25, 2025",
      product: "Apple Watch Series 7",
      amount: "799.90",
      status: "Cancelled",
    },
    {
      id: "#ORD-7834",
      customer: "Lisa Garcia",
      date: "Feb 25, 2025",
      product: "Samsung Galaxy S24 Ultra",
      amount: "1099.90",
      status: "Processing",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    return (
      (selectedStatus === "All" || order.status === selectedStatus) &&
      (searchQuery === "" ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.product.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="w-full min-h-screen bg-gray-50" style={{ padding: "2rem" }}>
      <div
        className="flex justify-between items-center"
        style={{ marginBottom: "1.5rem" }}
      >
        <h1 className="text-2xl font-bold">Orders</h1>
        <button
          className="bg-green-500 text-white rounded-3xl hover:bg-green-600"
          style={{
            padding: "0.5rem 1rem",
          }}
        >
          + New Order
        </button>
      </div>

      <div
        className="bg-white rounded-3xl shadow-md overflow-hidden"
        style={{ padding: "1.5rem" }}
      >
        <div
          className="flex justify-between items-center"
          style={{ marginBottom: "1.5rem" }}
        >
          <div className="flex gap-4">
            {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={` rounded-3xl ${
                    selectedStatus === status
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{
                    padding: "0.5rem 1rem",
                  }}
                >
                  {status}
                </button>
              )
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" border rounded-3xl w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{
                padding: "0.5rem 1rem 0.5rem 2.5rem",
              }}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem 1.5rem",
                  }}
                >
                  Order ID
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem 1.5rem",
                  }}
                >
                  Customer
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem 1.5rem",
                  }}
                >
                  Date
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem 1.5rem",
                  }}
                >
                  Product
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem 1.5rem",
                  }}
                >
                  Amount
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem 1.5rem",
                  }}
                >
                  Status
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem 1.5rem",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    style={{
                      padding: "0.5rem 1rem",
                    }}
                  >
                    {order.id}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    style={{
                      padding: "0.5rem 1rem",
                    }}
                  >
                    {order.customer}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    style={{
                      padding: "0.5rem 1rem",
                    }}
                  >
                    {order.date}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    style={{
                      padding: "0.5rem 1rem",
                    }}
                  >
                    {order.product}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    style={{
                      padding: "0.5rem 1rem",
                    }}
                  >
                    रु. {order.amount}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    style={{
                      padding: "0.5rem 1rem",
                    }}
                  >
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                      style={{
                        padding: "0 0.5rem",
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td
                    className="whitespace-nowrap text-sm text-gray-500"
                    style={{
                      padding: "0.5rem 1rem",
                    }}
                  >
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      style={{
                        marginRight: "0.75rem",
                      }}
                    >
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="flex items-center justify-between "
          style={{
            marginTop: "1.5rem",
          }}
        >
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{filteredOrders.length}</span> of{" "}
            <span className="font-medium">{orders.length}</span> results
          </div>
          <div className="flex gap-2">
            <button
              className=" bg-gray-200 rounded-3xl text-gray-600 hover:bg-gray-300"
              style={{
                padding: "0.25rem 0.75rem",
              }}
            >
              Previous
            </button>
            <button
              className=" bg-gray-800 rounded-3xl text-white"
              style={{
                padding: "0.25rem 0.75rem",
              }}
            >
              1
            </button>
            <button
              className=" bg-gray-200 rounded-3xl text-gray-600 hover:bg-gray-300"
              style={{
                padding: "0.25rem 0.75rem",
              }}
            >
              2
            </button>
            <button
              className=" bg-gray-200 rounded-3xl text-gray-600 hover:bg-gray-300"
              style={{
                padding: "0.25rem 0.75rem",
              }}
            >
              3
            </button>
            <button
              className=" bg-gray-200 rounded-3xl text-gray-600 hover:bg-gray-300"
              style={{
                padding: "0.25rem 0.75rem",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
