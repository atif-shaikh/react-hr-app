import React, { createContext, useReducer, useContext } from "react";
import employeeInitialState from "./initialStates/employeeInitialState";
import departmentInitialState from "./initialStates/departmentInitialState";
import employees from "./reducers/employees";
import departments from "./reducers/departments";
import useFetchAll from "../services/useFetchAll";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const DataContext = createContext(null);

export const DataProvider = (props) => {
  const [empState, empDispatch] = useReducer(employees, employeeInitialState);
  const [deptState, deptDispatch] = useReducer(
    departments,
    departmentInitialState
  );

  const { loading, error } = useFetchAll(["employees", "departments"], {
    empDispatch,
    deptDispatch,
  });
  const contextValue = {
    empState,
    empDispatch,
    deptState,
    deptDispatch,
  };

  if (error) throw error;

  return (
    <DataContext.Provider value={contextValue}>
      <Header />
      {loading ? <Spinner /> : props.children}
      <Footer />
    </DataContext.Provider>
  );
};

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context)
    throw new Error(
      "useCart must be used within a CartProvider. Wrap the parent component in <AppProvider> to fix this."
    );
  return context;
}
