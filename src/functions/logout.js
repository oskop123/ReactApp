export default async function logout() {
  //delete access_token
  const accessOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("access_token"),
    },
  };

  //delete refresh_token
  const refreshOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("refresh_token"),
    },
  };

  await Promise.all([fetch("/api/logoutjwt", accessOptions), fetch("/api/logoutjwtrefresh", refreshOptions)]);

  sessionStorage.clear();
  window.location.href = "/";
}
