import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";

function formatNumber(number: number) {
  let [integerPart, decimalPart] = number.toString().split(".");

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const taxRate = 0.19;

// const isTax = true;
const isTax = false;

function calculateInvestment(
  dividendRate: number,
  monthlyContribution: number,
  years: number
) {
  const annualContribution = monthlyContribution * 12;
  let total = 0;
  const results = [];

  for (let year = 1; year <= years; year++) {
    total += annualContribution;

    if (isTax) {
      const dividend = total * dividendRate;
      const taxedDividend = dividend * (1 - taxRate);
      total += taxedDividend;
    } else {
      total += total * dividendRate;
    }
    results.push({ year, total: +total.toFixed(2) });
  }

  return results;
}

const generateChartData = (
  monthlyAmounts: number[],
  annualRate: number,
  years: number
) => {
  const labels = Array.from({ length: years }, (_, i) => `${i + 1}`);
  const datasets = monthlyAmounts.map((amount) => {
    const data = calculateInvestment(annualRate / 100, amount, years).map(
      (d) => d.total
    );
    return {
      label: `Wpłata ${amount}PLN/mies`,
      data,
      fill: false,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`,
      tension: 0.5,
    };
  });

  return { labels, datasets };
};

const annualDividend = 5;
const contributionYears = 40;
// const monthlyAmounts = [100, 200, 300, 400, 500, 1000, 2000, 5000, 10_000];
const monthlyAmounts = [100, 250, 500, 660];

export const InvestmentChart: React.FC = () => {
  const chartData: ChartData<"line"> = generateChartData(
    monthlyAmounts,
    annualDividend,
    contributionYears
  );

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${formatNumber(context.parsed.y)} PLN`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Lata",
        },
      },
      y: {
        title: {
          display: true,
          text: "Wartość inwestycji",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        Inwestycyjny wzrost po {contributionYears} latach miesięcznych wpłat
        (dywidenda 5%) {isTax ? `(uwzględnione ${taxRate}% podatku)` : ""}
        {/* bez uwzględnienia podatku */}
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
};
