import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { OrderData } from "../../lib/types";
import { OrderGraphData } from "../../data";

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-black text-white rounded"
        style={{ padding: "8px 12px" }}
      >
        {payload.map((entry, index) => (
          <p key={index} className="text-xs" style={{ margin: "2px 0" }}>
            {entry.name === "online" ? "Online" : "Offline"}: {entry.value} pcs
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const OrdersDashboard: React.FC = () => {
  const [filter, setFilter] = useState<string>("Yearly");
  const [filteredData, setFilteredData] = useState<OrderData[]>([]);
  const [year, setYear] = useState<string>("2024");
  const [selectedMonth, setSelectedMonth] = useState<string>("Jan");
  const [selectedWeek, setSelectedWeek] = useState<string>("Week 1");
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [availableWeeks, setAvailableWeeks] = useState<string[]>([]);
  const [timeLabel, setTimeLabel] = useState<string>("year");
  const [yAxisDomain, setYAxisDomain] = useState<[number, number]>([0, 1200]);

  const DEFAULT_WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const getAvailableMonths = (yr: string): string[] => {
    if (!OrderGraphData[yr]) return [];

    return OrderGraphData[yr].months.map((item) => item.month);
  };

  const getAvailableWeeks = (yr: string, month: string): string[] => {
    if (
      !OrderGraphData[yr] ||
      !OrderGraphData[yr].weeks ||
      !OrderGraphData[yr].weeks[month]
    ) {
      return DEFAULT_WEEKS;
    }

    return OrderGraphData[yr].weeks[month].map((item) => item.month);
  };

  useEffect(() => {
    const years = Object.keys(OrderGraphData).sort().reverse();
    setAvailableYears(years);

    if (years.length > 0) {
      const defaultYear = years[0];
      setYear(defaultYear);

      const months = getAvailableMonths(defaultYear);
      setAvailableMonths(months);
      if (months.length > 0) {
        setSelectedMonth(months[0]);

        const weeks = getAvailableWeeks(defaultYear, months[0]);
        setAvailableWeeks(weeks);
        if (weeks.length > 0) {
          setSelectedWeek(weeks[0]);
        }
      }
    }
  }, []);

  useEffect(() => {
    const months = getAvailableMonths(year);
    setAvailableMonths(months);

    if (months.length > 0 && !months.includes(selectedMonth)) {
      setSelectedMonth(months[0]);
    }
  }, [year]);

  useEffect(() => {
    const weeks = getAvailableWeeks(year, selectedMonth);
    setAvailableWeeks(weeks);

    if (weeks.length > 0 && !weeks.includes(selectedWeek)) {
      setSelectedWeek(weeks[0]);
    }
  }, [selectedMonth, year]);

  const generateWeeksData = (monthData: OrderData): OrderData[] => {
    if (!monthData) return [];

    const result: OrderData[] = [];
    for (let i = 0; i < 4; i++) {
      const weekNum = i + 1;
      const factor = 0.9 + Math.random() * 0.2;
      result.push({
        month: `Week ${weekNum}`,
        online: Math.round((monthData.online / 4) * factor),
        offline: Math.round((monthData.offline / 4) * factor),
        total: Math.round((monthData.total / 4) * factor),
      });
    }
    return result;
  };

  const generateDailyData = (weekData: OrderData): OrderData[] => {
    if (!weekData) return [];

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const result: OrderData[] = [];

    const avgOnline = weekData.online / 7;
    const avgOffline = weekData.offline / 7;

    days.forEach((day) => {
      const onlineFactor =
        day === "Sat" || day === "Sun"
          ? 0.6 + Math.random() * 0.2
          : 0.9 + Math.random() * 0.2;
      const offlineFactor =
        day === "Sat" || day === "Sun"
          ? 0.7 + Math.random() * 0.2
          : 0.9 + Math.random() * 0.2;

      const online = Math.round(avgOnline * onlineFactor);
      const offline = Math.round(avgOffline * offlineFactor);

      result.push({
        month: day,
        online,
        offline,
        total: online + offline,
      });
    });

    return result;
  };

  const calculateYAxisConfig = (data: OrderData[]) => {
    if (!data || data.length === 0) {
      setYAxisDomain([0, 1200]); // Default domain
      return;
    }

    const maxValue = Math.max(...data.map((item) => item.total));
    let roundingFactor = 100;

    if (maxValue <= 50) {
      roundingFactor = 10;
    } else if (maxValue <= 100) {
      roundingFactor = 20;
    } else if (maxValue <= 200) {
      roundingFactor = 50;
    } else if (maxValue <= 500) {
      roundingFactor = 100;
    } else if (maxValue <= 1000) {
      roundingFactor = 200;
    } else if (maxValue <= 5000) {
      roundingFactor = 500;
    } else {
      roundingFactor = 1000;
    }

    const paddedMax =
      Math.ceil((maxValue * 1.15) / roundingFactor) * roundingFactor;
    setYAxisDomain([0, paddedMax]);
  };

  const generateTicks = (max: number) => {
    const ticks: number[] = [];
    const tickCount = 5;
    const step = max / (tickCount - 1);

    for (let i = 0; i < tickCount; i++) {
      ticks.push(Math.round(step * i));
    }

    return ticks;
  };

  useEffect(() => {
    if (!OrderGraphData[year]) return;

    let result: OrderData[] = [];

    switch (filter) {
      case "Yearly":
        result = [...OrderGraphData[year].months];
        setTimeLabel("year");
        break;

      case "Monthly":
        if (
          OrderGraphData[year].weeks &&
          OrderGraphData[year].weeks[selectedMonth]
        ) {
          result = OrderGraphData[year].weeks[selectedMonth];
        } else {
          const monthData = OrderGraphData[year].months.find(
            (item) => item.month === selectedMonth
          );
          if (monthData) {
            result = generateWeeksData(monthData);
          }
        }
        setTimeLabel(`${selectedMonth} (weekly)`);
        break;

      case "Weekly":
        const weekKey = `${selectedMonth}-${selectedWeek.replace(/\s+/g, "")}`;

        if (OrderGraphData[year].days && OrderGraphData[year].days[weekKey]) {
          result = OrderGraphData[year].days[weekKey];
        } else {
          const weekData = OrderGraphData[year].weeks?.[selectedMonth]?.find(
            (item) => item.month === selectedWeek
          );

          if (weekData) {
            result = generateDailyData(weekData);
          } else {
            const monthData = OrderGraphData[year].months.find(
              (item) => item.month === selectedMonth
            );
            if (monthData) {
              const weekEstimate = {
                month: selectedWeek,
                online: Math.round(monthData.online / 4),
                offline: Math.round(monthData.offline / 4),
                total: Math.round(monthData.total / 4),
              };
              result = generateDailyData(weekEstimate);
            }
          }
        }
        setTimeLabel(`${selectedMonth} ${selectedWeek} (daily)`);
        break;

      default:
        result = [...OrderGraphData[year].months];
        setTimeLabel("year");
    }

    setFilteredData(result);
    calculateYAxisConfig(result);
  }, [filter, year, selectedMonth, selectedWeek]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="bg-white rounded-3xl w-full" style={{ padding: "2rem" }}>
      <div
        className="flex justify-between items-center"
        style={{ marginBottom: "20px" }}
      >
        <div>
          <h2 className="text-xl font-bold">Orders</h2>
          <div className="text-sm text-gray-500">
            {year} • {timeLabel}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lime-400"></div>
            <span className="text-sm">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
            <span className="text-sm">Offline</span>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="appearance-none border border-gray-300 rounded-full bg-white text-sm"
                style={{ padding: "8px 32px 8px 16px", paddingRight: "2rem" }}
              >
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="appearance-none border border-gray-300 rounded-full bg-white text-sm"
                style={{ padding: "8px 32px 8px 16px", paddingRight: "2rem" }}
              >
                {availableYears.map((yearOption) => (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {(filter === "Monthly" || filter === "Weekly") && (
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="appearance-none border border-gray-300 rounded-full bg-white text-sm"
                  style={{ padding: "8px 32px 8px 16px", paddingRight: "2rem" }}
                >
                  {availableMonths.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}

            {filter === "Weekly" && (
              <div className="relative">
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="appearance-none border border-gray-300 rounded-full bg-white text-sm"
                  style={{ padding: "8px 32px 8px 16px", paddingRight: "2rem" }}
                >
                  {availableWeeks.map((week) => (
                    <option key={week} value={week}>
                      {week}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={
              filter === "Yearly" ? 70 : filter === "Monthly" ? 110 : 110
            }
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#777" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#777" }}
              domain={yAxisDomain}
              ticks={generateTicks(yAxisDomain[1])}
              allowDataOverflow={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey="offline"
              stackId="a"
              fill="#1e3a34"
              radius={[12, 12, 12, 12]}
            />
            <Bar
              dataKey="online"
              stackId="a"
              fill="url(#colorOnline)"
              radius={[12, 12, 12, 12]}
            />
            <defs>
              <pattern
                id="colorOnline"
                patternUnits="userSpaceOnUse"
                width="8"
                height="8"
                patternTransform="rotate(45)"
              >
                <rect width="8" height="8" fill="#D7FF83" />
                <rect width="4" height="8" fill="#B7EA3E" />
              </pattern>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersDashboard;
