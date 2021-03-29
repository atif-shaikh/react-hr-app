export default function departments(state, { type, payload }) {
  switch (type) {
    case "empty":
      console.log("inside Dispastch");
      localStorage.removeItem("departments");
      return {
        ...state,
        departments: [],
      };
    case "add": {
      const newState = {
        ...state,
        departments: [...state.departments, payload],
      };
      localStorage.setItem("departments", JSON.stringify(newState.departments));
      return newState;
    }

    case "update": {
      const updatedDepartment = payload;

      const updatedDepartments = state.departments.map((department) => {
        if (department.deptNo === updatedDepartment.deptNo) {
          return updatedDepartment;
        }
        return department;
      });
      const newState = {
        ...state,
        departments: updatedDepartments,
      };
      localStorage.setItem("departments", JSON.stringify(updatedDepartments));

      return newState;
    }

    case "delete": {
      const newState = {
        ...state,
        departments: state.departments.filter(
          (department) => department.deptNo !== payload
        ),
      };
      localStorage.setItem("departments", JSON.stringify(newState.departments));
      return newState;
    }

    default:
      return {
        ...state,
        departments: payload,
      };
  }
}
