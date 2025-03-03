import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  ArrowUpDown,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { allProducts } from "../data";

// Product interface
interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Inactive";
  rating: number;
}

const ProductsPage: React.FC = () => {
  // State management
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(allProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    status: "Active",
    rating: 0,
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Derived state
  const productsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const allCategories = Array.from(
    new Set(products.map((product) => product.category))
  );

  // Filter products based on search, category, and status
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "All Categories") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply status filter
    if (selectedStatus !== "All Status") {
      result = result.filter((product) => product.status === selectedStatus);
    }

    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField as keyof Product];
        const bValue = b[sortField as keyof Product];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortDirection === "asc"
            ? (aValue as number) - (bValue as number)
            : (bValue as number) - (aValue as number);
        }
      });
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedStatus,
    sortField,
    sortDirection,
  ]);

  // Handle pagination
  const changePage = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle selection
  const toggleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(
        selectedProducts.filter((productId) => productId !== id)
      );
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(currentProducts.map((product) => product.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle product operations
  const addProduct = () => {
    const productId = `#${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;
    const product: Product = {
      id: productId,
      name: newProduct.name || "New Product",
      image: "/api/placeholder/80/80",
      category: newProduct.category || "Other",
      price: newProduct.price || 0,
      stock: newProduct.stock || 0,
      status: (newProduct.status as "Active" | "Inactive") || "Active",
      rating: newProduct.rating || 0,
    };

    setProducts([...products, product]);
    setShowAddModal(false);
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      status: "Active",
      rating: 0,
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
    setSelectedProducts(
      selectedProducts.filter((productId) => productId !== id)
    );
  };

  const deleteSelectedProducts = () => {
    setProducts(
      products.filter((product) => !selectedProducts.includes(product.id))
    );
    setSelectedProducts([]);
    setSelectAll(false);
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setShowAddModal(true);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
      rating: product.rating,
    });
  };

  const saveEdit = () => {
    if (!editingProduct) return;

    const updatedProducts = products.map((product) => {
      if (product.id === editingProduct.id) {
        return {
          ...product,
          name: newProduct.name || product.name,
          category: newProduct.category || product.category,
          price: newProduct.price || product.price,
          stock: newProduct.stock || product.stock,
          status:
            (newProduct.status as "Active" | "Inactive") || product.status,
          rating: newProduct.rating || product.rating,
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setShowAddModal(false);
    setEditingProduct(null);
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      status: "Active",
      rating: 0,
    });
  };

  // Main color scheme
  const primaryColor = "#C7F369"; // Light green
  const secondaryColor = "#1E3A34"; // Dark green
  const textOnPrimary = "#1E3A34"; // Dark text on light background
  const textOnSecondary = "#FFFFFF"; // Light text on dark background

  return (
    <div className="min-h-screen w-full">
      {/* Page Content */}
      <div
        style={{
          padding: "1.5rem",
        }}
      >
        <div
          className="flex justify-between items-center"
          style={{
            marginBottom: "1.5rem",
          }}
        >
          <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
          <div className="flex gap-3">
            <button
              className="bg-white border rounded-3xl text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors"
              style={{
                padding: "0.5rem 1rem",
              }}
              onClick={() => {
                /* Filter logic */
              }}
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button
              className="rounded-3xl text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-colors"
              style={{
                backgroundColor: primaryColor,
                color: textOnPrimary,
                padding: "0.5rem 1rem",
              }}
              onClick={() => {
                setShowAddModal(true);
                setEditingProduct(null);
                setNewProduct({
                  name: "",
                  category: "",
                  price: 0,
                  stock: 0,
                  status: "Active",
                  rating: 0,
                });
              }}
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Search and Categories */}
        <div
          className="bg-white rounded-3xl shadow-sm "
          style={{
            padding: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            className="flex justify-between"
            style={{
              marginBottom: "1rem",
            }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="border rounded-3xl w-64"
                style={{
                  padding: "0.5rem 0",
                  paddingLeft: "2.5rem",
                  paddingRight: "1rem",
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="flex gap-3">
              <select
                className="border rounded-full text-sm px-3 py-2"
                style={{
                  padding: "0.75rem 0.5rem",
                }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All Categories</option>
                {allCategories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <select
                className="border rounded-full text-sm"
                style={{
                  padding: "0.75rem 0.5rem",
                }}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              className={`rounded-full text-xs transition-colors ${
                selectedCategory === "All Categories"
                  ? `text-${textOnPrimary}`
                  : "bg-gray-100"
              }`}
              style={
                selectedCategory === "All Categories"
                  ? {
                      backgroundColor: primaryColor,
                      padding: "0.25rem 0.75rem",
                    }
                  : { padding: "0.25rem 0.75rem" }
              }
              onClick={() => setSelectedCategory("All Categories")}
            >
              All Products
            </button>
            {allCategories.map((category) => (
              <button
                key={category}
                className={`rounded-full text-xs transition-colors ${
                  selectedCategory === category
                    ? `text-${textOnPrimary}`
                    : "bg-gray-100"
                }`}
                style={
                  selectedCategory === category
                    ? {
                        backgroundColor: primaryColor,
                        padding: "0.25rem 0.75rem",
                      }
                    : { padding: "0.25rem 0.75rem" }
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th
                  className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem",
                  }}
                >
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                    <button
                      className="ml-2 flex items-center"
                      onClick={() => handleSort("id")}
                    >
                      ID
                      <ArrowUpDown
                        className="w-3 h-3"
                        style={{
                          marginLeft: "0.25rem",
                        }}
                      />
                    </button>
                  </div>
                </th>
                <th
                  className=" text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem",
                  }}
                >
                  <button
                    className="flex items-center"
                    onClick={() => handleSort("name")}
                  >
                    Product
                    <ArrowUpDown
                      className="w-3 h-3 "
                      style={{
                        marginLeft: "0.25rem",
                      }}
                    />
                  </button>
                </th>
                <th
                  className=" text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem",
                  }}
                >
                  <button
                    className="flex items-center"
                    onClick={() => handleSort("category")}
                  >
                    Category
                    <ArrowUpDown
                      className="w-3 h-3 "
                      style={{
                        marginLeft: "0.25rem",
                      }}
                    />
                  </button>
                </th>
                <th
                  className=" text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem",
                  }}
                >
                  <button
                    className="flex items-center"
                    onClick={() => handleSort("price")}
                  >
                    Price
                    <ArrowUpDown className="w-3 h-3 ml-1" />
                  </button>
                </th>
                <th
                  className=" text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem",
                  }}
                >
                  <button
                    className="flex items-center"
                    onClick={() => handleSort("stock")}
                  >
                    Stock
                    <ArrowUpDown className="w-3 h-3 ml-1" />
                  </button>
                </th>
                <th
                  className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem",
                  }}
                >
                  <button
                    className="flex items-center"
                    onClick={() => handleSort("status")}
                  >
                    Status
                    <ArrowUpDown className="w-3 h-3 ml-1" />
                  </button>
                </th>
                <th
                  className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem",
                  }}
                >
                  <button
                    className="flex items-center"
                    onClick={() => handleSort("rating")}
                  >
                    Rating
                    <ArrowUpDown
                      className="w-3 h-3"
                      style={{
                        marginLeft: "0.25rem",
                      }}
                    />
                  </button>
                </th>
                <th
                  className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    padding: "0.75rem",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td
                    className="whitespace-nowrap text-sm"
                    style={{
                      padding: "1rem",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleSelectProduct(product.id)}
                      />
                      {product.id}
                    </div>
                  </td>
                  <td
                    className="whitespace-nowrap"
                    style={{
                      padding: "1rem",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span>{product.image}</span>
                      <div className="text-sm font-medium">{product.name}</div>
                    </div>
                  </td>
                  <td
                    className="whitespace-nowrap text-sm"
                    style={{
                      padding: "1rem",
                    }}
                  >
                    {product.category}
                  </td>
                  <td
                    className="whitespace-nowrap text-sm"
                    style={{
                      padding: "1rem",
                    }}
                  >
                    रु. {product.price.toFixed(2)}
                  </td>
                  <td
                    className="whitespace-nowrap text-sm"
                    style={{
                      padding: "1rem",
                    }}
                  >
                    {product.stock} units
                  </td>
                  <td
                    className="whitespace-nowrap"
                    style={{
                      padding: "1rem",
                    }}
                  >
                    <span
                      className={` text-xs rounded-full ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                      style={{
                        padding: "0.25rem 0.5rem",
                      }}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td
                    className="whitespace-nowrap text-sm"
                    style={{
                      padding: "1rem",
                    }}
                  >
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span
                        style={{
                          marginLeft: "0.25rem",
                        }}
                      >
                        {product.rating}
                      </span>
                    </div>
                  </td>
                  <td
                    className="whitespace-nowrap text-sm text-gray-500"
                    style={{
                      padding: "1rem",
                    }}
                  >
                    <div className="flex gap-2">
                      <button
                        className="hover:bg-gray-100 rounded-3xl"
                        onClick={() => startEdit(product)}
                        style={{
                          padding: "0.25rem",
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className=" hover:bg-gray-100 rounded-3xl"
                        onClick={() => deleteProduct(product.id)}
                        style={{
                          padding: "0.25rem",
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="flex items-center justify-between border-t"
            style={{
              padding: "1rem",
            }}
          >
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstProduct + 1} -{" "}
              {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </div>
            <div className="flex gap-2">
              <button
                className="rounded-3xl text-sm transition-colors flex items-center justify-center"
                style={{
                  backgroundColor:
                    currentPage === 1 ? "#f0f0f0" : secondaryColor,
                  color: currentPage === 1 ? "#888" : textOnSecondary,
                  padding: "0.25rem 0.75rem",
                }}
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                // Show current page and adjacent pages
                let pageNum;
                if (totalPages <= 3) {
                  pageNum = i + 1;
                } else if (currentPage === 1) {
                  pageNum = i + 1;
                } else if (currentPage === totalPages) {
                  pageNum = totalPages - 2 + i;
                } else {
                  pageNum = currentPage - 1 + i;
                }

                return (
                  <button
                    key={pageNum}
                    className="rounded-3xl text-sm px-3 py-1 transition-colors"
                    style={{
                      backgroundColor:
                        currentPage === pageNum ? primaryColor : "white",
                      color:
                        currentPage === pageNum ? textOnPrimary : "inherit",
                      border:
                        currentPage === pageNum ? "none" : "1px solid #e0e0e0",
                      padding: "0.25rem 0.75rem",
                    }}
                    onClick={() => changePage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="rounded-3xl text-sm transition-colors flex items-center justify-center"
                style={{
                  backgroundColor:
                    currentPage === totalPages ? "#f0f0f0" : secondaryColor,
                  color: currentPage === totalPages ? "#888" : textOnSecondary,
                  padding: "0.25rem 0.75rem",
                }}
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-3xl w-96"
            style={{
              padding: "1.5rem",
            }}
          >
            <h2
              className="text-xl font-semibold "
              style={{
                marginBottom: "1rem",
              }}
            >
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  style={{
                    marginBottom: "0.25rem",
                  }}
                >
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg"
                  style={{
                    padding: "0.5rem",
                  }}
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  style={{
                    marginBottom: "0.25rem",
                  }}
                >
                  Category
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg"
                  style={{
                    padding: "0.5rem",
                  }}
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  list="categories"
                />
                <datalist id="categories">
                  {allCategories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 "
                  style={{
                    marginBottom: "0.25rem",
                  }}
                >
                  Price
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg"
                  style={{
                    padding: "0.5rem",
                  }}
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 "
                  style={{
                    marginBottom: "0.25rem",
                  }}
                >
                  Stock
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg"
                  style={{
                    padding: "0.5rem",
                  }}
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      stock: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  style={{
                    marginBottom: "0.25rem",
                  }}
                >
                  Status
                </label>
                <select
                  className="w-full border rounded-lg"
                  style={{
                    padding: "0.5rem",
                  }}
                  value={newProduct.status}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      status: e.target.value as "Active" | "Inactive",
                    })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  style={{
                    marginBottom: "0.25rem",
                  }}
                >
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full border rounded-lg"
                  style={{
                    padding: "0.5rem",
                  }}
                  value={newProduct.rating}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      rating: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-3">
              <button
                className=" border rounded-3xl text-sm"
                style={{
                  padding: "0.5rem 1rem",
                }}
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
                }}
              >
                Cancel
              </button>
              <button
                className=" rounded-3xl text-sm"
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: primaryColor,
                  color: textOnPrimary,
                }}
                onClick={editingProduct ? saveEdit : addProduct}
              >
                {editingProduct ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-3xl shadow-lg flex items-center gap-4"
          style={{
            padding: "0.75rem 1.5rem",
          }}
        >
          <span className="text-sm font-medium">
            {selectedProducts.length} items selected
          </span>
          <button
            className=" rounded-3xl text-sm text-white"
            style={{ backgroundColor: secondaryColor, padding: "0.5rem 1rem" }}
            onClick={deleteSelectedProducts}
          >
            Delete Selected
          </button>
          <button
            className=" border rounded-3xl text-sm"
            style={{
              padding: "0.5rem 1rem",
            }}
            onClick={() => {
              setSelectedProducts([]);
              setSelectAll(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
