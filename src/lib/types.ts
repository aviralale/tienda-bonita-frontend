// Define types for our data structure
export interface OrderData {
  month: string;
  online: number;
  offline: number;
  total: number;
}

interface OrderCell {
  index: number; // hour, day, week, or month index
  subIndex: number; // day, week, or month index
  orders: number;
}

interface TimeframeData {
  labels: string[]; // Main labels (hours, days, weeks)
  subLabels: string[]; // Sub labels (days, weeks, months)
  cells: OrderCell[];
}

export interface HeatMapData {
  weekly: TimeframeData;
  monthly: TimeframeData;
  yearly: TimeframeData;
}

export interface YearData {
  [year: string]: {
    months: OrderData[];
    weeks?: {
      [month: string]: OrderData[];
    };
    days?: {
      [monthWeek: string]: OrderData[];
    };
  };
}

interface ProductSales {
  year: number;
  month: number;
  week: number;
}

interface ProductEarning {
  year: number;
  month: number;
  week: number;
}

export interface Product {
  id: string;
  name: string;
  sales: ProductSales;
  price: number;
  earning: ProductEarning;
  image: string;
  category: string;
}
