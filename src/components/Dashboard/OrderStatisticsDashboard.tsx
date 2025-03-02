import { useState, useRef, useEffect } from "react";
import { heatMapData } from "../../data";
import { HeatMapData } from "../../lib/types";

interface SelectedCellInfo {
  label: string;
  subLabel: string;
  count: number;
  x: number;
  y: number;
}

interface OrdersStatisticsProps {
  data?: HeatMapData | null;
}

const OrdersStatistics: React.FC<OrdersStatisticsProps> = ({ data = null }) => {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "yearly">(
    "weekly"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCell, setSelectedCell] = useState<SelectedCellInfo | null>(
    null
  );

  // Default data structure if none provided

  // Use provided data or default data
  const orderData: HeatMapData = data || heatMapData;

  // Get current timeframe data based on selection
  const currentData = orderData[timeframe];

  // Get cell dimensions based on timeframe
  const getCellDimensions = () => {
    switch (timeframe) {
      case "monthly":
        return {
          width: 22,
          height: 22,
          margin: 2,
        };
      case "yearly":
        return {
          width: 30,
          height: 30,
          margin: 3,
        };
      case "weekly":
      default:
        return {
          width: 30,
          height: 30,
          margin: 3,
        };
    }
  };

  // Cell dimensions
  const cellDimensions = getCellDimensions();

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelectedCell(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to determine intensity level based on order count
  const getIntensityLevel = (count: number): number => {
    // Adjust thresholds based on timeframe
    const thresholds = {
      weekly: [0, 10, 20, 40, Infinity],
      monthly: [0, 50, 100, 150, Infinity],
      yearly: [0, 200, 350, 450, Infinity],
    };

    const currentThresholds = thresholds[timeframe];

    for (let i = 0; i < currentThresholds.length - 1; i++) {
      if (count >= currentThresholds[i] && count < currentThresholds[i + 1]) {
        return i;
      }
    }

    return 4; // Maximum intensity if all thresholds are exceeded
  };

  // Function to get cell style based on intensity
  const getCellStyle = (count: number): React.CSSProperties => {
    const level = getIntensityLevel(count);

    const baseStyle: React.CSSProperties = {
      width: `${cellDimensions.width}px`,
      height: `${cellDimensions.height}px`,
      margin: `${cellDimensions.margin}px`,
      borderRadius: "4px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    };

    switch (level) {
      case 0: // No orders
        return {
          ...baseStyle,
          backgroundColor: "#f8f8f8",
        };
      case 1: // Very low
        return {
          ...baseStyle,
          backgroundColor: "#E6F5D0",
        };
      case 2: // Low
        return {
          ...baseStyle,
          backgroundColor: "#DBFF86",
          backgroundImage:
            "linear-gradient(45deg, #DBFF86 25%, #C9ED74 25%, #C9ED74 50%, #DBFF86 50%, #DBFF86 75%, #C9ED74 75%, #C9ED74 100%)",
          backgroundSize: "8px 8px",
        };
      case 3: // Medium
        return {
          ...baseStyle,
          backgroundColor: "#C9ED74",
          backgroundImage:
            "linear-gradient(45deg, #C9ED74 25%, #B8DB63 25%, #B8DB63 50%, #C9ED74 50%, #C9ED74 75%, #B8DB63 75%, #B8DB63 100%)",
          backgroundSize: "8px 8px",
        };
      case 4: // High
        return {
          ...baseStyle,
          backgroundColor: "#B8DB63",
          backgroundImage:
            "linear-gradient(45deg, #B8DB63 25%, #A7C952 25%, #A7C952 50%, #B8DB63 50%, #B8DB63 75%, #A7C952 75%, #A7C952 100%)",
          backgroundSize: "8px 8px",
        };
      default:
        return baseStyle;
    }
  };

  // Get order count for a specific cell
  const getOrderCount = (index: number, subIndex: number): number => {
    const cell = currentData?.cells.find(
      (cell) => cell.index === index && cell.subIndex === subIndex
    );
    return cell ? cell.orders : 0;
  };

  // Click handler for cells
  const handleCellClick = (
    label: string,
    subLabel: string,
    count: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    // If already showing for this cell, hide it
    if (
      selectedCell &&
      selectedCell.label === label &&
      selectedCell.subLabel === subLabel
    ) {
      setSelectedCell(null);
      return;
    }

    // Calculate position relative to container
    const cellRect = event.currentTarget.getBoundingClientRect();
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    setSelectedCell({
      label,
      subLabel,
      count,
      x: cellRect.left - containerRect.left + cellRect.width / 2,
      y: cellRect.top - containerRect.top,
    });
  };

  // Function to get appropriate time period label based on timeframe
  const getTimePeriodLabel = (): string => {
    switch (timeframe) {
      case "weekly":
        return "Hours & Days";
      case "monthly":
        return "Weeks & Months";
      case "yearly":
        return "Quarters & Years";
      default:
        return "Time Period";
    }
  };

  return (
    <div
      ref={containerRef}
      className="rounded-3xl"
      style={{
        backgroundColor: "white",
        width: "100%",
        padding: "24px",
        position: "relative",
        overflow: "hidden", // Prevent inner content from overflowing
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            Orders statistics
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#6B7280",
              margin: "4px 0 0 0",
            }}
          >
            {getTimePeriodLabel()}
          </p>
        </div>

        {/* Timeframe Dropdown */}
        <div style={{ position: "relative" }}>
          <select
            value={timeframe}
            onChange={(e) =>
              setTimeframe(e.target.value as "weekly" | "monthly" | "yearly")
            }
            style={{
              appearance: "none",
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "9999px",
              fontSize: "14px",
              padding: "8px 32px 8px 16px",
              cursor: "pointer",
            }}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <div
            style={{
              pointerEvents: "none",
              position: "absolute",
              top: "0",
              right: "0",
              bottom: "0",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
            }}
          >
            <svg
              style={{
                fill: "#6B7280",
                height: "16px",
                width: "16px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Scrollable Container for Heatmap */}
      <div
        className="flex justify-center items-center"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: timeframe === "monthly" ? "416px" : "auto", // Ensure minimum width for monthly view
          }}
        >
          {/* Labels and Cells */}
          {currentData?.labels.map((label, index) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              {/* Main Label */}
              <div
                style={{
                  width: "60px", // Increased width to accommodate longer labels
                  fontSize: "12px",
                  color: "#666",
                  textAlign: "right",
                  marginRight: "8px",
                  flexShrink: 0, // Prevent label from shrinking
                }}
              >
                {label}
              </div>

              {/* SubLabel Cells for this row */}
              <div style={{ display: "flex" }}>
                {currentData.subLabels.map((subLabel, subIndex) => {
                  const count = getOrderCount(index, subIndex);
                  return (
                    <div
                      key={`${label}-${subLabel}`}
                      style={getCellStyle(count)}
                      onClick={(e) =>
                        handleCellClick(label, subLabel, count, e)
                      }
                    />
                  );
                })}
              </div>
            </div>
          ))}

          {/* SubLabel Labels */}
          <div
            style={{
              display: "flex",
              marginLeft: "68px", // Adjusted for wider main labels
              marginTop: "4px",
            }}
          >
            {currentData?.subLabels.map((subLabel) => (
              <div
                key={subLabel}
                style={{
                  width: `${cellDimensions.width}px`,
                  margin: `${cellDimensions.margin}px`,
                  textAlign: "center",
                  fontSize: "12px",
                  color: "#666",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {subLabel}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "16px",
          gap: "12px",
          flexWrap: "wrap", // Allow wrapping on smaller screens
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#E6F5D0",
              marginRight: "4px",
              borderRadius: "2px",
            }}
          />
          <span style={{ fontSize: "12px", color: "#666" }}>Low</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#DBFF86",
              marginRight: "4px",
              borderRadius: "2px",
              backgroundImage:
                "linear-gradient(45deg, #DBFF86 25%, #C9ED74 25%, #C9ED74 50%, #DBFF86 50%, #DBFF86 75%, #C9ED74 75%, #C9ED74 100%)",
              backgroundSize: "8px 8px",
            }}
          />
          <span style={{ fontSize: "12px", color: "#666" }}>Medium</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#C9ED74",
              marginRight: "4px",
              borderRadius: "2px",
              backgroundImage:
                "linear-gradient(45deg, #C9ED74 25%, #B8DB63 25%, #B8DB63 50%, #C9ED74 50%, #C9ED74 75%, #B8DB63 75%, #B8DB63 100%)",
              backgroundSize: "8px 8px",
            }}
          />
          <span style={{ fontSize: "12px", color: "#666" }}>High</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#A7C952",
              marginRight: "4px",
              borderRadius: "2px",
              backgroundImage:
                "linear-gradient(45deg, #B8DB63 25%, #A7C952 25%, #A7C952 50%, #B8DB63 50%, #B8DB63 75%, #A7C952 75%, #A7C952 100%)",
              backgroundSize: "8px 8px",
            }}
          />
          <span style={{ fontSize: "12px", color: "#666" }}>Very High</span>
        </div>
      </div>

      {/* Popup for selected cell */}
      {selectedCell && (
        <div
          style={{
            position: "absolute",
            left: `${selectedCell.x}px`,
            top: `${selectedCell.y - 40}px`,
            transform: "translateX(-50%)",
            backgroundColor: "black",
            color: "white",
            padding: "8px 12px",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "500",
            zIndex: 10,
          }}
        >
          <div style={{ textAlign: "center" }}>
            {selectedCell.count} orders
            <div>
              {selectedCell.label}, {selectedCell.subLabel}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "0",
              height: "0",
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid black",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default OrdersStatistics;
