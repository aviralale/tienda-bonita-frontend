import { useState } from "react";

const TopCategories = () => {
  const [timeframe, setTimeframe] = useState("Weekly");

  // Sample data - replace with your backend data
  const categoryData = [
    { name: "Phones", percentage: 57 },
    { name: "Accessories", percentage: 28 },
    { name: "Watches", percentage: 15 },
  ];

  // Sort categories by percentage in descending order
  const sortedCategories = [...categoryData].sort(
    (a, b) => b.percentage - a.percentage
  );

  // Calculate dynamic styles based on percentage values
  const getStyles = () => {
    // Base positions for a layout like in the image
    const positions = [
      { top: 20, left: 80 }, // Top position (highest percentage)
      { top: 120, left: 50 }, // Bottom left (second highest)
      { top: 130, left: 220 }, // Bottom right (third highest)
    ];

    // Color scheme based on percentage ranking
    const colorScheme = [
      { bg: "#1F3B33", text: "white" }, // Highest
      { bg: "#D3F36B", text: "black" }, // Second
      { bg: "#EEEEEE", text: "black" }, // Third
    ];

    // Default color for any additional categories
    const defaultColor = { bg: "#F3F4F6", text: "black" };

    return sortedCategories.map((category, index) => {
      // Determine size based on percentage (higher percentage = larger circle)
      // The highest percentage gets size 160px, scaling down proportionally
      const highestPercentage = sortedCategories[0].percentage;
      const baseSize = 200;
      const minSize = 80;

      // Calculate size proportionally to the highest percentage
      let size = Math.max(
        (category.percentage / highestPercentage) * baseSize,
        minSize
      );
      const position = positions[index];

      // Get color (use default for any beyond the top 3)
      const color =
        index < colorScheme.length ? colorScheme[index] : defaultColor;

      return {
        ...category,
        size,
        top: position.top,
        left: position.left,
        backgroundColor: color.bg,
        color: color.text,
        zIndex: 10 + index, // Lower percentage items appear on top
      };
    });
  };

  const styledCategories = getStyles();

  return (
    <div
      className="rounded-3xl"
      style={{
        backgroundColor: "white",
        width: "100%",
        padding: "24px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            margin: 0,
          }}
        >
          Top categories
        </h2>

        <div style={{ position: "relative" }}>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
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
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
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

      <div style={{ height: "220px", position: "relative" }}>
        {styledCategories.map((category, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: `${category.size}px`,
              height: `${category.size}px`,
              borderRadius: "50%",
              backgroundColor: category.backgroundColor,
              color: category.color,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              top: `${category.top}px`,
              left: `${category.left}px`,
              zIndex: category.zIndex,
              transition: "all 0.3s ease", // Smooth transition for data changes
            }}
          >
            <div
              style={{
                fontSize: index === 0 ? "24px" : "20px",
                fontWeight: "700",
                lineHeight: "1",
              }}
            >
              {category.percentage}%
            </div>
            <div
              style={{
                fontSize: "14px",
                marginTop: "4px",
              }}
            >
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
