import React from "react";
import { useDataContext } from "../../context/dataContext";
import PageNotFound from "../PageNotFound";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

export default function Dashboard() {
  const { deptState } = useDataContext();
  const { departments } = { ...deptState };
  console.log(departments);

  // const deleteEmployee = async (deptNo) => {
  //   setLoading(true);
  //   try {
  //     const resp = await removeDepartment(deptNo);
  //     const json = await resp.json();
  //     console.log(json);
  //     if (resp.ok && json.success) {
  //       deptDispatch({ type: "delete", payload: deptNo });
  //     }
  //     throw resp;
  //   } catch (e) {
  //     setLoading(false);
  //     //throw e;
  //   }
  // };

  if (!departments) return <PageNotFound />;

  return (
    <>
      <div className="container">
        <div className="py-3">
          <h1>Manage Employees</h1>
          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Department Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, deptNo) => (
                <tr key={deptNo}>
                  <th scope="row">{deptNo + 1}</th>
                  <td>{department.deptName}</td>

                  <td>
                    <Link
                      className="btn btn-outline-warning mr-2"
                      to={`/department/edit/${department.deptNo}`}
                    >
                      <Icon.PencilSquare />
                    </Link>
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
