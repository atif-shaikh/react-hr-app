import { useState, useEffect, useRef } from "react";

export default function useFetchAll(urls, { empDispatch, deptDispatch }) {
  const prevUrls = useRef([]);
  //const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("length" + urls.length);
    console.log(areEqual(prevUrls.current, urls));
    if (!urls.length || areEqual(prevUrls.current, urls)) {
      setLoading(false);
      return;
    }
    prevUrls.current = urls;
    const promises = urls.map((url, index) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) =>
        json.map((result, index) => {
          console.log(result);
          if (urls[index] === "employees") {
            localStorage.setItem("employees", JSON.stringify(result.data));
            return empDispatch({ payload: result.data });
          } else {
            localStorage.setItem("departments", JSON.stringify(result.data));
            return deptDispatch({ payload: result.data });
          }
        })
      )
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [urls]);

  return { loading, error };
}

function areEqual(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => localStorage.getItem(value))
  );
}
