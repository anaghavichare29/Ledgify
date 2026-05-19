import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaSort } from "react-icons/fa6";
import { GiConsoleController } from "react-icons/gi";
import { GoTrash } from "react-icons/go";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { IoGrid } from "react-icons/io5";

function ExpenseList({
  expenses,
  setExpenses,
  filterDropdownOpen,
  setFilterDropdownOpen,
  filterCategory,
  setFilterCategory,
  categories,
  deleteExpense,
  openEditModal,
}) {
  const [filterDate, setFilterDate] = useState("All");
  const [sortBy, setSortBy] = useState("Sort By");
  const [sortByDropown, setSortByDropdown] = useState(false);

  const d = new Date();
  console.log(d.getDate());
  console.log(d.getMonth());

  const sortByLabel = [
    { id: "amtdown", label: "Amount", icon: <IoIosArrowRoundDown /> },
    { id: "amtup", label: "Amount", icon: <IoIosArrowRoundUp /> },
    { id: "datedown", label: "Date", icon: <IoIosArrowRoundDown /> },
    { id: "dateup", label: "Date", icon: <IoIosArrowRoundUp /> },
  ];
  const getIcon = (label) => {
    const category = categories.find((c) => c.label === label);
    return category ? category.icon : <IoGrid />;
  };

  const filteredExpensesByCategory = expenses.filter((expense) => {
    const categoryMatch =
      filterCategory === "All" ||
      (typeof expense.category === "string"
        ? expense.category === filterCategory.label
        : expense.category.label === filterCategory.label);

    const today = new Date();

    const expenseDate = new Date(expense.date);

    //if u don't do this timestamp change hojayega and 'today' ka filter will fail as timestamps won't be identical
    today.setHours(0, 0, 0, 0);
    expenseDate.setHours(0, 0, 0, 0);

    let dateMatch = true;

    if (filterDate === "Today") {
      dateMatch = expenseDate.getTime() === today.getTime();
    } else if (filterDate === "Week") {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);

      dateMatch = expenseDate >= weekAgo && expenseDate <= today;
    } else if (filterDate === "Month") {
      dateMatch =
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear();
    }

    return categoryMatch && dateMatch;
  });

  const sortedExpenses = [...filteredExpensesByCategory].sort((a, b) => {
    if (sortBy === "Sort By") return 0;
    switch (sortBy.id) {
      case "amtdown":
        return Number(b.amount) - Number(a.amount);
      case "amtup":
        return Number(a.amount) - Number(b.amount);
      case "dateup":
        return new Date(a.date) - new Date(b.date);
      case "datedown":
        return new Date(b.date) - new Date(a.date);
      default:
        return 0;
    }
  });

  return (
    expenses.length > 0 && (
      <div className="max-w-5xl w-full mx-auto my-15 relative overflow-hidden bg-gray-800 shadow-xs rounded-base border border-default ">
        <div className="px-6 py-3 flex justify-between border border-default">
          <div className="text-blue-200 items-center text-center font-bold text-3xl">
            Expenses
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <form className="w-[350px] mx-auto">
              <label
                htmlFor="search"
                className="block mb-2.5 text-sm font-medium text-heading sr-only "
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-body"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"                  
                  className="block w-full p-3 ps-9 bg-neutral-secondary-medium text-heading text-sm rounded-base shadow-xs placeholder:text-body"
                  placeholder="Search"
                  required
                />
                <button
                  type="button"
                  className="absolute end-1.5 bottom-1.5 bg-blue-500 hover:bg-blue-600  shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 text-black"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="px-6 py-3 flex justify-between border border-default">
          <div className="flex gap-5">
            <div>
              <button
                type="button"
                className={`items-center p-2 bg-white border rounded-lg text-sm ${filterDate === "All" ? "border-blue-400" : "hover:border-blue-400 border-gray-300"} border-2 transition-all`}
                onClick={() => setFilterDate("All")}
              >
                All
              </button>
            </div>
            <div>
              <button
                type="button"
                className={`items-center p-2 bg-white border rounded-lg text-sm ${filterDate === "Today" ? "border-blue-400" : "hover:border-blue-400 border-gray-300"} border-2 transition-all`}
                onClick={() => setFilterDate("Today")}
              >
                Today
              </button>
            </div>
            <div>
              <button
                type="button"
                className={`items-center p-2 bg-white border rounded-lg text-sm ${filterDate === "Week" ? "border-blue-400" : "hover:border-blue-400 border-gray-300"} border-2 transition-all`}
                onClick={() => setFilterDate("Week")}
              >
                Week
              </button>
            </div>
            <div>
              <button
                type="button"
                className={`items-center p-2 bg-white border rounded-lg text-sm ${filterDate === "Month" ? "border-blue-400" : "hover:border-blue-400 border-gray-300"} border-2 transition-all`}
                onClick={() => setFilterDate("Month")}
              >
                Month
              </button>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex">
              <button
                type="button"
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className="items-center p-2 bg-white border border-gray-300 rounded-lg  text-sm hover:border-blue-400 border-2 focus:ring-blue-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">
                    {filterCategory == "All" ? (
                      <IoGrid />
                    ) : (
                      <span>{filterCategory.icon}</span>
                    )}
                  </span>
                  <span className="font-medium text-gray-900">
                    {filterCategory == "All" ? "All" : filterCategory.label}
                  </span>
                </div>
              </button>
              {filterDropdownOpen && (
                <div className="absolute h-45 w-37 overflow-x-hidden z-20 mt-12 bg-white border border-gray-200 rounded-lg shadow-xl overflow-y-auto">
                  <button
                    className="w-full flex items-center text-center justify-between px-4 py-3 text-sm hover:bg-blue-50 transition-colors"
                    type="button"
                    onClick={() => {
                      setFilterCategory("All");
                      setFilterDropdownOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">
                        <IoGrid />
                      </span>
                      <span>All</span>
                    </div>
                  </button>
                  {categories.map((category) => (
                    <button
                      type="button"
                      onClick={() => {
                        setFilterCategory(category);
                        setFilterDropdownOpen(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400">{category.icon}</span>
                        <span>{category.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                className="items-center p-2 bg-white border border-gray-300 rounded-lg  text-sm hover:border-blue-400  border-2 focus:ring-blue-100 transition-all"
                onClick={() => setSortByDropdown(!sortByDropown)}
              >
                <div className="flex items-center">
                  <div>{sortBy === "Sort By" ? "Sort By" : sortBy.label}</div>
                  <div>{sortBy === "Sort By" ? <FaSort /> : sortBy.icon}</div>
                </div>
              </button>
              {sortByDropown && (
                <div className="absolute h-45 w-37 overflow-x-hidden z-20 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl overflow-y-auto">
                  <button
                    className="w-full flex items-center text-center justify-between px-4 py-3 text-sm hover:bg-blue-50 transition-colors"
                    type="button"
                    onClick={() => {
                      setSortBy("Sort By");
                      setSortByDropdown(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Sort By</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </button>
                  {sortByLabel.map((l) => (
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy(l);
                        setSortByDropdown(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div>{l.label}</div>
                        <div>{l.icon}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-900 rounded-base overflow-hidden">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="block w-full text-sm text-body bg-gray-900 border-b border-default">
              <tr className="flex w-full">
                <th className="px-6 py-3 font-bold flex-1">Expense name</th>
                <th className="px-6 py-3 font-bold flex-1">Category</th>
                <th className="px-6 py-3 font-bold flex-1">Date</th>
                <th className="px-6 py-3 font-bold flex-1">Amount</th>
                <th className="px-6 py-3 font-medium w-20"></th>
              </tr>
            </thead>

            <tbody className="block w-full max-h-[315px] overflow-y-auto custom-scrollbar">
              {sortedExpenses.map((expense) => (
                <tr
                  className="flex w-full bg-gray-900 border-b border-default text-white hover:bg-gray-800 transition-colors"
                  key={expense.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap flex-1"
                  >
                    {expense.expenseName}
                  </th>
                  <td className="px-6 py-4 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {typeof expense.category === "string"
                          ? getIcon(expense.category)
                          : expense.category.icon}
                      </span>
                      <span className="font-medium">
                        {typeof expense.category === "string"
                          ? expense.category
                          : expense.category.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 flex-1">{expense.date}</td>
                  <td className="px-6 py-4 flex-1 ml-8">₹{expense.amount}</td>
                  <td className="px-6 py-4  text-gray-500">
                    <div className="flex">
                      <button
                        type="button"
                        className="mr-4 cursor-pointer text-yellow-300"
                        onClick={() => openEditModal(expense.id, expense)}
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        type="button"
                        className="cursor-pointer text-red-300"
                      >
                        <GoTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}

export default ExpenseList;
