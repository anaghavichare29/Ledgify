function Budget({ expenses, budget, setBudget }) {
  const d = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[d.getMonth()];
  const handleChange = (e) => {
    setBudget(Number(e.target.value));
  };
  let totalSpent = 0;
  expenses.forEach((expense) => {
    totalSpent += Number(expense.amount);
  });
  const remainingBal = budget - totalSpent;
  const spentPercentage =
    budget > 0 ? ((totalSpent / budget) * 100).toFixed(1) : 0;
  return (
    <div className="px-19 pt-9">
      <div className="flex mb-9">
        <div className="text-blue-200 font-semibold text-xl">
          Set Monthly Budget:
        </div>
        <div className="px-3">
          <input
            value={budget}
            onChange={handleChange}
            type="number"
            id="number-input"
            aria-describedby="helper-text-explanation"
            className="px-3 py-2.5 bg-neutral-secondary-medium text-heading text-sm rounded-base shadow-xs placeholder:text-body"
            placeholder="10000"
            required
          />
        </div>
      </div>
      <div className="flex justify-between pt-5">
        <div className="text-blue-200">
          Monthly Budget — {month} {d.getFullYear()}
        </div>
        <div className="flex gap-3">
          <div className="text-blue-200">Budget: ₹{budget}</div>
          <div className="text-yellow-300">Spent: ₹{totalSpent}</div>
          <div className="text-green-300">Remaining Bal: ₹{remainingBal}</div>
        </div>
      </div>
      <div className="w-full bg-gray-600 rounded-full mt-5">
        <div
          className="bg-blue-200 text-xs font-medium text-blue-900 text-center p-0.5 leading-none rounded-full h-4 flex items-center justify-center font-semibold   "
          style={{ width: `${spentPercentage}%` }}
        >
          {" "}
          {spentPercentage}%
        </div>
      </div>
      <div className="flex text-white justify-between text-sm mt-2">
        <div>0</div>
        <div>{spentPercentage}% used</div>
        <div>₹{budget}</div>
      </div>
    </div>
  );
}

export default Budget;
