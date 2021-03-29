const employeeInitialState = {
  employees: JSON.parse(localStorage.getItem("employees")) ?? [],
};

export default employeeInitialState;
