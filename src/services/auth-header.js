export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = JSON.parse(localStorage.getItem("authorization"));

  if (user && accessToken) {
    return { "Authorization": accessToken };
  }
  else {
    return {};
  }
}
