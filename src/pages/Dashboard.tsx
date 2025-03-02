import OrdersDashboard from "../components/Dashboard/OrdersStatsDashboard";
import OrdersStatistics from "../components/Dashboard/OrderStatisticsDashboard";
import TopCategories from "../components/Dashboard/TopCategoriesDashboard";
import TopSellingProducts from "../components/Dashboard/TopSellingProductsDashboard";
import TotalCards from "../components/Dashboard/TotalCards";

const Dashboard = () => {
  return (
    <div
      className="w-full flex justify-center gap-8 min-h-screen"
      style={{ padding: "0 2rem" }}
    >
      <div className="flex flex-col items-center justify-center gap-4 w-3/4">
        <div className="flex gap-4 w-full">
          <TotalCards
            title="Total Sales"
            amount={662541.11}
            percentage={12.5}
          />
          <TotalCards
            title="Total Orders"
            amount={247721.65}
            percentage={-2.5}
          />
          <TotalCards
            title="Total Revenue"
            amount={590221.34}
            percentage={7.2}
          />
        </div>
        <div className="flex w-full">
          <OrdersDashboard />
        </div>
        <div className="flex w-full">
          <TopSellingProducts />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-1/4 h-full">
        <div className="flex h-1/2 w-full">
          <OrdersStatistics />
        </div>
        <div className="flex h-1/2 w-full">
          <TopCategories />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
