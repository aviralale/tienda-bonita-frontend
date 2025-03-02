import { useState, useEffect } from "react";
import { allProducts } from "../../data";

type TimeframeType = "year" | "month" | "week";

const TopSellingProducts = () => {
  const [timeframe, setTimeframe] = useState<TimeframeType>("year");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Extended sample data

  // Filter products based on search term
  const filteredProducts = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  // Reset to first page when search or timeframe changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, timeframe]);

  return (
    <div className="bg-white rounded-3xl w-full" style={{ padding: "1.5rem" }}>
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center"
        style={{ marginBottom: "1.5rem", gap: "1rem" }}
      >
        <h2 className="text-xl font-bold">Top Selling Products</h2>

        <div
          className="flex flex-col sm:flex-row w-full md:w-auto"
          style={{ gap: "1rem" }}
        >
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 border border-gray-300 rounded-full text-sm focus:outline-none"
              style={{
                paddingLeft: "1rem",
                paddingRight: "2.5rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
              }}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pointer-events-none"
              style={{ paddingRight: "0.75rem" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Timeframe selector */}
          <div className="relative">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as TimeframeType)}
              className="appearance-none bg-white border border-gray-300 rounded-full text-sm focus:outline-none w-full sm:w-auto"
              style={{
                paddingLeft: "1rem",
                paddingRight: "2rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
              }}
            >
              <option value="year">This year</option>
              <option value="month">This month</option>
              <option value="week">This week</option>
            </select>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700"
              style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
            >
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="font-normal" style={{ paddingBottom: "0.75rem" }}>
                ID
              </th>
              <th className="font-normal" style={{ paddingBottom: "0.75rem" }}>
                Name
              </th>
              <th className="font-normal" style={{ paddingBottom: "0.75rem" }}>
                Category
              </th>
              <th
                className="font-normal text-right"
                style={{ paddingBottom: "0.75rem" }}
              >
                Sales
              </th>
              <th
                className="font-normal text-right"
                style={{ paddingBottom: "0.75rem" }}
              >
                Price
              </th>
              <th
                className="font-normal text-right"
                style={{ paddingBottom: "0.75rem" }}
              >
                Earning
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td
                  className="text-gray-500"
                  style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  {product.id}
                </td>
                <td style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                  <div className="flex items-center">
                    <span
                      className="text-2xl"
                      style={{ marginRight: "0.75rem" }}
                    >
                      {product.image}
                    </span>
                    <span className="line-clamp-2">{product.name}</span>
                  </div>
                </td>
                <td style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                  {product.category}
                </td>
                <td
                  className="text-right"
                  style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  {product.sales[timeframe]}
                </td>
                <td
                  className="text-right"
                  style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  रु. {product.price.toFixed(2)}
                </td>
                <td
                  className="text-right"
                  style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  रु. {product.earning[timeframe].toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No results message */}
      {currentProducts.length === 0 && (
        <div
          className="text-center text-gray-500"
          style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          No products found matching your search criteria.
        </div>
      )}

      {/* Pagination and items per page selector */}
      <div
        className="flex flex-col sm:flex-row justify-between items-center"
        style={{ marginTop: "1.5rem", gap: "1rem" }}
      >
        <div className="flex items-center">
          <span
            className="text-sm text-gray-500"
            style={{ marginRight: "0.5rem" }}
          >
            Show:
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded text-sm"
            style={{
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>

        <div className="flex items-center" style={{ columnGap: "0.25rem" }}>
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`rounded ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#1E3A34] hover:bg-blue-50"
            }`}
            style={{ padding: "0.25rem 0.75rem" }}
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, index) => {
            // Show limited page numbers for better UX
            if (
              index + 1 === 1 ||
              index + 1 === totalPages ||
              (index + 1 >= currentPage - 1 && index + 1 <= currentPage + 1)
            ) {
              return (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`rounded ${
                    currentPage === index + 1
                      ? "bg-[#1E3A34] text-white"
                      : "hover:bg-blue-50 text-[#1E3A34]"
                  }`}
                  style={{ padding: "0.25rem 0.75rem" }}
                >
                  {index + 1}
                </button>
              );
            } else if (
              (index + 1 === currentPage - 2 && currentPage > 3) ||
              (index + 1 === currentPage + 2 && currentPage < totalPages - 2)
            ) {
              return (
                <span key={index} style={{ padding: "0 0.25rem" }}>
                  ...
                </span>
              );
            }
            return null;
          })}

          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`rounded ${
              currentPage === totalPages || totalPages === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#1E3A34] hover:bg-blue-50"
            }`}
            style={{ padding: "0.25rem 0.75rem" }}
          >
            &gt;
          </button>
        </div>

        <div className="text-sm text-gray-500">
          Showing {filteredProducts.length > 0 ? indexOfFirstItem + 1 : 0} -{" "}
          {Math.min(indexOfLastItem, filteredProducts.length)} of{" "}
          {filteredProducts.length} products
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;
