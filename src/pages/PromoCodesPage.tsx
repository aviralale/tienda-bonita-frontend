import React, { useState } from "react";

interface PromoCode {
  code: string;
  type: "Percentage" | "Fixed Amount" | "Free Shipping";
  value: string;
  products: string;
  usage: number;
  limit: number | string;
  startDate: string;
  endDate: string;
  status: "Active" | "Expired" | "Scheduled";
}

const PromoCodesPage: React.FC = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      code: "SUMMER2024",
      type: "Percentage",
      value: "15%",
      products: "All Products",
      usage: 458,
      limit: 1000,
      startDate: "01 Jun 2024",
      endDate: "31 Aug 2024",
      status: "Active",
    },
    {
      code: "WELCOME10",
      type: "Fixed Amount",
      value: "रु 200.00",
      products: "Smartphones",
      usage: 892,
      limit: 1500,
      startDate: "15 Jan 2024",
      endDate: "31 Dec 2024",
      status: "Active",
    },
    {
      code: "FLASH25",
      type: "Percentage",
      value: "25%",
      products: "Accessories",
      usage: 211,
      limit: 500,
      startDate: "05 Mar 2024",
      endDate: "15 Mar 2024",
      status: "Expired",
    },
    {
      code: "FREESHIP",
      type: "Free Shipping",
      value: "रु 0.00",
      products: "Orders > रु1000",
      usage: 1243,
      limit: "Unlimited",
      startDate: "01 Jan 2024",
      endDate: "31 Dec 2024",
      status: "Active",
    },
    {
      code: "HOLIDAY2024",
      type: "Percentage",
      value: "20%",
      products: "All Products",
      usage: 0,
      limit: 2000,
      startDate: "01 Oct 2024",
      endDate: "31 Dec 2024",
      status: "Scheduled",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div style={{ backgroundColor: "#f3f4f6", padding: "1.5rem" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h1 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            Promotional Codes
          </h1>
          <button
            className="rounded-3xl"
            style={{
              backgroundColor: "#c5f4a3",
              color: "#000",
              padding: "0.5rem 1rem",
              fontWeight: "medium",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4V20M4 12H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Create New Code
          </button>
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            className="rounded-3xl"
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              padding: "1.25rem",
            }}
          >
            <div
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Active Promotions</span>
              <span
                className="rounded-full"
                style={{
                  backgroundColor: "#dbf4e0",
                  color: "#16a34a",
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.75rem",
                  fontWeight: "medium",
                }}
              >
                +5.2%
              </span>
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>24</div>
          </div>

          <div
            className="rounded-3xl"
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              padding: "1.25rem",
            }}
          >
            <div
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Total Redemptions</span>
              <span
                className="rounded-full"
                style={{
                  backgroundColor: "#dbf4e0",
                  color: "#16a34a",
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.75rem",
                  fontWeight: "medium",
                }}
              >
                +18.3%
              </span>
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>3,456</div>
          </div>

          <div
            className="rounded-3xl"
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              padding: "1.25rem",
            }}
          >
            <div
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Revenue Impact</span>
              <span
                className="rounded-full"
                style={{
                  backgroundColor: "#fee2e2",
                  color: "#dc2626",
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.75rem",
                  fontWeight: "medium",
                }}
              >
                -3.7%
              </span>
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              रु. 85,374.20
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div
          className="rounded-3xl"
          style={{
            backgroundColor: "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <div style={{ fontWeight: "bold" }}>All Promo Codes</div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <div
                className="rounded-3xl"
                style={{
                  border: "1px solid #e5e7eb",
                  padding: "0.375rem 0.75rem",
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <span>Status: All</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div
                className="rounded-3xl"
                style={{
                  border: "1px solid #e5e7eb",
                  padding: "0.375rem 0.75rem",
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <span>This year</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className="rounded-3xl"
            style={{
              border: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              padding: "0.5rem 1rem",
              marginBottom: "1rem",
              width: "18rem",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search promo codes..."
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                marginLeft: "0.5rem",
                padding: "0.5rem",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.5rem",
                      color: "#6b7280",
                      fontWeight: "medium",
                      fontSize: "0.875rem",
                    }}
                  >
                    Code
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.5rem",
                      color: "#6b7280",
                      fontWeight: "medium",
                      fontSize: "0.875rem",
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.5rem",
                      color: "#6b7280",
                      fontWeight: "medium",
                      fontSize: "0.875rem",
                    }}
                  >
                    Value
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.5rem",
                      color: "#6b7280",
                      fontWeight: "medium",
                      fontSize: "0.875rem",
                    }}
                  >
                    Products
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.5rem",
                      color: "#6b7280",
                      fontWeight: "medium",
                      fontSize: "0.875rem",
                    }}
                  >
                    Usage / Limit
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.5rem",
                      color: "#6b7280",
                      fontWeight: "medium",
                      fontSize: "0.875rem",
                    }}
                  >
                    Start Date
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.5rem",
                      color: "#6b7280",
                      fontWeight: "medium",
                      fontSize: "0.875rem",
                    }}
                  >
                    End Date
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.5rem",
                      color: "#6b7280",
                      fontWeight: "medium",
                      fontSize: "0.875rem",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.5rem",
                      color: "#6b7280",
                      fontWeight: "medium",
                      fontSize: "0.875rem",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {promoCodes.map((code, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #f9fafb" }}>
                    <td
                      style={{ padding: "1rem 1.5rem", fontSize: "0.875rem" }}
                    >
                      <strong>{code.code}</strong>
                    </td>
                    <td
                      style={{ padding: "1rem 1.5rem", fontSize: "0.875rem" }}
                    >
                      {code.type}
                    </td>
                    <td
                      style={{ padding: "1rem 1.5rem", fontSize: "0.875rem" }}
                    >
                      {code.value}
                    </td>
                    <td
                      style={{ padding: "1rem 1.5rem", fontSize: "0.875rem" }}
                    >
                      {code.products}
                    </td>
                    <td
                      style={{ padding: "1rem 1.5rem", fontSize: "0.875rem" }}
                    >
                      {code.usage} / {code.limit}
                    </td>
                    <td
                      style={{ padding: "1rem 1.5rem", fontSize: "0.875rem" }}
                    >
                      {code.startDate}
                    </td>
                    <td
                      style={{ padding: "1rem 1.5rem", fontSize: "0.875rem" }}
                    >
                      {code.endDate}
                    </td>
                    <td
                      style={{ padding: "1rem 1.5rem", fontSize: "0.875rem" }}
                    >
                      <span
                        className="rounded-full"
                        style={{
                          padding: "0.375rem 0.75rem",
                          fontSize: "0.75rem",
                          fontWeight: "medium",
                          backgroundColor:
                            code.status === "Active"
                              ? "#dbf4e0"
                              : code.status === "Expired"
                              ? "#fee2e2"
                              : "#eef2ff",
                          color:
                            code.status === "Active"
                              ? "#16a34a"
                              : code.status === "Expired"
                              ? "#dc2626"
                              : "#3b82f6",
                        }}
                      >
                        {code.status}
                      </span>
                    </td>
                    <td
                      style={{ padding: "1rem 1.5rem", fontSize: "0.875rem" }}
                    >
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          className="rounded-3xl"
                          style={{
                            border: "1px solid #e5e7eb",
                            padding: "0.375rem",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 20V13M19.5858 3.58579C18.8047 2.80474 17.5384 2.80474 16.7574 3.58579L9 11.3431V15H12.6569L20.4142 7.24264C21.1953 6.46159 21.1953 5.19526 20.4142 4.41421L19.5858 3.58579Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          className="rounded-3xl"
                          style={{
                            border: "1px solid #e5e7eb",
                            padding: "0.375rem",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <div style={{ fontSize: "0.875rem" }}>
              Showing 1 - 5 of 24 promo codes
            </div>
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <button
                className="rounded-3xl"
                style={{
                  width: "2rem",
                  height: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                className="rounded-3xl"
                style={{
                  width: "2rem",
                  height: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#1f2937",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                className="rounded-3xl"
                style={{
                  width: "2rem",
                  height: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button
                className="rounded-3xl"
                style={{
                  width: "2rem",
                  height: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <button
                className="rounded-3xl"
                style={{
                  width: "2rem",
                  height: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodesPage;
