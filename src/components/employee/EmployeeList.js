import React, { useState } from "react";
import { useDataContext } from "../../context/dataContext";
import PageNotFound from "../PageNotFound";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { removeEmployee } from "../../services/employeeService";

export default function EmployeeList() {
  const { empDispatch, empState } = useDataContext();
  console.log(empState);
  const [loading, setLoading] = useState(false);
  const { employees } = { ...empState };

  const deleteEmployee = async (empNo) => {
    setLoading(empNo);
    try {
      const resp = await removeEmployee(empNo);
      const json = await resp.json();
      console.log(json);
      if (resp.ok && json.success) {
        empDispatch({ type: "delete", payload: empNo });
        //document.getElementById(empNo).style.setProperty("display", "block");
      }

      throw resp;
    } catch (e) {
      setLoading(false);
      //throw e;
    } finally {
      setLoading(false);
    }
  };

  if (!employees) return <PageNotFound />;

  return (
    <>
      <div className="container">
        <div className="py-4">
          <h1>Manage Employees</h1>
          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, empNo) => (
                <tr key={empNo}>
                  <th scope="row">{empNo + 1}</th>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <Link
                      disabled={loading}
                      className="btn btn-outline-primary mr-2"
                      to={`/employee/view/${employee.empNo}`}
                    >
                      <Icon.Eye />
                    </Link>

                    <Link
                      disabled={loading}
                      className="btn btn-outline-warning mr-2"
                      to={`/employee/edit/${employee.empNo}`}
                    >
                      <Icon.PencilSquare />
                    </Link>

                    {!loading && (
                      <Link
                        className="btn btn-outline-danger"
                        onClick={() => deleteEmployee(employee.empNo)}
                        to="#"
                      >
                        <Icon.Trash />
                      </Link>
                    )}
                    {loading === employee.empNo && (
                      <div
                        id={employee.empNo}
                        className="spinner-border text-danger"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
