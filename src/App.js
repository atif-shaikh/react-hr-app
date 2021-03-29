import React from "react";
import { Switch, Route } from "react-router-dom";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Home";
import Employee from "./components/employee/Employee";
import EmployeeList from "./components/employee/EmployeeList";
import Department from "./components/department/Department";
import DepartmentList from "./components/department/DepartmentList";
import PageNotFound from "./components/PageNotFound";
import ViewEmployee from "./components/employee/ViewEmployee";

export default function App() {
  return (
    <>
      <div className="content">
        <main>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route
              exact
              path="/employees"
              render={(props) => <EmployeeList />}
            />

            <Route
              exact
              path="/employee/view/:id"
              render={(props) => <ViewEmployee />}
            />

            <Route
              exact
              path="/employee/add"
              render={(props) => <Employee />}
            />
            <Route
              exact
              path="/employee/edit/:id"
              render={(props) => <Employee />}
            />

            <Route
              exact
              path="/departments"
              render={(props) => <DepartmentList />}
            />

            <Route
              exact
              path="/department/add"
              render={(props) => <Department />}
            />
            <Route
              exact
              path="/department/edit/:id"
              render={(props) => <Department />}
            />

            <Route render={(props) => <PageNotFound />} />
          </Switch>
        </main>
      </div>
    </>
  );
}
