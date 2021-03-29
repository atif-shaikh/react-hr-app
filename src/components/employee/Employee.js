import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDataContext } from "../../context/dataContext";
import { transactEmployee } from "../../services/employeeService";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import STATUS from "../../constants/status";
import { parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/app.css";

// Declaring outside component to avoid recreation on each render
const emptyEmployeeForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  hireDate: null,
  birthDate: null,
  designation: "",
  salary: "",
  deptNo: "",
};

export default function Employee(props) {
  const { id } = useParams();
  const { empDispatch, empState, deptState } = useDataContext();
  const { employees, departments } = { ...empState, ...deptState };

  const selectedEmployee = () => {
    return employees.find((e) => e.empNo === id) ?? emptyEmployeeForm;
  };

  const [status, setStatus] = useState(STATUS.IDLE);
  const [employee, setEmployee] = useState(selectedEmployee());
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState({});
  const history = useHistory();
  const errors = getErrors(employee);
  const isValid = Object.keys(errors).length === 0;

  function updateField(id, value) {
    setEmployee((curEmp) => {
      return {
        ...curEmp,
        [id]: value,
      };
    });
  }

  function handleChange(e) {
    e.persist();
    updateField(e.target.id, e.target.value);
  }

  function handleDateChange(id, value) {
    //console.log("value" + format(value, "dd mm, yyyy HH:mm:ss"));
    updateField(id, value);
  }

  function handleBlur(event) {
    event.persist();
    setTouched((curr) => {
      return {
        ...curr,
        [event.target.id]: true,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        const requestMethod = !id ? "POST" : "PUT";
        const type = !id ? "empty" : "update";
        console.log(employee);
        console.log(requestMethod);
        const resp = await transactEmployee({
          employee: employee,
          requestMethod: requestMethod,
        });
        const json = await resp.json();
        if (resp.ok && json.success) {
          setStatus(STATUS.COMPLETED);
          //localStorage.removeItem("employees");
          empDispatch({ type: type, payload: employee });
          history.push("/employees");
        }
      } catch (e) {
        setSaveError(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function getErrors(employee) {
    const result = {};
    if (!employee.firstName) result.firstName = "First Name is required";
    if (!employee.lastName) result.lastName = "Last Name is required";
    if (!employee.email) result.email = "Email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(employee.email)
    ) {
      result.email = "Invalid email address";
    }

    if (!employee.phoneNumber) result.phoneNumber = "Phone Number is required";
    else if (isNaN(employee.phoneNumber) === true)
      result.phoneNumber = "Please enter number.";
    if (!employee.hireDate) result.hireDate = "Hire Date is required";
    if (!employee.birthDate) result.birthDate = "Birth Date is required";
    if (!employee.designation) result.designation = "Designation is required";
    if (!employee.salary) result.salary = "Salary is required";
    if (!employee.deptNo) result.deptNo = "Department is required";

    return result;
  }

  // if (loading || empLoading) return <Spinner />;
  if (!departments) return <PageNotFound />;
  if (id && !employee) return <PageNotFound />;
  // if (error) throw error;
  // if (empError) throw empError;

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) {
    return <h1>Employee was created Successfully!</h1>;
  }

  return (
    <>
      <div className="container">
        <div className="mx-auto shadow p-5 box">
          <h2>{`${id === undefined ? "Add" : "Update"} an Employee`}</h2>

          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  className={
                    "form-control " +
                    (touched.firstName || status === STATUS.SUBMITTED
                      ? errors.firstName
                        ? "is-invalid"
                        : "is-valid"
                      : "")
                  }
                  value={employee.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p role="alert">
                  {(touched.firstName || status === STATUS.SUBMITTED) &&
                    errors.firstName}
                </p>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="lastName" className="last-name">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={
                    "form-control " +
                    (touched.lastName || status === STATUS.SUBMITTED
                      ? errors.lastName
                        ? "is-invalid"
                        : "is-valid"
                      : "")
                  }
                  value={employee.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p role="alert">
                  {(touched.lastName || status === STATUS.SUBMITTED) &&
                    errors.lastName}
                </p>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="email" className="email">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  className={
                    "form-control " +
                    (touched.email || status === STATUS.SUBMITTED
                      ? errors.email
                        ? "is-invalid"
                        : "is-valid"
                      : "")
                  }
                  value={employee.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p role="alert">
                  {(touched.email || status === STATUS.SUBMITTED) &&
                    errors.email}
                </p>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="phoneNumber" className="phone-number">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  className={
                    "form-control " +
                    (touched.phoneNumber || status === STATUS.SUBMITTED
                      ? errors.phoneNumber
                        ? "is-invalid"
                        : "is-valid"
                      : "")
                  }
                  value={employee.phoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p role="alert">
                  {(touched.phoneNumber || status === STATUS.SUBMITTED) &&
                    errors.phoneNumber}
                </p>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="birthDate" className="birth-date">
                  Birth Date
                </label>
                <DatePicker
                  selected={
                    employee.birthDate ? new Date(employee.birthDate) : null
                  }
                  value={parseISO(employee.birthDate)}
                  className={
                    "form-control " +
                    (touched.birthDate || status === STATUS.SUBMITTED
                      ? errors.birthDate
                        ? "is-invalid"
                        : "is-valid"
                      : "")
                  }
                  id={"birthDate"}
                  onBlur={handleBlur}
                  onChange={(value) => handleDateChange("birthDate", value)}
                  dateFormat="MM/dd/yyyy"
                />
                <p role="alert">
                  {(touched.birthDate || status === STATUS.SUBMITTED) &&
                    errors.birthDate}
                </p>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="deptNo" className="dept-no">
                  Department
                </label>
                <select
                  id="deptNo"
                  className={
                    "form-control " +
                    (touched.deptNo || status === STATUS.SUBMITTED
                      ? errors.deptNo
                        ? "is-invalid"
                        : "is-valid"
                      : "")
                  }
                  value={employee.deptNo}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value=""> Which Department? </option>
                  {departments.map((dept) => (
                    <option key={dept.deptNo} value={dept.deptNo}>
                      {dept.deptName}
                    </option>
                  ))}
                </select>
                <p role="alert">
                  {(touched.deptNo || status === STATUS.SUBMITTED) &&
                    errors.deptNo}
                </p>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="designation" className="designation">
                  Designation
                </label>
                <input
                  id="designation"
                  type="text"
                  className={
                    "form-control " +
                    (touched.designation || status === STATUS.SUBMITTED
                      ? errors.designation
                        ? "is-invalid"
                        : "is-valid"
                      : "")
                  }
                  value={employee.designation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p role="alert">
                  {(touched.designation || status === STATUS.SUBMITTED) &&
                    errors.designation}
                </p>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="hireDate" className="hire-date">
                  Hire Date
                </label>
                <DatePicker
                  selected={
                    employee.hireDate ? new Date(employee.hireDate) : null
                  }
                  value={parseISO(employee.hireDate)}
                  className={
                    "form-control " +
                    (touched.hireDate || status === STATUS.SUBMITTED
                      ? errors.hireDate
                        ? "is-invalid"
                        : "is-valid"
                      : "")
                  }
                  id="hireDate"
                  onBlur={handleBlur}
                  onChange={(value) => handleDateChange("hireDate", value)}
                  dateFormat="MM/dd/yyyy"
                />
                <br />
                <p role="alert">
                  {(touched.hireDate || status === STATUS.SUBMITTED) &&
                    errors.hireDate}
                </p>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="salary" className="salary">
                  Salary
                </label>
                <input
                  id="salary"
                  type="text"
                  className={
                    "form-control " +
                    (touched.salary || status === STATUS.SUBMITTED
                      ? errors.salary
                        ? "is-invalid"
                        : "is-valid"
                      : "")
                  }
                  value={employee.salary}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p role="alert">
                  {(touched.salary || status === STATUS.SUBMITTED) &&
                    errors.salary}
                </p>
              </div>
            </div>

            <button
              disabled={status === STATUS.SUBMITTING}
              className="btn btn-primary"
            >
              {status === STATUS.SUBMITTING && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
