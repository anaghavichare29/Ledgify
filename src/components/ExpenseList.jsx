function ExpenseList({ expenses }) {    
  return (
    expenses.length > 0 && (
      <div className="w-[1000px] mx-auto relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default center mt-[185px]">
        <div className="px-6 py-3 flex justify-between">
            <div>Expenses</div>
            <div>
                
<button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="inline-flex items-center justify-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
  Dropdown button 
  <svg class="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
</button>


<div id="dropdown" class="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
    <ul class="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Dashboard</a>
      </li>
      <li>
        <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Settings</a>
      </li>
      <li>
        <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Earnings</a>
      </li>
      <li>
        <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Sign out</a>
      </li>
    </ul>
</div>

                <button>sort by</button>
            </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Expense name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Category
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Date
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr className="bg-neutral-primary border-b border-default" key={expense.id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {expense.expenseName}
                </th>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{expense.category.icon}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {expense.category.label}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{expense.date}</td>
                <td className="px-6 py-4">${expense.amount}</td>
                <td className="px-6 py-4">231</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default ExpenseList;
