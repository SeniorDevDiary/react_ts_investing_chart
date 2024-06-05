import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const generateTradingData = () => {
  // Sample data for demonstration purposes
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const open = [100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155];
  const close = [110, 108, 115, 117, 123, 128, 133, 137, 143, 148, 153, 158];
  const high = [115, 112, 118, 120, 125, 130, 135, 140, 145, 150, 155, 160];
  const low = [95, 102, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150];

  return {
    labels,
    datasets: [
      {
        label: "Open",
        data: open,
        backgroundColor: "rgba(0, 255, 0, 0.5)",
        borderColor: "rgba(0, 255, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "Close",
        data: close,
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        borderColor: "rgba(255, 0, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "High",
        data: high,
        backgroundColor: "rgba(0, 0, 255, 0.5)",
        borderColor: "rgba(0, 0, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Low",
        data: low,
        backgroundColor: "rgba(128, 128, 128, 0.5)",
        borderColor: "rgba(128, 128, 128, 1)",
        borderWidth: 1,
      },
    ],
  };
};

export const TradingChart: React.FC = () => {
  const chartData: ChartData<"bar"> = generateTradingData();

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Years",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Trading Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};
