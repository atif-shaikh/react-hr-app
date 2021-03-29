import React, { useState } from "react";
import { useHistory } from "react-router";
import { transactDepartment } from "../../services/departmentService";
import { useDataContext } from "../../context/dataContext";
import { useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import STATUS from "../../constants/status";
import "react-datepicker/dist/react-datepicker.css";

// Declaring outside component to avoid recreation on each render
const emptyDeptForm = {
  deptName: "",
};

export default function Department() {
  const { id } = useParams();
  const { deptDispatch, deptState } = useDataContext();
  const { departments } = { ...deptState };
  const history = useHistory();
  const selectedDepartment = () => {
    return departments.find((d) => d.deptNo === id) ?? emptyDeptForm;
  };
  const [status, setStatus] = useState(STATUS.IDLE);
  const [department, setDepartment] = useState(selectedDepartment());
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState({});

  const errors = getErrors(department);
  const isValid = Object.keys(errors).length === 0;

  function updateField(id, value) {
    setDepartment((curDept) => {
      return {
        ...curDept,
        [id]: value,
      };
    });
  }

  function handleChange(e) {
    e.persist();
    updateField(e.target.id, e.target.value);
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
        const requestMethod = id === undefined ? "POST" : "PUT";
        const type = id === undefined ? "empty" : "update";
        console.log("type" + type);
        console.log(requestMethod);
        const resp = await transactDepartment({
          department: department,
          requestMethod: requestMethod,
        });
        const json = await resp.json();
        if (resp.ok && json.success) {
          setStatus(STATUS.COMPLETED);
          deptDispatch({ type: type, payload: department });
          history.push("/departments");
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
    if (!department.deptName) result.deptName = "Department Name is required";
    return result;
  }

  // if (loading) return <Spinner />;
  if (!department) return <PageNotFound />;
  // if (error) throw error;

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) {
    return <h1>Department was created Successfully!</h1>;
  }
  console.log(id);
  return (
    <>
      <div className="container">
        <div className="mx-auto shadow p-5 box">
          <h2>{`${id === undefined ? "Add" : "Update"} Department`}</h2>

          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="firstName">Department Name</label>
                <input
                  id="deptName"
                  type="text"
                  className={
                    "form-control " +
                    (touched.deptName || status === STATUS.SUBMITTED
                      ? errors.deptName
                        ? "is-invalid"
                        : "is-valid"
                      : "")
                  }
                  value={department.deptName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p role="alert">
                  {(touched.deptName || status === STATUS.SUBMITTED) &&
                    errors.deptName}
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
