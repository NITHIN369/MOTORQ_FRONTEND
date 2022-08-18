import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
function NavBar() {
    const navigate = useNavigate();
function SignOut() {
  localStorage.removeItem("user");
  navigate("/");
}
  return (
    <div class="container">
      <nav class=" navbar navbar-expand-lg navbar-light bg-light fixed-top justify-content-end">
        <a
          class="navbar-brand"
          onClick={() => {
            navigate("/");
          }}
        >
          Event Registration
        </a>
        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav ">
            <li class="nav-item active">
              <a
                class=" nav-link nav-item"
                onClick={() => {
                  navigate("/");
                }}
              >
                Events
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link nav-item"
                onClick={() => {
                  navigate("/user/userregister");
                }}
              >
                Your-Events
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link nav-item" onClick={()=>{
                navigate("/user/map")
              }}>
                map
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link nav-item" onClick={SignOut}>
               Sign Out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default NavBar;
