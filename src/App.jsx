import React, { useState } from 'react'
import Header from './components/Header'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList';

function App() {
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [expenses,setExpenses] = useState([]);

  const handleOpenModal = () =>{
    setIsModalOpen(true);
  }
  const handleCloseModal = () =>{
    setIsModalOpen(false);
  }
  const handleAddExpense=(newExpense)=>{
    setExpenses([...expenses,newExpense])
  }
  return (    
    <>
    <Header openModal={handleOpenModal}/>
    <ExpenseForm isOpen={isModalOpen} closeModal={handleCloseModal} addExpense={handleAddExpense}/>
    <ExpenseList expenses={expenses}/>
    </>
  )
}

export default App