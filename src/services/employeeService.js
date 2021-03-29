const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function transactEmployee({ employee, requestMethod }) {
  return await fetch(baseUrl + "employee", {
    method: requestMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
}

export async function updateEmployee(employee) {
  console.log(JSON.stringify(employee));
  return await fetch(baseUrl + "employee", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
}

export async function removeEmployee(empNo) {
  return await fetch(baseUrl + "employee", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "empNo=" + empNo,
  });
}
