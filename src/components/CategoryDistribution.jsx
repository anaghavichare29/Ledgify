import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);
function CategoryDistribution({ expenses, budget }) {
  const categoryTotals = {};
  expenses.forEach((expense) => {
    const category =
      typeof expense.category === "string"
        ? expense.category
        : expense.category.label;
    if (categoryTotals[category])
      categoryTotals[category] += Number(expense.amount);
    else categoryTotals[category] = Number(expense.amount);
  });

  const categoryData = Object.entries(categoryTotals).map(
    ([category, amount], index) => ({
      category,
      amount,
      percentage: ((amount / budget) * 100).toFixed(1),
      color: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#967BB6",
        "#90EE90",
        "#FFB6C1",
        "#808080",
        "#B53389",
      ][index],
    }),
  );
  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(categoryTotals).map((amount) =>
          ((amount / budget) * 100).toFixed(1),
        ),
        backgroundColor: categoryData.map((item) => item.color),
        hoverBackgroundColor: categoryData.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%", // Controls the size of the hole (defaults to 50%)
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
  };
  return (
    <div style={{ width: "400px"}} className="mt-20 justify-center">
      <h2 className="px-19 mb-5 text-white font-bold text-xl">Category Distribution</h2>
      <Doughnut data={data} options={options} className="justify-center" />
      <div className="mt-6 space-y-3">
        {categoryData.map((item) => (
          <div
            key={item.category}
            className="flex items-center justify-between text-white"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <span>{item.category}</span>
            </div>

            <div className="text-gray-300">
              {item.percentage}% - ₹{item.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryDistribution;
