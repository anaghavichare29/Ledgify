import { PiForkKnifeBold } from "react-icons/pi";
import { LuTrainFront } from "react-icons/lu";
import { FaTicket } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { GiShoppingBag } from "react-icons/gi";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoGrid } from "react-icons/io5";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function ExpenseForm({ isOpen, closeModal, addExpense }) {
  const categories = [
    { id: uuidv4(), label: "Food", icon: <PiForkKnifeBold /> },
    { id: uuidv4(), label: "Travel", icon: <LuTrainFront /> },
    { id: uuidv4(), label: "Subscription", icon: <FaTicket /> },
    { id: uuidv4(), label: "Health", icon: <FaHeartbeat /> },
    { id: uuidv4(), label: "Shopping", icon: <GiShoppingBag /> },
    { id: uuidv4(), label: "Stationary", icon: <LuNotebookPen /> },
    {
      id: uuidv4(),
      label: "Entertainment",
      icon: <BiSolidCameraMovie />,
    },
    { id: uuidv4(), label: "Others", icon: <IoGrid /> },
  ];
  const [formData, setFormData] = useState({
    expenseName: "",
    amount: "",
    date: "",
  });

  const [dropdownOpen, isDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // STOP page reload

    const newExpense = {
      id: uuidv4(),
      expenseName: formData.expenseName,
      amount: formData.amount,
      date: formData.date,
      category: selectedCategory, // This now contains the whole object {label, icon}
    };

    addExpense(newExpense);
    // Reset form
    setFormData({ expenseName: "", amount: "", date: "" });
  };

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${isOpen ? "flex" : "hidden"} fixed inset-0 z-50 justify-center items-center w-full h-screen bg-neutral-900/60 overflow-y-auto overflow-x-hidden`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
            <h3 className="text-lg font-medium text-heading">
              Create new product
            </h3>
            <button
              type="button"
              className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
              data-modal-hide="crud-modal"
              onClick={closeModal}
            >
              <svg
                className="w-5 h-5"
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
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Name
                </label>
                <input
                  name="expenseName"
                  value={formData.expenseName}
                  onChange={handleChange}
                  id="name"
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Expense title"
                  required=""
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  id="price"
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="$2999"
                  required=""
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Category
                </label>
                <button
                  type="button"
                  onClick={() => isDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">
                      {selectedCategory.icon}
                    </span>
                    <span className="font-medium text-gray-900">
                      {selectedCategory.label}
                    </span>
                  </div>
                </button>
                {dropdownOpen && (
                  <div className="absolute h-45 z-20 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        type="button"
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category);
                          isDropdownOpen(false);
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
              <div className="col-span-2">
                <label
                  htmlFor="date"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  id="date"
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Expense date"
                  required=""
                />
              </div>
            </div>
            <div className="flex items-center space-x-4 border-t border-default pt-4 md:pt-6">
              <button
                type="submit"
                className="inline-flex items-center  text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                <svg
                  className="w-4 h-4 me-1.5 -ms-0.5"
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
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
                Add new product
              </button>
              <button
                data-modal-hide="crud-modal"
                type="button"
                className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExpenseForm;
