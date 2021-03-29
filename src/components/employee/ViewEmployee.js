import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/dataContext";

const ViewEmployee = () => {
  const { id } = useParams();
  const { empState, deptState } = useDataContext();
  const { employees, departments } = { ...empState, ...deptState };
  const employee = employees.find((e) => e.empNo === id);
  const department = departments.find((d) => d.deptNo === employee.deptNo);
  return (
    <div className="container py-4">
      <h1 className="display-4">Employee Id: {id}</h1>
      <hr />
      <ul className="list-group w-70">
        <li className="list-group-item">First Name: {employee.firstName}</li>
        <li className="list-group-item">Last Name: {employee.lastName}</li>
        <li className="list-group-item">Email: {employee.email}</li>
        <li className="list-group-item">
          Phone Number: {employee.phoneNumber}
        </li>
        <li className="list-group-item">Birth Date: {employee.birthDate}</li>
        <li className="list-group-item">Hire Date: {employee.hireDate}</li>
        <li className="list-group-item">Department: {department.deptName}</li>
        <li className="list-group-item">Designation: {employee.designation}</li>
        <li className="list-group-item">Salary: {employee.salary}</li>
      </ul>
    </div>
  );
};

export default ViewEmployee;
