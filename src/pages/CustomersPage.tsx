import { useState } from "react";

const CustomersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const customers = [
    {
      id: "#CUST-1542",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+977 9876543210",
      orders: 5,
      spent: "3,845.60",
      status: "Active",
      joinDate: "Jan 15, 2025",
    },
    {
      id: "#CUST-1543",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+977 9876543211",
      orders: 8,
      spent: "5,245.75",
      status: "Active",
      joinDate: "Dec 3, 2024",
    },
    {
      id: "#CUST-1544",
      name: "Michael Brown",
      email: "mbrown@example.com",
      phone: "+977 9876543212",
      orders: 2,
      spent: "1,299.90",
      status: "Inactive",
      joinDate: "Feb 10, 2025",
    },
    {
      id: "#CUST-1545",
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      phone: "+977 9876543213",
      orders: 15,
      spent: "12,780.35",
      status: "Active",
      joinDate: "Oct 22, 2024",
    },
    {
      id: "#CUST-1546",
      name: "Robert Davis",
      email: "robert.d@example.com",
      phone: "+977 9876543214",
      orders: 0,
      spent: "0.00",
      status: "New",
      joinDate: "Feb 25, 2025",
    },
    {
      id: "#CUST-1547",
      name: "Lisa Garcia",
      email: "lisa.garcia@example.com",
      phone: "+977 9876543215",
      orders: 3,
      spent: "2,649.70",
      status: "Active",
      joinDate: "Jan 5, 2025",
    },
  ];

  const filteredCustomers = customers.filter((customer) => {
    return (
      (selectedFilter === "All" || customer.status === selectedFilter) &&
      (searchQuery === "" ||
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery))
    );
  });

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Customers</h1>
        <button
          className="rounded-3xl"
          style={{
            backgroundColor: "#22c55e",
            color: "white",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          + Add Customer
        </button>
      </div>

      <div
        className="rounded-3xl"
        style={{
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            {["All", "Active", "Inactive", "New"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className="rounded-3xl"
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor:
                    selectedFilter === filter ? "#22c55e" : "#f3f4f6",
                  color: selectedFilter === filter ? "white" : "#4b5563",
                  cursor: "pointer",
                }}
              >
                {filter}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-3xl"
            style={{
              padding: "0.5rem 2.5rem 0.5rem 0.75rem",
              border: "1px solid #d1d5db",
              width: "16rem",
            }}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%" }}>
            <thead style={{ backgroundColor: "#f9fafb" }}>
              <tr>
                {[
                  "ID",
                  "Customer",
                  "Email",
                  "Phone",
                  "Orders",
                  "Total Spent",
                  "Status",
                  "Join Date",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: "0.75rem",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  style={{
                    backgroundColor: "white",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <td
                    style={{
                      padding: "0.75rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                    }}
                  >
                    {customer.id}
                  </td>
                  <td style={{ padding: "0.75rem" }}>{customer.name}</td>
                  <td style={{ padding: "0.75rem" }}>{customer.email}</td>
                  <td style={{ padding: "0.75rem" }}>{customer.phone}</td>
                  <td style={{ padding: "0.75rem" }}>{customer.orders}</td>
                  <td style={{ padding: "0.75rem" }}>रु. {customer.spent}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <span
                      className={`${
                        customer.status == "Inactive"
                          ? "bg-[#F56464] text-red-800"
                          : customer.status == "Active"
                          ? "bg-[#C7F369] text-green-800"
                          : "bg-gray-200 text-gray-800"
                      }
                        rounded-full text-xs font-medium
                      `}
                      style={{
                        padding: "0.25rem 0.5rem",
                      }}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem" }}>{customer.joinDate}</td>
                  <td style={{ padding: "0.75rem" }}>Actions</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
