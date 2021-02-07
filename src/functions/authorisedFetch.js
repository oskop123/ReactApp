export default function authorisedFetch(url, method, data) {
  if ("GET" === method) {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    };

    return fetch(url, requestOptions);
  }

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("access_token"),
    },
    body: JSON.stringify(data),
  };

  return fetch(url, requestOptions);
}
