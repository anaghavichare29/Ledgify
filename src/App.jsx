import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { PiForkKnifeBold } from "react-icons/pi";
import { LuTrainFront } from "react-icons/lu";
import { FaTicket } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { GiShoppingBag } from "react-icons/gi";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoGrid } from "react-icons/io5";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Budget from "./components/Budget";
import CategoryDistribution from "./components/CategoryDistribution";
import MonthlySummary from "./components/MonthlySummary";

function App() {
  const STORAGE_KEY = "expense-list";

  const getInitialExpenses = () => {
    const savedExpenses = localStorage.getItem(STORAGE_KEY);
    if (savedExpenses) {
      try {
        return JSON.parse(savedExpenses);
      } catch (error) {
        console.error("error loading expenses from local storage", error);
      }
    }
    return [
      {
        id: uuidv4(),
        expenseName: "College Supplies",
        amount: "289",
        date: "2026-05-07",
        category: "Stationary",
      },
      {
        id: uuidv4(),
        expenseName: "Taxi Fare",
        amount: "60",
        date: "2026-05-04",
        category: "Travel",
      },
      {
        id: uuidv4(),
        expenseName: "McDonalds",
        amount: "586",
        date: "2026-05-17",
        category: "Food",
      },
    ];
  };
  const categories = [
    { label: "Food", icon: <PiForkKnifeBold /> },
    { label: "Travel", icon: <LuTrainFront /> },
    { label: "Subscription", icon: <FaTicket /> },
    { label: "Health", icon: <FaHeartbeat /> },
    { label: "Shopping", icon: <GiShoppingBag /> },
    { label: "Stationary", icon: <LuNotebookPen /> },
    {
      label: "Entertainment",
      icon: <BiSolidCameraMovie />,
    },
    { label: "Others", icon: <IoGrid /> },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState(getInitialExpenses);
  const [modalType, setModalType] = useState(null);
  const [editExpense, setEditExpense] = useState(null);
  const [formCategory, setFormCategory] = useState(categories[0]);
  const [formDropdownOpen, setFormDropdownOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [budget, setBudget] = useState(10000);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error("error saving expenses to local storage", error);
    }
  }, [expenses]);

  const handleOpenModal = () => {
    setModalType("Add");
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddExpense = (newExpense) => {
    const expenseLabel = {
      ...newExpense,
      category: newExpense.category.label,
    };
    setExpenses([...expenses, expenseLabel]);
  };
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };
  const handleEditModal = (id, expenseData) => {
    setModalType("Edit");
    setEditExpense(expenseData);
    setIsModalOpen(id);
  };
  const handelEditExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((p) => (p.id === updatedExpense.id ? updatedExpense : p)),
    );
  };
  return (
    <>
      <div className="min-h-screen">
        <Header openModal={handleOpenModal} />
        <ExpenseForm
          isOpen={isModalOpen}
          closeModal={handleCloseModal}
          addExpense={handleAddExpense}
          formDropdownOpen={formDropdownOpen}
          setFormDropdownOpen={setFormDropdownOpen}
          formCategory={formCategory}
          setFormCategory={setFormCategory}
          categories={categories}
          modalType={modalType}
          handleEditExpense={handelEditExpense}
          editExpense={editExpense}
        />
        <Budget expenses={expenses} budget={budget} setBudget={setBudget} />
        <div className="flex w-full">
          <div className="w-1/2 flex flex-col items-center justify-center">
            <CategoryDistribution expenses={expenses} budget={budget} />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center">
            <MonthlySummary expenses={expenses} budget={budget}/>
          </div>
        </div>
        <ExpenseList
          expenses={expenses}
          setExpenses={setExpenses}
          filterDropdownOpen={filterDropdownOpen}
          setFilterDropdownOpen={setFilterDropdownOpen}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categories={categories}
          deleteExpense={handleDeleteExpense}
          openEditModal={handleEditModal}
        />
      </div>
    </>
  );
}

export default App;
