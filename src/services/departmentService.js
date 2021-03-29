const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function transactDepartment({ department, requestMethod }) {
  return await fetch(baseUrl + "department", {
    method: requestMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(department),
  });
}

export async function updateDepartment(department) {
  return await fetch(baseUrl + "department", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(department),
  });
}

export async function removeDepartment(deptNo) {
  return await fetch(baseUrl + "department", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "deptNo=" + deptNo,
  });
}
