import { useState, useRef, useEffect } from "react";
import {
  BellIcon,
  GemIcon,
  LayoutDashboardIcon,
  ReceiptTextIcon,
  Search,
  ShoppingBagIcon,
  UsersRoundIcon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { NavDropdown } from "./NavDropdown";

const Navbar = () => {
  const location = useLocation();
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const options = ["Clothing", "Electronics", "Gadgets", "Utensils"];
  const navItems = [
    { path: "/", icon: <LayoutDashboardIcon />, label: "Dashboard" },
    { path: "/products", icon: <ShoppingBagIcon />, label: "Products" },
    { path: "/orders", icon: <ReceiptTextIcon />, label: "Orders" },
    { path: "/customers", icon: <UsersRoundIcon />, label: "Customers" },
    {
      path: "/promo-codes",
      icon: <GemIcon />,
      label: "Promo Codes",
    },
  ];

  // Update dimensions when the location changes
  useEffect(() => {
    const index = navItems.findIndex((item) => item.path === location.pathname);
    if (index !== -1) {
      updateDimensions(index);
    }
  }, [location.pathname]);

  // Update the dimensions based on the selected nav item
  const updateDimensions = (index: number) => {
    const currentNav = navRefs.current[index];
    const navContainer = navContainerRef.current;

    if (currentNav && navContainer) {
      // Get the position relative to the container
      const containerRect = navContainer.getBoundingClientRect();
      const itemRect = currentNav.getBoundingClientRect();

      setDimensions({
        width: itemRect.width,
        height: itemRect.height,
        // Calculate position relative to the nav container
        top: itemRect.top - containerRect.top,
        left: itemRect.left - containerRect.left,
      });
    }
  };

  return (
    <nav
      className="flex justify-between items-center bg-white rounded-full relative"
      style={{ padding: "1rem", margin: "1rem" }}
    >
      <div>
        <h1 className="text-3xl font-bold">Logo</h1>
      </div>

      <div ref={navContainerRef} className="relative">
        {/* Background indicator for active nav item */}
        <div
          className="absolute bg-[#C7F369] rounded-full transition-all duration-300 ease-in-out z-0"
          style={{
            width: dimensions.width,
            height: dimensions.height,
            top: dimensions.top,
            left: dimensions.left,
            opacity: dimensions.width ? 1 : 0,
          }}
        />

        <ul className="flex gap-4 relative z-10">
          {navItems.map((item, index) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                ref={(el) => {
                  navRefs.current[index] = el;
                }}
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2 rounded-full ${
                    isActive ? "text-black font-medium" : "hover:bg-gray-100"
                  }`
                }
                style={{ padding: "0.65rem 1rem" }}
              >
                {item.icon} {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="flex items-center justify-between gap-4">
          <li>
            <NavDropdown
              options={options}
              onChange={(selected) => console.log("Selected:", selected)}
            />
          </li>
          <li>
            <Search />
          </li>
          <li>
            <BellIcon />
          </li>
          <li>
            <img
              src="https://avatars.githubusercontent.com/u/121365480"
              alt="pfp"
              className="rounded-full w-8"
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
