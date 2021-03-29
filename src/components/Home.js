import React from "react";
import { useDataContext } from "../context/dataContext";
import useFetch from "../services/useFetch";
import PageNotFound from "./PageNotFound";
import Spinner from "./Spinner";

export default function Dashboard() {
  const { deptState } = useDataContext();
  const { departments } = { ...deptState };
  console.log(departments);
  const { data: reports, loading, error } = useFetch("reports");
  console.log(reports);
  if (loading) return <Spinner />;
  if (!reports) return <PageNotFound />;
  if (error) throw error;
  return (
    <>
      <div className="container">
        <div className="py-4">
          <h3>Department with Highest Salary</h3>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Department Name</th>
                <th scope="col">Salary</th>
              </tr>
            </thead>
            <tbody>
              {reports.data.deptWithHighSal.map((value, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.deptName}</td>
                  <td>{value.salary ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Employee Earning more than 50k </h3>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Department Name</th>
                <th scope="col">Employee Count</th>
              </tr>
            </thead>
            <tbody>
              {reports.data.deptWithEmpEarningMoreThan50.map((value, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {
                      departments.find((d) => d.deptNo === value.deptNo)
                        .deptName
                    }
                  </td>
                  <td>{value.empCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
