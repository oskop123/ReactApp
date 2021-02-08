export default function authorisedFetch(url, method, data) {
  //token expired == logout
  refreshToken();

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("access_token"),
    },
  };

  if (method !== "GET") {
    requestOptions["body"] = JSON.stringify(data);
  }

  return fetch(url, requestOptions);
}

function refreshToken() {
  const refreshOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("refresh_token"),
    },
  };
  fetch("/api/refresh", refreshOptions).then((response) =>
    response.json().then((data) => {
      if (response.status != 401) {
        sessionStorage.setItem("access_token", data["access_token"]);
        sessionStorage.setItem("refresh_token", data["refresh_token"]);
      } else {
        sessionStorage.clear();
        window.location.href = "/";
      }
    })
  );
}
