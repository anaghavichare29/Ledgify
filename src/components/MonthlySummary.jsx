import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function MonthlySummary({ expenses, budget }) {
  // LAST 5 MONTHS
  const currentDate = new Date();

  const last5Months = [];

  for (let i = 4; i >= 0; i--) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1,
    );

    last5Months.push(
      date.toLocaleString("default", {
        month: "short",
      }),
    );
  }

  // MONTHLY TOTALS
  const monthlyTotals = {};

  last5Months.forEach((month) => {
    monthlyTotals[month] = 0;
  });

  // CALCULATE TOTAL SPENT PER MONTH
  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);

    const expenseMonth = expenseDate.toLocaleString(
      "default",
      {
        month: "short",
      },
    );

    if (monthlyTotals.hasOwnProperty(expenseMonth)) {
      monthlyTotals[expenseMonth] += Number(
        expense.amount,
      );
    }
  });

  // CHART DATA
  const data = {
    labels: Object.keys(monthlyTotals),

    datasets: [
      {
        label: "Monthly Spending",

        data: Object.values(monthlyTotals),

        backgroundColor: [
          "#60A5FA",
          "#60A5FA",
          "#60A5FA",
          "#60A5FA",
          "#60A5FA",
        ],

        borderRadius: 8,

        barThickness: 45,
      },
    ],
  };

  // CHART OPTIONS
  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "Monthly Summary",

        color: "white",

        font: {
          size: 20,
          weight: "bold",
        },

        padding: {
          bottom: 30,
        },        
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return `₹${context.raw}`;
          },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "white",

          font: {
            size: 14,
          },
        },

        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        max:
          Math.ceil(budget / 5000) * 5000,

        ticks: {
          stepSize: 5000,

          color: "white",

          font: {
            size: 13,
          },
        },

        grid: {
          color: "#1F2937",
        },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl h-[450px]">
      <Bar data={data} options={options} />
    </div>
  );
}

export default MonthlySummary;