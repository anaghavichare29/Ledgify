import { useState } from "react";
import logo from "../assets/ledgify-logo.png";
function Header({openModal}) {
  const months = [
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
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()],
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectedMonth = (month) => {
    setSelectedMonth(month);
    setIsOpen(false);
  };

  return (
    <nav className="overflow-x-hidden w-full z-9999 top-0 start-0 shadow-xl">
      <div className="flex flex-wrap items-center justify-between p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-14 max-h" alt="Flowbite Logo" />
          <span className="self-center text-3xl text-heading font-semibold whitespace-nowrap italic text-yellow-500">
            Ledgify
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            data-modal-target="crud-modal"
            data-modal-toggle="crud-modal"
            className="text-white bg-green-800 hover:bg-green-900 box-border border border-transparent shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none mr-3"
            onClick={openModal}
          >
            Add Expense
          </button>
          <div className="relative inline-block text-left">
            {/* Grouping the label and button to look like a single unit */}
            <div className="flex items-center">
              <span className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-s-lg border-e-0">
                {selectedMonth}
              </span>

              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-body bg-neutral-primary-soft border border-default hover:bg-neutral-secondary-medium hover:text-heading font-medium leading-5 rounded-e-lg text-sm px-3 py-2 focus:outline-none"
              >
                <svg
                  className={`w-4 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mr-20">
                <div className="py-1 h-60 overflow-y-auto">
                  {months.map((month) => (
                    <button
                      key={month}
                      onClick={() => handleSelectedMonth(month)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        selectedMonth === month
                          ? "bg-blue-50 text-blue-700 font-bold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </nav>
  );
}

export default Header;
