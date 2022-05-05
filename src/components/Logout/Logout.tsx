import {useNavigate} from "react-router"

export default function Logout() {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    navigate("/", {replace: true});
  }

  return (
    <div className="lm-gc-logout">
      <button type="button" className="btn btn-secondary" onClick={logout}>Logout</button>
    </div>
  )
}
