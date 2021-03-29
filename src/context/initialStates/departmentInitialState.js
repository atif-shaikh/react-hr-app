const departmentInitialState = {
  departments: JSON.parse(localStorage.getItem("departments")) ?? [],
};

export default departmentInitialState;
