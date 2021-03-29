export default function employees(state, { type, payload }) {
  switch (type) {
    case "empty":
      localStorage.removeItem("employees");
      return {
        ...state,
        employees: [],
      };
    case "add": {
      const newState = {
        ...state,
        employees: [...state.employees, payload],
      };
      localStorage.setItem("employees", JSON.stringify(newState.employees));
      return newState;
    }
    case "update": {
      const updatedEmployee = payload;

      const updatedEmployees = state.employees.map((employee) => {
        if (employee.empNo === updatedEmployee.empNo) {
          return updatedEmployee;
        }
        return employee;
      });
      const newState = {
        ...state,
        employees: updatedEmployees,
      };
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));

      return newState;
    }
    case "delete": {
      const newState = {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.empNo !== payload
        ),
      };
      localStorage.setItem("employees", JSON.stringify(newState.employees));
      return newState;
    }
    default:
      return {
        ...state,
        employees: payload,
      };
  }
}
